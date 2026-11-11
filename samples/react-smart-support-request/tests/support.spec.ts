import { expect, test, type Page } from '@playwright/test';
import { sampleDraft, validatePatch } from '../src/webparts/smartSupportRequest/supportModel';

async function installTestHost(page: Page, failRegistration: boolean = false): Promise<void> {
  await page.addInitScript(({ fail }) => {
    const tools = new Map<string, { name: string; inputSchema: object; execute: (input: unknown) => Promise<object> }>();
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {
        registerTool: (tool: { name: string; inputSchema: object; execute: (input: unknown) => Promise<object> }) => {
          if (fail) throw new Error('Registration denied for test');
          tools.set(tool.name, tool);
        },
        unregisterTool: (name: string) => { tools.delete(name); },
        listTools: () => Array.from(tools.values()).map(({ name, inputSchema }) => ({ name, inputSchema })),
        executeTool: (name: string, input: unknown) => {
          const tool = tools.get(name);
          if (!tool) throw new Error('Tool not found');
          return tool.execute(input);
        }
      }
    });
  }, { fail: failRegistration });
}

async function fillTool(page: Page, input: unknown): Promise<{ isError?: boolean; content: { text: string }[] }> {
  return page.evaluate(async (args) => {
    const host = (document as Document & {
      modelContext: { executeTool: (name: string, input: unknown) => Promise<{ isError?: boolean; content: { text: string }[] }> };
    }).modelContext;
    return host.executeTool('fill_support_request_local-demo', args);
  }, input);
}

test('rejects invalid patches atomically, including schema edge cases', () => {
  for (const input of [
    null, [], {}, { title: '   ' }, { title: 'a'.repeat(121) },
    { description: 'a'.repeat(2001) }, { device: 'a'.repeat(101) }, { urgency: 'Critical' },
    { submit: true }, { reviewed: true }, { title: 'Valid title', category: 7 },
    JSON.parse('{"__proto__":{"polluted":true}}')
  ]) {
    expect(validatePatch(input).valid, JSON.stringify(input)).toBe(false);
  }
  expect(validatePatch(sampleDraft)).toEqual({ valid: true, patch: sampleDraft });
  expect(validatePatch({ title: 'a'.repeat(120), description: 'a'.repeat(2000), device: '', location: '' }).valid).toBe(true);
});

test('manual-only form requires review and creates a temporary mock receipt with no outbound request', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'modelContext', { value: undefined, configurable: true });
    Object.defineProperty(navigator, 'modelContext', { value: undefined, configurable: true });
  });
  await page.goto('/');
  await expect(page.getByText('Manual mode.', { exact: false })).toBeVisible();
  await page.getByLabel('Issue summary *').fill('Demo keyboard not working');
  await page.getByLabel('What is happening? *').fill('The fictional keyboard stopped working after a restart.');
  const outgoing: string[] = [];
  page.on('request', request => outgoing.push(`${request.method()} ${request.url()}`));
  await page.getByRole('button', { name: 'Review request' }).click();
  await expect(page.getByRole('button', { name: 'Submit mock request' })).toBeDisabled();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Submit mock request' }).click();
  await expect(page.getByRole('heading', { name: 'Your demo receipt is ready' })).toBeVisible();
  await expect(page.getByText(/^MOCK-[A-F0-9]{8}$/)).toBeVisible();
  expect(outgoing).toEqual([]);
  await page.reload();
  await expect(page.getByLabel('Issue summary *')).toHaveValue('');
  await expect(page.getByText(/^MOCK-[A-F0-9]{8}$/)).toHaveCount(0);
});

test('agent fills visible draft, preserves omitted fields, rejects bad input, and invalidates review', async ({ page }) => {
  await installTestHost(page);
  await page.goto('/');
  await expect(page.getByText('WebMCP ready via', { exact: false })).toBeVisible();
  await page.getByLabel('Device (optional)').fill('DEMO-EXISTING');
  const result = await fillTool(page, { title: sampleDraft.title, description: sampleDraft.description, category: 'Network' });
  expect(result.isError).toBe(false);
  expect(JSON.parse(result.content[0].text)).toMatchObject({ submitted: false, requiresHumanReview: true, missingRequiredFields: [] });
  await expect(page.getByLabel('Issue summary *')).toHaveValue(sampleDraft.title);
  await expect(page.getByLabel('Device (optional)')).toHaveValue('DEMO-EXISTING');
  const rejected = await fillTool(page, { title: 'Do not apply this', urgency: 'Critical' });
  expect(rejected.isError).toBe(true);
  await expect(page.getByText('Agent draft rejected:', { exact: false })).toBeVisible();
  await expect(page.getByLabel('Issue summary *')).toHaveValue(sampleDraft.title);
  await page.getByRole('button', { name: 'Review request' }).click();
  await page.getByRole('checkbox').check();
  await fillTool(page, { location: 'Remote' });
  await expect(page.getByLabel('Location (optional)')).toHaveValue('Remote');
  await expect(page.getByRole('button', { name: 'Submit mock request' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Review request' }).click();
  await expect(page.getByRole('checkbox')).not.toBeChecked();
});

test('tool exposes only draft filling and reports missing required fields', async ({ page }) => {
  await installTestHost(page);
  await page.goto('/');
  await expect(page.getByText('WebMCP ready via', { exact: false })).toBeVisible();
  const result = await fillTool(page, { urgency: 'High' });
  expect(JSON.parse(result.content[0].text).missingRequiredFields).toEqual(['title', 'description']);
  const tools = await page.evaluate(() => (document as Document & {
    modelContext: { listTools: () => { name: string }[] };
  }).modelContext.listTools());
  expect(tools.map(tool => tool.name)).toEqual(['fill_support_request_local-demo']);
});

test('registration failure is visible and manual sample workflow still works', async ({ page }) => {
  await installTestHost(page, true);
  await page.goto('/');
  await expect(page.getByText('WebMCP error: Registration denied for test.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Load sample draft' }).click();
  await expect(page.getByLabel('Issue summary *')).toHaveValue(sampleDraft.title);
  await page.getByRole('button', { name: 'Review request' }).click();
  await expect(page.getByRole('heading', { name: 'Review your request' })).toBeVisible();
});

test('small screens do not overflow and fields stay labelled', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByLabel('Issue summary *')).toBeVisible();
  await page.getByRole('button', { name: 'Load sample draft' }).click();
  await page.getByRole('button', { name: 'Review request' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('native Edge WebMCP discovers and executes the real draft tool with the testing feature enabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('WebMCP ready via document.modelContext.', { exact: false })).toBeVisible();
  const result = await page.evaluate(async () => {
    const context = (document as Document & {
      modelContext: {
        getTools: () => Promise<{ name: string }[]>;
        executeTool: (tool: { name: string }, input: object) => Promise<string>;
      };
    }).modelContext;
    const tools = await context.getTools();
    const tool = tools.find(item => item.name === 'fill_support_request_local-demo');
    if (!tool) throw new Error('Native Edge did not discover the draft tool.');
    return {
      names: tools.map(item => item.name),
      result: JSON.parse(await context.executeTool(tool, {
        title: 'Native WebMCP VPN test',
        description: 'A fictional VPN issue filled through the browser API.',
        category: 'Network'
      }))
    };
  });
  expect(result.names).toEqual(['fill_support_request_local-demo']);
  expect(result.result.isError).toBe(false);
  expect(JSON.parse(result.result.content[0].text)).toMatchObject({ submitted: false, requiresHumanReview: true });
  await expect(page.getByLabel('Issue summary *')).toHaveValue('Native WebMCP VPN test');
  await expect(page.getByRole('heading', { name: 'Your demo receipt is ready' })).toHaveCount(0);
});

test('native Edge unregisters only the removed component instance', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('WebMCP ready via document.modelContext.', { exact: false })).toBeVisible();
  await page.evaluate(async () => {
    const url = '/tests/fixtures/lifecycle.tsx';
    const fixture: typeof import('./fixtures/lifecycle') = await import(url);
    fixture.mount();
  });
  await expect(page.getByText('WebMCP ready via document.modelContext.', { exact: false })).toHaveCount(2);
  const toolNames = async (): Promise<string[]> => page.evaluate(async () => {
    const host = (document as Document & {
      modelContext: { getTools: () => Promise<{ name: string }[]> };
    }).modelContext;
    return (await host.getTools()).map(tool => tool.name).sort();
  });
  await expect.poll(toolNames).toEqual(['fill_support_request_isolation-test', 'fill_support_request_local-demo']);
  await page.evaluate(async () => {
    const url = '/tests/fixtures/lifecycle.tsx';
    const fixture: typeof import('./fixtures/lifecycle') = await import(url);
    fixture.unmount();
  });
  await expect.poll(toolNames).toEqual(['fill_support_request_local-demo']);
});

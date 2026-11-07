jest.mock('marked', () => ({ marked: { parse: jest.fn() } }));
jest.mock('./CopilotRetrivalPreview.module.scss', () => ({}));
jest.mock('CopilotRetrivalPreviewWebPartStrings', () => ({
  QueryRequired: 'Please enter a query.',
  RetrievalFailed: 'Unable to retrieve results. Please try again.'
}), { virtual: true });

import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { registerIcons } from '@fluentui/react';
import CopilotRetrivalPreview from './CopilotRetrivalPreview';
import type { ICopilotRetrivalPreviewProps } from './ICopilotRetrivalPreviewProps';

describe('Retrieval error handling', () => {
  let container: HTMLDivElement;
  let root: Root;
  const component = React.createRef<CopilotRetrivalPreview>();
  const post = jest.fn();
  const getClient = jest.fn();

  beforeAll(() => {
    registerIcons({ icons: { ChevronDown: 'v', ErrorBadge: '!' } });
  });

  beforeEach(async () => {
    jest.useFakeTimers();
    post.mockReset();
    getClient.mockReset().mockResolvedValue({ api: () => ({ post }) });
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    const props: ICopilotRetrivalPreviewProps = {
      description: '',
      isDarkTheme: false,
      environmentMessage: '',
      hasTeamsContext: false,
      userDisplayName: '',
      wpcontext: Object.defineProperty({} as ICopilotRetrivalPreviewProps['wpcontext'],
        'msGraphClientFactory', { value: { getClient } })
    };
    await act(async () => {
      root.render(<CopilotRetrivalPreview {...props} ref={component} />);
    });
  });

  afterEach(async () => {
    await act(async () => { root.unmount(); });
    container.remove();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  async function retrieve(queryText: string = 'test query'): Promise<void> {
    await act(async () => { component.current?.setState({ queryText }); });
    await act(async () => {
      container.querySelector<HTMLButtonElement>('button.ms-Button--primary')?.click();
    });
    await act(async () => { jest.runOnlyPendingTimers(); });
  }

  test.each([
    { error: { code: 'Forbidden', message: 'Authorization Failed - User does not have valid license', httpCode: 403 } },
    { code: 'Forbidden', message: 'Authorization Failed - User does not have valid license', statusCode: 403 }
  ])('shows license failures from raw responses and Graph SDK errors', async (error) => {
    post.mockRejectedValue(error);
    await retrieve();

    expect(container.textContent).toContain('Authorization Failed - User does not have valid license');
    expect(container.textContent).not.toContain('Loading...');
    expect(container.textContent).not.toContain('No Items found.');
    expect(container.querySelector<HTMLButtonElement>('button.ms-Button--primary')?.disabled).toBe(false);
  });

  test('shows Graph client acquisition failures', async () => {
    getClient.mockRejectedValue(new Error('Unable to acquire access token'));
    await retrieve();

    expect(container.textContent).toContain('Unable to acquire access token');
    expect(container.textContent).not.toContain('Loading...');
    expect(post).not.toHaveBeenCalled();
  });

  test('uses a fallback for errors without a message', async () => {
    post.mockRejectedValue({});
    await retrieve();

    expect(container.textContent).toContain('Unable to retrieve results. Please try again.');
    expect(container.textContent).not.toContain('Loading...');
  });

  test('validates whitespace-only queries before requesting a client', async () => {
    await retrieve('   ');

    expect(container.textContent).toContain('Please enter a query.');
    expect(getClient).not.toHaveBeenCalled();
    expect(container.textContent).not.toContain('Loading...');
  });

  test('clears stale results on failure and clears the error after a successful retry', async () => {
    await act(async () => {
      component.current?.setState({ response: { retrievalHits: [] } });
    });
    post.mockRejectedValueOnce(new Error('Request failed'));
    await retrieve();
    expect(component.current?.state.response).toBeUndefined();

    post.mockResolvedValueOnce({ retrievalHits: [] });
    await retrieve();
    expect(container.textContent).not.toContain('Request failed');
    expect(container.textContent).toContain('No Items found.');
    expect(component.current?.state.loading).toBe(false);
  });
});

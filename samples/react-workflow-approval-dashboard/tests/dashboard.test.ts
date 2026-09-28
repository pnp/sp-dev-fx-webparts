import assert from 'node:assert/strict';
import test from 'node:test';
import config from '../src/config/dashboard-config.json';
import { classifyStatus } from '../src/services/classification';
import { DashboardError, classifyHttpError } from '../src/services/errors';
import { parseWorkflowItems, validateConfig } from '../src/services/parser';
import { toSafeTenantUrl } from '../src/services/urlSafety';

test('validates and bounds local configuration', () => {
  assert.equal(validateConfig(config).limits.maxPagesPerSource, 5);
  assert.throws(() => validateConfig({ ...config, sources: [] }), /one to four sources/);
  assert.throws(() => validateConfig({ ...config, limits: { ...config.limits, pageSize: 51 } }), /bounds/);
});

test('accepts same-tenant URLs and rejects external or credentialed URLs', () => {
  assert.equal(toSafeTenantUrl('/sites/a/_api/items', 'https://tenant.sharepoint.com/sites/a'), 'https://tenant.sharepoint.com/sites/a/_api/items');
  assert.throws(() => toSafeTenantUrl('https://evil.example/items', 'https://tenant.sharepoint.com/sites/a'), /current SharePoint tenant/);
  assert.throws(() => toSafeTenantUrl('https://user:pass@tenant.sharepoint.com/items', 'https://tenant.sharepoint.com'), /current SharePoint tenant/);
});

test('classifies pending, failed, completed, and overdue state deterministically', () => {
  const now = new Date('2026-08-30T00:00:00Z');
  assert.deepEqual(classifyStatus('PendingApproval', '2026-08-01T00:00:00Z', now, 7), { state: 'pending', overdue: true });
  assert.deepEqual(classifyStatus('Failed', '2026-08-29T00:00:00Z', now, 7), { state: 'failed', overdue: false });
  assert.deepEqual(classifyStatus('Denied', '2026-08-29T00:00:00Z', now, 7), { state: 'failed', overdue: false });
  assert.deepEqual(classifyStatus('Approved', '2026-08-29T00:00:00Z', now, 7), { state: 'completed', overdue: false });
});

test('parses malformed items safely and preserves source labels', () => {
  const parsed = parseWorkflowItems({ value: [{ Id: 1, Title: 'Review', Status: 'Pending', Created: '2026-08-29T00:00:00Z', Approvers: 'A; B' }, { nope: true }] }, config.sources[0], config, new Date('2026-08-30T00:00:00Z'));
  assert.equal(parsed.length, 1);
  assert.deepEqual(parsed[0].approvers, ['A', 'B']);
  assert.equal(parsed[0].sourceLabel, config.sources[0].label);
  assert.throws(() => parseWorkflowItems({}, config.sources[0], config, new Date()), /item collection/);
});

test('classifies permission and throttling failures', () => {
  assert.equal(classifyHttpError(403).kind, 'permission');
  const throttled = classifyHttpError(429, '17');
  assert.equal(throttled.kind, 'throttled');
  assert.equal(throttled.retryAfterSeconds, 17);
  assert.ok(new DashboardError('network', 'x') instanceof Error);
});

test('bounds pagination and keeps successful sources when another source fails', async () => {
  (globalThis as unknown as { window: object }).window = {};
  const { SharePointWorkflowService } = await import('../src/services/SharePointWorkflowService');
  const calls: string[] = [];
  const client = { get: async (url: string) => {
    calls.push(url);
    if (url.includes('/broken')) { return { ok: false, status: 403, headers: new Headers(), json: async () => ({}) }; }
    if (url.includes('page=2')) { return { ok: true, status: 200, headers: new Headers(), json: async () => ({ value: [{ Id: 2, Title: 'Second page', Status: 'Approved', Created: '2026-08-29T00:00:00Z' }] }) }; }
    return { ok: true, status: 200, headers: new Headers(), json: async () => ({ value: [{ Id: 1, Title: 'First page', Status: 'Pending', Created: '2026-08-29T00:00:00Z' }], '@odata.nextLink': 'https://tenant.sharepoint.com/_api/items?page=2' }) };
  } };
  const boundedConfig = validateConfig({ ...config, sources: [config.sources[0], { ...config.sources[0], id: 'broken', label: 'Broken source', endpoint: '/broken' }], limits: { ...config.limits, maxPagesPerSource: 2 } });
  const result = await new SharePointWorkflowService(client as never, 'https://tenant.sharepoint.com', () => new Date('2026-08-30T00:00:00Z'), undefined as never).load(boundedConfig);
  assert.equal(result.requests.length, 2);
  assert.equal(result.errors[0].error.kind, 'permission');
  assert.equal(calls.length, 3);
});

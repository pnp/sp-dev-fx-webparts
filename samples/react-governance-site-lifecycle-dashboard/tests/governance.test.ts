import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  extractRows,
  classifyLifecycle,
  MAX_ITEMS,
  MAX_PAGE_SIZE,
  MAX_PAGES,
  MAX_SOURCES,
  mapHttpError,
  parseConfig,
  safeSharePointUrl,
  summarizeState,
  IGetOnlyClient,
  ISourceConfig,
  IRawRow
} from '../src/webparts/governanceSiteLifecycleDashboard/services/governanceLogic';
import { loadSource } from '../src/webparts/governanceSiteLifecycleDashboard/services/governanceService';

const tenant = 'https://contoso.sharepoint.com';
const source: ISourceConfig = {
  id: 'sites', label: 'Sites', url: '/sites/hub/_api/web/webinfos', pageSize: 2, maxPages: 5, maxItems: 3, inactiveAfterDays: 180
};

test('accepts same-tenant HTTPS and relative REST URLs while preserving managed paths', () => {
  assert.equal(safeSharePointUrl('/sites/managed/_api/web/webinfos', tenant).pathname, '/sites/managed/_api/web/webinfos');
  assert.equal(safeSharePointUrl('https://contoso.sharepoint.com/sites/managed/_api/web', tenant).origin, tenant);
  assert.throws(() => safeSharePointUrl('https://evil.example/_api/web', tenant), /current SharePoint HTTPS tenant/);
  assert.throws(() => safeSharePointUrl('http://contoso.sharepoint.com/_api/web', tenant), /Only HTTPS/);
  assert.throws(() => safeSharePointUrl('/sites/../_api/web', tenant), /unsafe path/);
  assert.throws(() => safeSharePointUrl('/sites/managed/lists/items', tenant), /REST URL/);
});

test('clamps bounded local JSON configuration', () => {
  const many = Array.from({ length: MAX_SOURCES + 2 }, (_, index) => ({ id: String(index), url: '/_api/web', pageSize: 999, maxPages: 999, maxItems: 999 }));
  const result = parseConfig(JSON.stringify(many), 9999);
  assert.equal(result.sources.length, MAX_SOURCES);
  assert.equal(result.sources[0].pageSize, MAX_PAGE_SIZE);
  assert.equal(result.sources[0].maxPages, MAX_PAGES);
  assert.equal(result.sources[0].maxItems, MAX_ITEMS);
  assert.equal(result.reviewHorizonDays, 365);
  assert.ok(result.errors.length > 0);
});

test('classifies inactive and needs-review signals against injected reference date', () => {
  const row: IRawRow = { LastActivityDate: '2025-01-01T00:00:00Z', ReviewDate: '2026-09-15T00:00:00Z' };
  const result = classifyLifecycle(row, new Date('2026-08-30T00:00:00Z'), 60, 180);
  assert.deepEqual(result, { inactive: true, needsReview: true, classification: 'inactive' });
  assert.equal(classifyLifecycle({}, new Date('2026-08-30T00:00:00Z'), 60, 180).classification, 'unknown');
});

test('safely extracts valid rows and counts malformed data', () => {
  const result = extractRows({ value: [null, { Title: 'Valid site' }, 'bad'], '@odata.nextLink': '/_api/web?$skiptoken=2' });
  assert.equal(result.rows.length, 1);
  assert.equal(result.malformedRows, 2);
  assert.equal(result.nextLink, '/_api/web?$skiptoken=2');
  assert.equal(extractRows({ d: { results: [{ Title: 'Legacy row' }] } }).rows.length, 1);
});

test('stops pagination at the configured page and item bounds', async () => {
  let calls = 0;
  const client: IGetOnlyClient = {
    get: async () => {
      calls += 1;
      return { ok: true, status: 200, json: async () => ({ value: [{ Title: `Site ${calls}`, Url: `/sites/${calls}` }], '@odata.nextLink': '/sites/hub/_api/web/webinfos?$skiptoken=next' }) };
    }
  };
  const pageBoundSource = { ...source, maxItems: 10 };
  const result = await loadSource(client, pageBoundSource, tenant, new Date('2026-08-30T00:00:00Z'), 60);
  assert.equal(calls, source.maxPages);
  assert.equal(result.pages, MAX_PAGES);
  assert.equal(result.items.length, MAX_PAGES);
  assert.equal(result.state, 'partial');

  calls = 0;
  const itemBoundResult = await loadSource(client, source, tenant, new Date('2026-08-30T00:00:00Z'), 60);
  assert.equal(calls, source.maxItems);
  assert.equal(itemBoundResult.items.length, source.maxItems);
  assert.equal(itemBoundResult.state, 'partial');
});

test('maps permission, throttling, retry and generic HTTP states', () => {
  assert.equal(mapHttpError(403).kind, 'permission');
  assert.equal(mapHttpError(429).kind, 'throttled');
  assert.equal(mapHttpError(503).kind, 'retry');
  assert.equal(mapHttpError(404).kind, 'error');
  assert.equal(summarizeState([], 0, false), 'empty');
});

test('returns explicit permission state from a denied source', async () => {
  const client: IGetOnlyClient = { get: async () => ({ ok: false, status: 403, json: async () => ({}) }) };
  const result = await loadSource(client, source, tenant, new Date('2026-08-30T00:00:00Z'), 60);
  assert.equal(result.state, 'permission');
  assert.equal(result.errorKind, 'permission');
});

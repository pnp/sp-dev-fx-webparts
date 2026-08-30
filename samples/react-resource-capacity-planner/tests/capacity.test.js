'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const config = require('../src/config/capacity-planner.config.json');
const capacity = require('../src/webparts/resourceCapacityPlanner/domain/capacity');
const { fetchPaged } = require('../src/webparts/resourceCapacityPlanner/services/pagination');

const pageUrl = 'https://contoso.sharepoint.com/sites/operations';
const source = config.sources[0];
const validConfig = { ...config, tenantHost: 'contoso.sharepoint.com' };

test('config bounds and field validation are deterministic', () => {
  const valid = capacity.validateConfig(validConfig, pageUrl);
  assert.equal(valid.maxHorizonDays, 31);
  assert.throws(() => capacity.validateConfig({ ...validConfig, maxHorizonDays: 63 }, pageUrl), /maxHorizonDays/);
  assert.throws(() => capacity.validateConfig({ ...validConfig, defaultHorizonDays: 32 }, pageUrl), /defaultHorizonDays/);
  assert.throws(() => capacity.validateConfig({ ...validConfig, maxPageSize: 501 }, pageUrl), /maxPageSize/);
  assert.throws(() => capacity.validateConfig({ ...validConfig, maxItems: 5001 }, pageUrl), /maxItems/);
  assert.throws(() => capacity.validateConfig({ ...validConfig, sources: validConfig.sources.slice(0, 1).map((item) => ({ ...item, resourceIdField: 'Id;DROP' })) }, pageUrl), /field name/);
});

test('same-tenant URL safety rejects external, insecure, and non-REST endpoints', () => {
  assert.equal(capacity.safeUrl('/_api/web/currentuser', pageUrl), 'https://contoso.sharepoint.com/_api/web/currentuser');
  assert.throws(() => capacity.safeUrl('https://evil.example/_api/web', pageUrl), /same-tenant/);
  assert.throws(() => capacity.safeUrl('http://contoso.sharepoint.com/_api/web', pageUrl), /HTTPS/);
  assert.throws(() => capacity.safeUrl('/sites/operations/lists', pageUrl), /REST/);
  assert.throws(() => capacity.validateConfig(validConfig, 'http://contoso.sharepoint.com/sites/operations'), /HTTPS/);
});

test('date range validates ISO date-only values and horizon bounds', () => {
  assert.deepEqual(capacity.dateRange('2026-02-27', 3, validConfig).dates, ['2026-02-27', '2026-02-28', '2026-03-01']);
  assert.throws(() => capacity.dateRange('2026-02-30', 3, validConfig), /real calendar/);
  assert.throws(() => capacity.dateRange('2026-02-27', 32, validConfig), /horizon/);
  assert.throws(() => capacity.dateRange('27-02-2026', 3, validConfig), /YYYY-MM-DD/);
});

test('malformed records are rejected while valid records retain source labels', () => {
  const resource = capacity.normalizeResource({ Id: 7, Title: 'Room A', Capacity: 2, TimeZone: 'Europe/London' }, source);
  assert.deepEqual(resource, { id: '7', name: 'Room A', capacity: 2, timezone: 'Europe/London', sourceId: 'rooms', sourceLabel: 'Rooms' });
  assert.throws(() => capacity.normalizeResource({ Id: 'bad/id', Title: 'Room', Capacity: 1 }, source), /resource ID/);
  assert.throws(() => capacity.normalizeReservation({ Id: 'r1', RoomId: 7, Start: '2026-02-27T10:00:00Z', End: '2026-02-27T10:00:00Z' }, source), /after/);
  assert.throws(() => capacity.normalizeReservation({ Id: 'r1', RoomId: 'bad/id', Start: '2026-02-27T10:00:00Z', End: '2026-02-27T11:00:00Z' }, source), /resource ID/);
});

test('overlap boundaries use deterministic half-open intervals', () => {
  const a = { id: 'a', resourceId: '1', start: '2026-02-27T09:00:00.000Z', end: '2026-02-27T10:00:00.000Z' };
  const b = { id: 'b', resourceId: '1', start: '2026-02-27T10:00:00.000Z', end: '2026-02-27T11:00:00.000Z' };
  const c = { id: 'c', resourceId: '1', start: '2026-02-27T09:30:00.000Z', end: '2026-02-27T10:30:00.000Z' };
  assert.equal(capacity.overlap(a, b), false);
  assert.equal(capacity.overlap(a, c), true);
  assert.deepEqual(capacity.overlapEdges([b, c, a]).map((edge) => [edge.leftId, edge.rightId]), [['a', 'c'], ['c', 'b']]);
});

test('daily and weekly utilization uses working-hour capacity and units', () => {
  const resources = [{ id: '1', name: 'Room', capacity: 2, timezone: 'UTC', sourceId: 'rooms', sourceLabel: 'Rooms' }];
  const reservations = [{ id: 'r', resourceId: '1', start: '2026-02-27T09:00:00.000Z', end: '2026-02-27T11:00:00.000Z', units: 1 }];
  const range = capacity.dateRange('2026-02-27', 1, validConfig);
  const daily = capacity.computeDailyUtilization(resources, reservations, range, validConfig.workingHours);
  assert.equal(daily[0].usedHours, 2);
  assert.equal(daily[0].availableHours, 16);
  assert.equal(daily[0].utilization, 0.125);
  assert.equal(capacity.computeWeeklyUtilization(daily)[0].utilization, 0.125);
});

test('pagination follows bounded same-tenant next links and reports partial bounds', async () => {
  const calls = [];
  const client = { get: async (url) => { calls.push(url); return { ok: true, status: 200, json: async () => calls.length === 1 ? { value: [{ id: 1 }, { id: 2 }], '@odata.nextLink': 'https://contoso.sharepoint.com/_api/items?$skiptoken=2' } : { value: [{ id: 3 }] } }; } };
  const result = await fetchPaged(client, 'https://contoso.sharepoint.com/_api/items', 2, 3, 'contoso.sharepoint.com');
  assert.equal(result.items.length, 3);
  assert.equal(result.partial, false);
  assert.equal(calls.length, 2);
  assert.match(calls[0], /%24top=2/);
  await assert.rejects(() => fetchPaged({ get: async () => ({ ok: true, status: 200, json: async () => ({ value: [], '@odata.nextLink': 'https://evil.example/_api/items' }) }) }, 'https://contoso.sharepoint.com/_api/items', 2, 4, 'contoso.sharepoint.com'), /safe same-tenant/);
  const bounded = await fetchPaged({ get: async () => ({ ok: true, status: 200, json: async () => ({ value: [{ id: 1 }, { id: 2 }], '@odata.nextLink': 'https://contoso.sharepoint.com/_api/items?$skiptoken=2' }) }) }, 'https://contoso.sharepoint.com/_api/items', 2, 3, 'contoso.sharepoint.com');
  assert.equal(bounded.partial, true);
  await assert.rejects(() => fetchPaged({ get: async () => ({ ok: false, status: 429, json: async () => ({}) }) }, 'https://contoso.sharepoint.com/_api/items', 2, 4, 'contoso.sharepoint.com'), /429/);
});

test('permission, throttling, retry, and generic errors map to explicit states', () => {
  assert.equal(capacity.loadStatus({ status: 403 }), 'permission');
  assert.equal(capacity.loadStatus({ status: 429 }), 'throttled');
  assert.equal(capacity.loadStatus({ status: 503 }), 'retry');
  assert.equal(capacity.loadStatus({ status: 500 }), 'error');
});

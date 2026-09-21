import { normalizeAndClassify } from '../src/webparts/pageGovernanceReview/helpers/governance';
import { invokeLoad } from '../src/webparts/pageGovernanceReview/helpers/load';
import { MAX_PAGES, MAX_ROWS, MAX_SOURCES, PAGE_SIZE, requestUrl, responseMessage, safeNextLink, validatePath, validateWebUrl } from '../src/webparts/pageGovernanceReview/helpers/safety';

const assert = (value: unknown, message: string): asserts value => { if (!value) throw new Error(message); };
const rejects = (action: () => unknown, message: string): void => { let rejected = false; try { action(); } catch (_) { rejected = true; } assert(rejected, message); };
// SPFx's HTTP module initializes browser services; the helper tests provide the smallest browser shim.
(globalThis as { window?: unknown }).window = {};
const base = new Date('2026-01-01T00:00:00Z');
const good = { Id: 1, Title: 'Home', FileRef: '/teams/demo/SitePages/Home.aspx', Modified: '2025-12-31T00:00:00Z', PromotedState: 2, Description: 'x', CanvasContent1: '<p>x</p>', Author: { Title: 'A' }, Editor: { Title: 'E' } };
const pages = normalizeAndClassify([good, null, { Id: 2, Title: 'Draft' }, 'bad'], { referenceDate: base, oldModifiedDays: 30 });
assert(pages.length === 2 && pages[0].status === 'ok' && pages[1].signals.length > 3, 'classification or malformed-row handling failed');
assert(MAX_SOURCES === 4 && PAGE_SIZE === 50 && MAX_PAGES === 5 && MAX_ROWS === 200, 'bounds changed');
assert(validatePath('/teams/demo/Site Pages') === '/teams/demo/Site Pages', 'spaces/path failed');
for (const value of ['', 'SitePages', '//evil', '/a/../b', '/a\\b', '/a?x', '/a#x']) rejects(() => validatePath(value), 'unsafe path accepted');
assert(validateWebUrl('https://tenant.sharepoint.com/sites/demo').protocol === 'https:', 'URL validation failed');
for (const value of ['', ' https://tenant.sharepoint.com/items', '//evil.example/items', 'https://tenant.sharepoint.com/a/../b', 'https://tenant.sharepoint.com/a/%2e%2e/b', 'https://user:pass@tenant.sharepoint.com/items', 'http://tenant.sharepoint.com/items', 'https://tenant.sharepoint.com/items#x', 'https://tenant.sharepoint.com.evil/items', 'https://tenant.sharepoint.com/a\\b']) assert(!safeNextLink(value, new URL('https://tenant.sharepoint.com/sites/demo')), 'unsafe next link accepted');
for (const value of [null, 42, '', ' tenant.sharepoint.com', 'https://tenant.sharepoint.com/a\\b', 'https://tenant.sharepoint.com/a\nb', 'http://tenant.sharepoint.com', 'https://user:pass@tenant.sharepoint.com', 'https:///missing-host']) rejects(() => validateWebUrl(value), 'unsafe web URL accepted');
assert(safeNextLink('/sites/demo/_api/items', new URL('https://tenant.sharepoint.com/sites/demo')) === 'https://tenant.sharepoint.com/sites/demo/_api/items', 'safe relative next link failed');
let loadCalls = 0; invokeLoad(async () => { loadCalls++; }); assert(loadCalls === 1, 'load invocation failed');
assert(requestUrl('https://tenant.sharepoint.com/sites/demo', '/sites/demo/Site Pages').indexOf('$top=50') >= 0, 'bounded request failed');
assert(responseMessage(401).indexOf('401') >= 0 && responseMessage(403).indexOf('403') >= 0 && responseMessage(429, '7').indexOf('7') >= 0 && responseMessage(503).indexOf('503') >= 0, 'HTTP status mapping failed');
console.log('All governance helper tests passed.');

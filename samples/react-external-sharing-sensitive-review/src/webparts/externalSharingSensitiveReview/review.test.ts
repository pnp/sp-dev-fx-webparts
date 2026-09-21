import { boundedSources, safeListPath, safeItemUrl, safeNextLink, normalize, classify, canFetchPage, httpMessage, MAX_SOURCES, PAGE_SIZE, MAX_PAGES, MAX_ROWS } from './review';
describe('review bounds and URL safety', () => {
  test('bounds sources and pages', () => { expect(boundedSources('a\nb\nc\nd\ne')).toHaveLength(MAX_SOURCES); expect(PAGE_SIZE).toBe(50); expect(canFetchPage(0, 0)).toBe(true); expect(canFetchPage(MAX_PAGES, 0)).toBe(false); expect(canFetchPage(0, MAX_ROWS)).toBe(false); });
  test('allows only tenant/root relative URLs', () => { expect(safeListPath('/sites/a/Shared Documents')).toBe('/sites/a/Shared%20Documents'); expect(safeListPath('https://evil.test/x')).toBeUndefined(); expect(safeItemUrl('/sites/a/file.docx', 'https://tenant.test/sites/a')).toBe('https://tenant.test/sites/a/file.docx'); expect(safeItemUrl('https://evil.test/x', 'https://tenant.test')).toBeUndefined(); expect(safeNextLink('https://evil.test/x', 'https://tenant.test')).toBeUndefined(); });
});
describe('normalization and classifications', () => {
  const date = new Date('2026-08-30T00:00:00Z');
  test('parses malformed rows defensively', () => { expect(normalize({}, '/x', 'https://tenant.test', date)).toBeUndefined(); });
  test('does not classify disabled sharing values as external', () => { for (const value of [false, 'false', 'disabled', 'none', '']) expect(classify({ GuestAccess: value, ExternalSharing: value }, date).map(s => s.code)).not.toContain('external'); });
  test('classifies positive and guest sharing values as external', () => { for (const row of [{ GuestAccess: true }, { ExternalSharing: 'true' }, { GuestAccess: 'Guest' }, { ExternalSharing: 'ExternalUserSharingOnly' }]) expect(classify(row, date).map(s => s.code)).toContain('external'); });
  test('keeps deterministic evidence and severity', () => { const row = { FileLeafRef: 'x.docx', FileRef: '/sites/a/x.docx', GuestAccess: 'true', SharingLinkType: 'Anonymous', HasUniqueRoleAssignments: true, Modified: '2025-01-01' }; const result = normalize(row, '/x', 'https://tenant.test', date)!; expect(result.severity).toBe('high'); expect(result.signals.map(s => s.code)).toEqual(expect.arrayContaining(['external','link','unique','metadata','stale'])); expect(classify(row, date).every(s => s.evidence)).toBe(true); });
});
describe('HTTP mappings', () => { test('maps auth and throttling', () => { expect(httpMessage(403)).toMatch(/denied/); expect(httpMessage(429, '10')).toMatch(/10/); expect(httpMessage(500)).toMatch(/500/); }); });

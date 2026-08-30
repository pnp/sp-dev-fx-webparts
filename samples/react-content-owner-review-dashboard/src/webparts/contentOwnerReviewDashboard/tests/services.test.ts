import { classifyReview, normalizeRow } from '../services/normalize';
import { nextUrl, safeUrl, validatePath, validateWebUrl } from '../services/safety';
import { httpMessage, loadSources } from '../services/contentService';
import { MAX_PAGES, MAX_ROWS } from '../services/model';
describe('dashboard rules', () => {
  it('classifies against an injected date', () => { expect(classifyReview('2026-08-29', '2026-08-30', 30)).toBe('overdue'); expect(classifyReview('2026-09-10', '2026-08-30', 30)).toBe('due-soon'); });
  it('normalizes malformed and missing fields safely', () => { const row = normalizeRow({ Id: 'bad', Title: '', ContentOwner: { Title: 'Ada' }, ReviewDate: 'bad' }, '/sites/demo/Lists/Docs', '2026-08-30', 30); expect(row.id).toBeNull(); expect(row.owner).toBe('Ada'); expect(row.reviewState).toBe('not-set'); expect(row.incomplete).toBe(true); });
  it('rejects unsafe paths and cross-tenant links', () => { expect(() => validatePath('/sites/a/../b')).toThrow(); expect(() => validatePath('/sites/a/My List')).toThrow(); expect(safeUrl('https://evil.example/x', 'https://tenant.sharepoint.com/sites/a')).toBeNull(); expect(safeUrl('/sites/a/doc.docx', 'https://tenant.sharepoint.com/sites/a')).toContain('tenant.sharepoint.com'); });
  it('rejects malformed, cross-origin, and unsafe pagination URLs', () => {
    const webUrl = 'https://tenant.sharepoint.com/sites/a';
    expect(() => validateWebUrl('https://tenant.sharepoint.com:bad/sites/a')).toThrow();
    expect(safeUrl('https://tenant.sharepoint.com:444/sites/a', webUrl)).toBeNull();
    expect(safeUrl('/sites/a/doc.docx#fragment', webUrl)).toBeNull();
    ['/sites/a/../b', '/sites/a/%2e%2e/b', '//tenant.sharepoint.com/sites/a', '/sites/a/\u0001doc', '/sites/a\\doc'].forEach(value => expect(nextUrl(value, webUrl)).toBeNull());
  });
  it('maps transient and access HTTP responses', () => { expect(httpMessage(401)).toMatch(/Sign-in/); expect(httpMessage(403)).toMatch(/permission/); expect(httpMessage(429)).toMatch(/temporarily/); expect(httpMessage(503)).toMatch(/temporarily/); expect(httpMessage(500)).toMatch(/HTTP 500/); });
  it('bounds sources, pages, and rows without wall-clock behavior', async () => {
    const calls: string[] = [], response = (page: number): any => ({ ok: true, status: 200, headers: { get: () => null }, json: async () => ({ value: Array.from({ length: 50 }, (_, index) => ({ Id: page * 50 + index, Title: `Item ${page}-${index}` })), '@odata.nextLink': page < MAX_PAGES - 1 ? `https://tenant.sharepoint.com/sites/demo/_api/items?page=${page + 1}` : null }) });
    const client: any = { get: async (url: string) => { calls.push(url); return response(calls.length - 1); } };
    const result = await loadSources(client, 'https://tenant.sharepoint.com/sites/demo', Array.from({ length: 6 }, (_, index) => ({ path: `/sites/demo/Lists/${index}` })), '2026-08-30', 30);
    expect(calls.length).toBe(4 * MAX_PAGES); expect(result.rows.length).toBe(4 * MAX_ROWS);
  });
});

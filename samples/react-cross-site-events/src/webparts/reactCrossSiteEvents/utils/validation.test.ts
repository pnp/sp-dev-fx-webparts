import { safeRangeSettings, validateSiteSources } from './validation';

const tenant = 'https://contoso.sharepoint.com/sites/home';
const group = '11111111-1111-4111-8111-111111111111';

describe('validateSiteSources', () => {
  it('accepts bounded same-tenant team-site sources and removes a trailing slash', () => {
    const result = validateSiteSources(`https://contoso.sharepoint.com/sites/marketing/|${group}`, tenant);
    expect(result.errors).toEqual([]);
    expect(result.sources[0].siteUrl).toBe('https://contoso.sharepoint.com/sites/marketing');
  });

  it('rejects other hosts, malformed group IDs, duplicates, and more than the bound', () => {
    const input = [
      `https://evil.example/sites/a|${group}`,
      `https://contoso.sharepoint.com/sites/a|not-a-guid`,
      `https://contoso.sharepoint.com/sites/b|${group}`,
      `https://contoso.sharepoint.com/sites/b/|${group}`
    ];
    const result = validateSiteSources(input, tenant, 4);
    expect(result.sources).toHaveLength(1);
    expect(result.errors).toHaveLength(3);
  });
});

describe('safeRangeSettings', () => {
  it('clamps invalid and excessive ranges deterministically', () => {
    expect(safeRangeSettings(-4, 999)).toEqual({ daysBack: 0, daysAhead: 92 });
    expect(safeRangeSettings(undefined, undefined)).toEqual({ daysBack: 7, daysAhead: 30 });
  });
});

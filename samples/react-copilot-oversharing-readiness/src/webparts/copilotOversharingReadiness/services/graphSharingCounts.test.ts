import { countSharingLinks, sitePathParts } from './graphSharingCounts';

describe('countSharingLinks', () => {
  it('counts only link permissions, and anonymous links separately', () => {
    expect(countSharingLinks([
      { link: { type: 'anonymous' } },
      { link: { type: 'organization' } },
      {},
      { link: { type: 'anonymous' } },
    ])).toEqual({ anyoneLinks: 2, sharingLinks: 3 });
  });
  it('returns zero for an empty permission list, not undefined', () => {
    expect(countSharingLinks([])).toEqual({ anyoneLinks: 0, sharingLinks: 0 });
  });
});

describe('sitePathParts', () => {
  it('splits a subsite URL into hostname and path', () => {
    expect(sitePathParts('https://example.sharepoint.com/sites/Retail')).toEqual({
      hostname: 'example.sharepoint.com',
      path: 'sites/Retail',
    });
  });
  it('gives an empty path for a root site URL', () => {
    expect(sitePathParts('https://example.sharepoint.com/')).toEqual({
      hostname: 'example.sharepoint.com',
      path: '',
    });
  });
  it('returns undefined for an invalid URL', () => {
    expect(sitePathParts('not a url')).toBeUndefined();
  });
});

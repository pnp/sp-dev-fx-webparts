import {
  buildQueryString,
  normaliseSitePath,
  buildSearchRequest,
  buildSortProperties,
  cacheKey,
  escapeKql,
  isSearchable,
  MINIMUM_QUERY_LENGTH
} from './buildQuery';
import { ISearchQuery } from '../models/ISearchModels';

const aQuery = (over: Partial<ISearchQuery> = {}): ISearchQuery => ({
  text: 'budget',
  kinds: ['document', 'page', 'site'],
  sort: 'relevance',
  from: 0,
  size: 25,
  ...over
});

describe('escapeKql', () => {
  it('doubles a quote so it cannot close the phrase', () => {
    expect(escapeKql('say "hello"')).toEqual('say ""hello""');
  });

  it('leaves ordinary text alone', () => {
    expect(escapeKql('quarterly budget')).toEqual('quarterly budget');
  });
});

describe('buildQueryString', () => {
  it('quotes the text so KQL operators in it are searched for, not obeyed', () => {
    // Someone typing this means the three words, not a boolean expression.
    expect(buildQueryString('budget AND forecast')).toEqual('"budget AND forecast"');
  });

  it('cannot be escaped out of with a quote', () => {
    const built = buildQueryString('a" OR isDocument=true OR "');
    expect(built).toEqual('"a"" OR isDocument=true OR """');

    // The property that matters: every quote inside the phrase is doubled, so
    // the count is even and none of them can close the phrase early.
    const insideQuotes = built.slice(1, -1).split('"').length - 1;
    expect(insideQuotes % 2).toEqual(0);
  });

  it('collapses whitespace so a pasted line break is not part of the phrase', () => {
    expect(buildQueryString('  quarterly \n  budget  ')).toEqual('"quarterly budget"');
  });

  it('returns nothing for text that is only whitespace', () => {
    expect(buildQueryString('   ')).toEqual('');
  });
});

describe('isSearchable', () => {
  it('rejects text shorter than the minimum', () => {
    expect(isSearchable('ab')).toBe(false);
  });

  it('accepts text at the minimum', () => {
    expect(isSearchable('a'.repeat(MINIMUM_QUERY_LENGTH))).toBe(true);
  });

  it('does not count surrounding spaces towards the minimum', () => {
    expect(isSearchable('  a  ')).toBe(false);
  });
});

describe('buildSortProperties', () => {
  it('sends nothing for relevance, which is Graph\'s own default', () => {
    expect(buildSortProperties('relevance')).toBeUndefined();
  });

  it('sorts by last modified, newest first', () => {
    expect(buildSortProperties('date')).toEqual([
      { name: 'lastModifiedDateTime', isDescending: true }
    ]);
  });
});

describe('buildSearchRequest', () => {
  it('asks for the three entity types Graph allows to interleave', () => {
    expect(buildSearchRequest(aQuery()).requests[0].entityTypes).toEqual([
      'driveItem',
      'listItem',
      'site'
    ]);
  });

  it('does not send the kind filter to Graph', () => {
    // Pages come back as driveItem, so kind is decided over the results.
    const request = buildSearchRequest(aQuery({ kinds: ['page'] })).requests[0];
    expect(JSON.stringify(request)).not.toContain('page');
  });

  it('trims the response by asking for named fields', () => {
    expect(buildSearchRequest(aQuery()).requests[0].fields).toContain('lastModifiedDateTime');
  });

  it('omits sortProperties entirely when sorting by relevance', () => {
    expect(buildSearchRequest(aQuery()).requests[0]).not.toHaveProperty('sortProperties');
  });

  it('includes sortProperties when sorting by date', () => {
    expect(buildSearchRequest(aQuery({ sort: 'date' })).requests[0].sortProperties).toBeDefined();
  });

  it('clamps the page size to what Graph accepts', () => {
    expect(buildSearchRequest(aQuery({ size: 5000 })).requests[0].size).toEqual(1000);
    expect(buildSearchRequest(aQuery({ size: 0 })).requests[0].size).toEqual(1);
  });

  it('never sends a negative offset', () => {
    expect(buildSearchRequest(aQuery({ from: -10 })).requests[0].from).toEqual(0);
  });
});

describe('cacheKey', () => {
  it('is the same for queries that differ only in case or spacing', () => {
    expect(cacheKey(aQuery({ text: 'Budget' }))).toEqual(cacheKey(aQuery({ text: ' budget ' })));
  });

  it('does not depend on the order the kinds were selected in', () => {
    expect(cacheKey(aQuery({ kinds: ['site', 'document'] }))).toEqual(
      cacheKey(aQuery({ kinds: ['document', 'site'] }))
    );
  });

  it('changes when the page changes, so pages are cached separately', () => {
    expect(cacheKey(aQuery({ from: 0 }))).not.toEqual(cacheKey(aQuery({ from: 25 })));
  });

  it('changes when the sort changes', () => {
    expect(cacheKey(aQuery({ sort: 'date' }))).not.toEqual(cacheKey(aQuery({ sort: 'relevance' })));
  });

  it('changes when the kinds change', () => {
    expect(cacheKey(aQuery({ kinds: ['document'] }))).not.toEqual(
      cacheKey(aQuery({ kinds: ['site'] }))
    );
  });
});

describe('search scope', () => {
  it('sends no restriction when the scope is everything', () => {
    expect(buildQueryString('budget')).toEqual('"budget"');
  });

  it('restricts by path when the scope is one site', () => {
    expect(buildQueryString('budget', 'https://contoso.sharepoint.com/sites/finance')).toEqual(
      '"budget" path:"https://contoso.sharepoint.com/sites/finance"'
    );
  });

  it('escapes the site path as carefully as the typed text', () => {
    // A path cannot be used to break out of its own restriction.
    expect(buildQueryString('budget', 'https://x/a"b')).toEqual('"budget" path:"https://x/a""b"');
  });

  it('caches a site-scoped query separately from an unscoped one', () => {
    expect(cacheKey(aQuery({ sitePath: 'https://x/sites/a' }))).not.toEqual(cacheKey(aQuery()));
  });

  it('caches two different sites separately', () => {
    expect(cacheKey(aQuery({ sitePath: 'https://x/sites/a' }))).not.toEqual(
      cacheKey(aQuery({ sitePath: 'https://x/sites/b' }))
    );
  });
});

describe('normaliseSitePath', () => {
  it('drops a trailing slash, which stops path: matching on some tenants', () => {
    expect(normaliseSitePath('https://contoso.sharepoint.com/sites/finance/')).toEqual(
      'https://contoso.sharepoint.com/sites/finance'
    );
  });

  it('drops more than one trailing slash', () => {
    expect(normaliseSitePath('https://contoso.sharepoint.com/sites/finance//')).toEqual(
      'https://contoso.sharepoint.com/sites/finance'
    );
  });

  it('trims surrounding whitespace', () => {
    expect(normaliseSitePath('  https://contoso.sharepoint.com/sites/a  ')).toEqual(
      'https://contoso.sharepoint.com/sites/a'
    );
  });

  it('has nothing for an empty or missing value', () => {
    expect(normaliseSitePath('')).toBeUndefined();
    expect(normaliseSitePath('   ')).toBeUndefined();
    expect(normaliseSitePath(undefined)).toBeUndefined();
  });
});

describe('site paths that are awkward in practice', () => {
  it('keeps a space in a site name intact inside the quoted path', () => {
    expect(buildQueryString('budget', 'https://contoso.sharepoint.com/sites/Sales Team')).toEqual(
      '"budget" path:"https://contoso.sharepoint.com/sites/Sales Team"'
    );
  });

  it('keeps an already-encoded path as it came', () => {
    expect(buildQueryString('a', 'https://contoso.sharepoint.com/sites/Sales%20Team')).toEqual(
      '"a" path:"https://contoso.sharepoint.com/sites/Sales%20Team"'
    );
  });

  it('handles a managed path other than /sites/', () => {
    expect(buildQueryString('a', 'https://contoso.sharepoint.com/teams/finance')).toEqual(
      '"a" path:"https://contoso.sharepoint.com/teams/finance"'
    );
  });

  it('handles a tenant root site, which has no managed path at all', () => {
    expect(buildQueryString('a', 'https://contoso.sharepoint.com')).toEqual(
      '"a" path:"https://contoso.sharepoint.com"'
    );
  });

  it('handles accents and other non-ASCII in a site name', () => {
    expect(buildQueryString('a', 'https://contoso.sharepoint.com/sites/Direção')).toEqual(
      '"a" path:"https://contoso.sharepoint.com/sites/Direção"'
    );
  });

  it('treats the same site with and without a trailing slash as one cache entry', () => {
    expect(cacheKey(aQuery({ sitePath: 'https://x/sites/a/' }))).toEqual(
      cacheKey(aQuery({ sitePath: 'https://x/sites/a' }))
    );
  });
});

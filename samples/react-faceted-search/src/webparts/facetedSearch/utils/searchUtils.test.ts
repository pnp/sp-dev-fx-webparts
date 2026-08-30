import {
  buildSearchUrl,
  classifySearchError,
  mapSearchResponse,
  MAX_PAGE_SIZE
} from './searchUtils';

describe('searchUtils', () => {
  test('builds an encoded, bounded SharePoint Search URL', () => {
    const url = buildSearchUrl('https://contoso.sharepoint.com/sites/demo/', {
      query: 'budget & plan',
      pageSize: 500,
      selectedRefiners: [{ name: 'FileType', label: 'PDF', token: 'filetype:pdf' }]
    });
    const parsed = new URL(url);

    expect(parsed.pathname).toBe('/sites/demo/_api/search/query');
    expect(parsed.searchParams.get('querytext')).toBe("'budget & plan'");
    expect(parsed.searchParams.get('rowlimit')).toBe(String(MAX_PAGE_SIZE));
    expect(parsed.searchParams.get('refinementfilters')).toBe('FileType:filetype:pdf');
    expect(url).toContain('budget+%26+plan');
  });

  test('rejects blank and control-character queries', () => {
    expect(() => buildSearchUrl('https://contoso.sharepoint.com', { query: '   ' })).toThrow('Enter a search query.');
    expect(() => buildSearchUrl('https://contoso.sharepoint.com', { query: 'safe\nquery' })).toThrow('unsupported control character');
  });

  test('maps SharePoint rows and ignores unsafe result links', () => {
    const response = mapSearchResponse({
      d: {
        query: {
          PrimaryQueryResult: {
            RelevantResults: {
              TotalRows: 1,
              Table: {
                Rows: {
                  results: [{
                    Cells: {
                      results: [
                        { Key: 'Title', Value: 'A result' },
                        { Key: 'Path', Value: 'javascript:alert(1)' },
                        { Key: 'FileType', Value: 'docx' }
                      ]
                    }
                  }]
                }
              }
            },
            RefinementResults: { Refiners: { results: [] } }
          }
        }
      }
    });

    expect(response.results).toEqual([expect.objectContaining({ title: 'A result', path: null, fileType: 'docx' })]);
    expect(response.totalRows).toBe(1);
  });

  test('classifies access and throttling failures', () => {
    expect(classifySearchError({ status: 403 })).toBe('accessDenied');
    expect(classifySearchError({ status: 429 })).toBe('throttled');
    expect(classifySearchError(new Error('network failure'))).toBe('generic');
  });
});

import {
  classify,
  locationOf,
  fileExtensionOf,
  filterByKind,
  lastPathSegment,
  normaliseSearchResponse,
  stripHitHighlight
} from './normaliseResults';

const hit = (
  resource: Record<string, unknown>,
  over: Record<string, unknown> = {}
): Record<string, unknown> => ({
  hitId: (resource.webUrl as string) || 'hit',
  summary: 'a summary',
  resource,
  ...over
});

const response = (
  hits: unknown[],
  over: Record<string, unknown> = {}
): Record<string, unknown> => ({
  value: [{ hitsContainers: [{ hits, total: hits.length, moreResultsAvailable: false, ...over }] }]
});

describe('fileExtensionOf', () => {
  it('reads the extension, lowercased', () => {
    expect(fileExtensionOf('Report.DOCX')).toEqual('docx');
  });

  it('has none for a name without a dot', () => {
    expect(fileExtensionOf('Shared Documents')).toBeUndefined();
  });

  it('ignores a leading dot, which is not an extension', () => {
    expect(fileExtensionOf('.gitignore')).toBeUndefined();
  });

  it('ignores a trailing dot with nothing after it', () => {
    expect(fileExtensionOf('name.')).toBeUndefined();
  });

  it('takes the last extension of a double-barrelled name', () => {
    expect(fileExtensionOf('archive.tar.gz')).toEqual('gz');
  });
});

describe('classify', () => {
  it('recognises a site by its odata type', () => {
    expect(classify({ '@odata.type': '#microsoft.graph.site' })).toEqual('site');
  });

  it('recognises a modern page by the SharePoint content class', () => {
    expect(classify({ contentclass: 'STS_ListItem_SitePages', name: 'News' })).toEqual('page');
  });

  it('recognises a page by its .aspx extension', () => {
    expect(classify({ name: 'Home.aspx' })).toEqual('page');
  });

  it('reads a file with an extension as a document', () => {
    expect(classify({ name: 'Budget.xlsx' })).toEqual('document');
  });

  it('keeps a folder reachable rather than dropping it', () => {
    expect(classify({ '@odata.type': '#microsoft.graph.driveItem', name: 'Projects' })).toEqual(
      'document'
    );
  });

  it('falls back to a list item when nothing else identifies it', () => {
    expect(classify({ title: 'Row 12' })).toEqual('listItem');
  });

  it('survives a resource that is missing entirely', () => {
    expect(classify(undefined)).toEqual('listItem');
  });

  // Seen in the workbench: a SitePages .aspx hit arrived with a link and no
  // name, and was being labelled a list item.
  it('recognises a page from the link when the hit carries no name', () => {
    expect(
      classify({
        webUrl:
          'https://contoso.sharepoint.com/sites/a/SitePages/Templates/Status-report-template.aspx'
      })
    ).toEqual('page');
  });

  it('recognises a document from the link when the hit carries no name', () => {
    expect(classify({ webUrl: 'https://contoso.sharepoint.com/a/Budget.xlsx' })).toEqual(
      'document'
    );
  });
});

describe('stripHitHighlight', () => {
  it('removes the match markers Graph wraps around terms', () => {
    expect(stripHitHighlight('the <c0>budget</c0> for <c1>2026</c1>')).toEqual(
      'the budget for 2026'
    );
  });

  it('leaves a summary with no markers untouched', () => {
    expect(stripHitHighlight('a plain summary')).toEqual('a plain summary');
  });

  it('leaves other angle brackets alone rather than stripping markup blindly', () => {
    // The summary is rendered as text, so this must survive intact and visible.
    expect(stripHitHighlight('a > b and <script>')).toEqual('a > b and <script>');
  });

  // Seen in the workbench against real results, not invented: summaries came
  // back with <ddd/> where text had been cut out, and it was being shown.
  it('turns the truncation marker into an ellipsis instead of showing it', () => {
    expect(stripHitHighlight('<ddd/>budget planning, supporting<ddd/>')).toEqual(
      '…budget planning, supporting…'
    );
  });

  it('handles both markers together, as they arrive', () => {
    expect(stripHitHighlight('<ddd/>the <c0>budget</c0> for 2026<ddd/>')).toEqual(
      '…the budget for 2026…'
    );
  });

  it('does not leave a space stranded before an ellipsis', () => {
    expect(stripHitHighlight('the budget <ddd/>')).toEqual('the budget …');
  });
});

describe('lastPathSegment', () => {
  it('takes the file name from a link', () => {
    expect(lastPathSegment('https://contoso.sharepoint.com/sites/a/Shared/Budget.xlsx')).toEqual(
      'Budget.xlsx'
    );
  });

  it('decodes what was escaped in the link', () => {
    expect(lastPathSegment('https://contoso.sharepoint.com/a/Q1%20Budget.xlsx')).toEqual(
      'Q1 Budget.xlsx'
    );
  });

  it('ignores a query string and a fragment', () => {
    expect(lastPathSegment('https://contoso.sharepoint.com/a/Home.aspx?x=1#top')).toEqual(
      'Home.aspx'
    );
  });

  it('ignores a trailing slash', () => {
    expect(lastPathSegment('https://contoso.sharepoint.com/sites/finance/')).toEqual('finance');
  });

  it('survives a link it cannot decode', () => {
    expect(lastPathSegment('https://contoso.sharepoint.com/a/100%.docx')).toEqual('100%.docx');
  });

  it('has nothing for nothing', () => {
    expect(lastPathSegment(undefined)).toEqual('');
  });
});

describe('normaliseSearchResponse', () => {
  it('maps a hit onto the shape the components render', () => {
    const page = normaliseSearchResponse(
      response([
        hit({
          name: 'Budget.xlsx',
          title: 'Budget 2026',
          webUrl: 'https://contoso.sharepoint.com/a/Budget.xlsx',
          lastModifiedDateTime: '2026-05-01T10:00:00Z',
          siteTitle: 'Finance'
        })
      ])
    );

    expect(page.results).toHaveLength(1);
    expect(page.results[0]).toEqual(
      expect.objectContaining({
        kind: 'document',
        title: 'Budget 2026',
        source: 'Finance',
        fileExtension: 'xlsx'
      })
    );
    expect(page.results[0].lastModified?.toISOString()).toEqual('2026-05-01T10:00:00.000Z');
  });

  it('drops a hit with no link, which could not be opened anyway', () => {
    expect(normaliseSearchResponse(response([hit({ name: 'Orphan.docx' })])).results).toHaveLength(
      0
    );
  });

  it('removes the duplicate when an item matches as both driveItem and listItem', () => {
    const url = 'https://contoso.sharepoint.com/a/Budget.xlsx';
    const page = normaliseSearchResponse(
      response([hit({ name: 'Budget.xlsx', webUrl: url }), hit({ title: 'Budget', webUrl: url })])
    );

    expect(page.results).toHaveLength(1);
  });

  it('treats the same link in different case as the same item', () => {
    const page = normaliseSearchResponse(
      response([
        hit({ name: 'a.docx', webUrl: 'https://contoso.sharepoint.com/A.docx' }),
        hit({ name: 'a.docx', webUrl: 'https://contoso.sharepoint.com/a.docx' })
      ])
    );

    expect(page.results).toHaveLength(1);
  });

  it('falls back to the name, then the link, when there is no title', () => {
    const withName = normaliseSearchResponse(
      response([hit({ name: 'Budget.xlsx', webUrl: 'https://contoso.sharepoint.com/a' })])
    );
    expect(withName.results[0].title).toEqual('Budget.xlsx');

    // A whole URL is not a title. The last part of the link reads better and
    // is what a person would recognise.
    const bare = normaliseSearchResponse(
      response([
        hit({ webUrl: 'https://contoso.sharepoint.com/sites/a/SitePages/Status-report.aspx' })
      ])
    );
    expect(bare.results[0].title).toEqual('Status-report.aspx');
  });

  it('keeps the total Graph reported, which is not the size of the page', () => {
    const page = normaliseSearchResponse(
      response([hit({ name: 'a.docx', webUrl: 'https://contoso.sharepoint.com/a.docx' })], {
        total: 431,
        moreResultsAvailable: true
      })
    );

    expect(page.total).toEqual(431);
    expect(page.moreResultsAvailable).toBe(true);
  });

  it('ignores a date it cannot parse rather than showing an invalid one', () => {
    const page = normaliseSearchResponse(
      response([
        hit({
          name: 'a.docx',
          webUrl: 'https://contoso.sharepoint.com/a.docx',
          lastModifiedDateTime: 'not a date'
        })
      ])
    );

    expect(page.results[0].lastModified).toBeUndefined();
  });

  it('returns an empty page for a response with no results', () => {
    expect(normaliseSearchResponse(response([]))).toEqual({
      results: [],
      total: 0,
      moreResultsAvailable: false
    });
  });

  it('survives a response of an entirely unexpected shape', () => {
    expect(normaliseSearchResponse(undefined).results).toHaveLength(0);
    expect(normaliseSearchResponse({}).results).toHaveLength(0);
    expect(normaliseSearchResponse({ value: [] }).results).toHaveLength(0);
  });
});

describe('filterByKind', () => {
  const results = [
    { kind: 'document' } as never,
    { kind: 'page' } as never,
    { kind: 'site' } as never
  ];

  it('returns everything when nothing is selected', () => {
    expect(filterByKind(results, [])).toHaveLength(3);
  });

  it('keeps only the selected kinds', () => {
    expect(filterByKind(results, ['page', 'site'])).toHaveLength(2);
  });
});

describe('locationOf', () => {
  it('prefers the site title Graph gave, when it gave one', () => {
    expect(locationOf('Contoso Finance - Payables', 'https://x/sites/a/b/c.docx')).toEqual(
      'Contoso Finance - Payables'
    );
  });

  it('falls back to the path, without the managed path nobody reads', () => {
    expect(
      locationOf(undefined, 'https://contoso.sharepoint.com/sites/Finance/Shared Documents/a.docx')
    ).toEqual('Finance / Shared Documents');
  });

  it('handles /teams/ the same way as /sites/', () => {
    expect(locationOf(undefined, 'https://contoso.sharepoint.com/teams/Ops/Docs/a.docx')).toEqual(
      'Ops / Docs'
    );
  });

  it('drops the item itself, which is already the title', () => {
    expect(locationOf(undefined, 'https://contoso.sharepoint.com/sites/Finance/a.docx')).toEqual(
      'Finance'
    );
  });

  it('stops at two segments rather than printing a whole deep path', () => {
    expect(
      locationOf(undefined, 'https://x/sites/A/B/C/D/E/f.docx')
    ).toEqual('A / B');
  });

  it('decodes escaped segments', () => {
    expect(locationOf(undefined, 'https://x/sites/Sales%20Team/Docs/a.docx')).toEqual(
      'Sales Team / Docs'
    );
  });

  it('survives a segment it cannot decode', () => {
    expect(locationOf(undefined, 'https://x/sites/100%/Docs/a.docx')).toEqual('100% / Docs');
  });

  it('has nothing to say for a tenant root item', () => {
    expect(locationOf(undefined, 'https://contoso.sharepoint.com/a.docx')).toEqual('');
  });

  it('has nothing to say without a link', () => {
    expect(locationOf(undefined, undefined)).toEqual('');
  });

  it('ignores a query string when working out the path', () => {
    expect(locationOf(undefined, 'https://x/sites/A/Docs/a.aspx?web=1')).toEqual('A / Docs');
  });
});

import {
  PageFieldDefinition,
  selectCarriedFields,
  toRawPageData,
  unportableColumns
} from './pageMapping';

const field = (
  internalName: string,
  overrides: Partial<PageFieldDefinition> = {}
): PageFieldDefinition => ({
  internalName,
  typeAsString: 'Text',
  readOnly: false,
  hidden: false,
  fromBaseType: false,
  canBeDeleted: true,
  ...overrides
});

describe('selectCarriedFields', () => {
  it('carries the comments setting, which lives outside the canvas', () => {
    const carried = selectCarriedFields({ _CommentsDisabled: true }, []);

    expect(carried._CommentsDisabled).toBe(true);
  });

  it('carries what a repost page reposts', () => {
    const carried = selectCarriedFields({
      _OriginalSourceUrl: 'https://contoso.sharepoint.com/sites/source/SitePages/A.aspx',
      _OriginalSourceSiteId: '11111111-1111-1111-1111-111111111111',
      _OriginalSourceWebId: '22222222-2222-2222-2222-222222222222',
      _OriginalSourceListId: '33333333-3333-3333-3333-333333333333',
      _OriginalSourceItemId: '7'
    }, []);

    expect(Object.keys(carried).sort()).toEqual([
      '_OriginalSourceItemId', '_OriginalSourceListId', '_OriginalSourceSiteId',
      '_OriginalSourceUrl', '_OriginalSourceWebId'
    ]);
  });

  it('carries a custom column of a portable type', () => {
    const carried = selectCarriedFields(
      { Department: 'Finance', ReviewDate: '2026-01-01T00:00:00Z' },
      [field('Department'), field('ReviewDate', { typeAsString: 'DateTime' })]
    );

    expect(carried).toEqual({ Department: 'Finance', ReviewDate: '2026-01-01T00:00:00Z' });
  });

  it('leaves inherited columns alone', () => {
    const carried = selectCarriedFields(
      { Title: 'Home', Modified: '2026-01-01T00:00:00Z' },
      [field('Title', { fromBaseType: true, canBeDeleted: false }),
        field('Modified', { fromBaseType: true, canBeDeleted: false, readOnly: true })]
    );

    expect(carried).toEqual({});
  });

  it('skips a column whose value means nothing on another site', () => {
    const carried = selectCarriedFields(
      { Reviewer: 5, RelatedItem: 12, Category: 'a|b' },
      [
        field('Reviewer', { typeAsString: 'User' }),
        field('RelatedItem', { typeAsString: 'Lookup' }),
        field('Category', { typeAsString: 'TaxonomyFieldType' })
      ]
    );

    expect(carried).toEqual({});
  });

  it('skips hidden and read-only columns', () => {
    const carried = selectCarriedFields(
      { Secret: 'x', Computed: 'y' },
      [field('Secret', { hidden: true }), field('Computed', { readOnly: true })]
    );

    expect(carried).toEqual({});
  });

  it('omits absent and null values rather than writing them as empty', () => {
    const carried = selectCarriedFields({ _CommentsDisabled: null, Department: undefined }, [field('Department')]);

    expect(carried).toEqual({});
  });

  it('carries nothing when the schema could not be read', () => {
    const carried = selectCarriedFields({ _CommentsDisabled: true, Department: 'Finance' }, undefined);

    expect(carried).toEqual({ _CommentsDisabled: true });
  });
});

describe('unportableColumns', () => {
  it('reports custom columns that hold data but cannot follow the page', () => {
    const reported = unportableColumns(
      { Reviewer: 5, Empty: '', Department: 'Finance' },
      [
        field('Reviewer', { typeAsString: 'User' }),
        field('Empty', { typeAsString: 'User' }),
        field('Department')
      ]
    );

    expect(reported).toEqual(['Reviewer']);
  });
});

describe('toRawPageData with a schema', () => {
  it('attaches the carried values to the page', () => {
    const raw = toRawPageData({
      pageUrl: 'https://contoso.sharepoint.com/sites/source/SitePages/Home.aspx',
      pagePath: '/sites/source/SitePages/Home.aspx',
      listItem: { Id: 1, Title: 'Home', _CommentsDisabled: true, Department: 'Finance' } as never,
      sourceFields: [field('Department')]
    });

    expect(raw.carriedFields).toEqual({ _CommentsDisabled: true, Department: 'Finance' });
    expect(raw.unportableColumns).toEqual([]);
  });
});

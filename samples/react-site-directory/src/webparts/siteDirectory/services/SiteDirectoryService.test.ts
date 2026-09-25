import {
  buildFilter,
  buildListQuery,
  buildSelectFields,
  isSafeSiteUrl,
  mapSiteDirectoryItem,
  paginateItems,
  type ISiteDirectoryConfig,
  type ISiteDirectoryQuery,
  validateConfig
} from './SiteDirectoryService';
import type { ISiteDirectoryItem } from '../models/ISiteDirectoryItem';

const config: ISiteDirectoryConfig = {
  listTitle: 'Sites',
  titleField: 'Title',
  categoryField: 'Category',
  urlField: 'URL',
  descriptionField: 'Description',
  ownerField: 'Owner',
  logoUrlField: 'LogoUrl',
  pageSize: 2
};

const query: ISiteDirectoryQuery = {
  searchText: '',
  category: '',
  sort: 'asc',
  pageIndex: 0,
  pageSize: 2
};

const item = (id: number): ISiteDirectoryItem => ({
  key: `site-directory-${id}`,
  id,
  title: `Site ${id}`,
  category: 'Team',
  url: `https://contoso.sharepoint.com/sites/site-${id}`,
  description: '',
  owner: '',
  logoUrl: ''
});

describe('SiteDirectoryService helpers', () => {
  it('validates required values, internal names, and page size', () => {
    expect(validateConfig(config)).toEqual([]);
    expect(validateConfig({ listTitle: '', titleField: 'Title field', urlField: '', pageSize: 0 })).toEqual([
      'Set the SharePoint list title.',
      'Title field must be a SharePoint internal field name (letters, numbers, and underscores).',
      'Set the url field internal name.',
      'Page size must be between 1 and 50.'
    ]);
  });

  it('builds a trimmed, unique select list', () => {
    expect(buildSelectFields({ ...config, titleField: ' Title ', categoryField: 'Title' })).toEqual([
      'Id', 'Title', 'URL', 'Description', 'Owner', 'LogoUrl'
    ]);
  });

  it('builds escaped search and category filters', () => {
    expect(buildFilter(config, { ...query, searchText: "O'Brien", category: 'Team' }))
      .toBe("(substringof('O''Brien',Title) or substringof('O''Brien',Description)) and Category eq 'Team'");
    expect(buildFilter(config, query)).toBeUndefined();
  });

  it('builds a bounded paged list query', () => {
    expect(buildListQuery(config, { ...query, pageIndex: 2, sort: 'desc' })).toEqual({
      fields: ['Id', 'Title', 'Category', 'URL', 'Description', 'Owner', 'LogoUrl'],
      filter: undefined,
      orderBy: { field: 'Title', ascending: false },
      top: 3,
      skip: 4
    });
    expect(() => buildListQuery({ ...config, listTitle: '' }, query)).toThrow('SharePoint list title');
  });

  it('maps SharePoint values and ignores items without a positive ID', () => {
    expect(mapSiteDirectoryItem({
      Id: '7',
      Title: '  Hub  ',
      Category: { Title: 'Team' },
      URL: { Url: 'https://contoso.sharepoint.com/sites/hub' },
      Description: 'A shared home',
      Owner: { Email: 'owner@contoso.com' },
      LogoUrl: { Url: 'https://contoso.sharepoint.com/logo.png' }
    }, config)).toEqual({
      key: 'site-directory-7',
      id: 7,
      title: 'Hub',
      category: 'Team',
      url: 'https://contoso.sharepoint.com/sites/hub',
      description: 'A shared home',
      owner: 'owner@contoso.com',
      logoUrl: 'https://contoso.sharepoint.com/logo.png'
    });
    expect(mapSiteDirectoryItem({ Id: 0, Title: 'Missing' }, config)).toBeUndefined();
  });

  it('returns one page and reports whether another page exists', () => {
    expect(paginateItems([item(1), item(2), item(3)], 0, 2)).toEqual({
      items: [item(1), item(2)],
      hasNext: true,
      pageIndex: 0
    });
    expect(paginateItems([item(1), item(2), item(3)], 1, 2)).toEqual({
      items: [item(3)],
      hasNext: false,
      pageIndex: 1
    });
  });

  it('only permits HTTPS URLs or same-origin relative HTTP URLs', () => {
    const origin = 'https://contoso.sharepoint.com';
    expect(isSafeSiteUrl('https://other.example.com/site', origin)).toBe(true);
    expect(isSafeSiteUrl('/sites/teams', origin)).toBe(true);
    expect(isSafeSiteUrl('http://contoso.sharepoint.com/sites/teams', origin)).toBe(false);
    expect(isSafeSiteUrl('//other.example.com/site', origin)).toBe(false);
    expect(isSafeSiteUrl(['java', 'script:alert(1)'].join(''), origin)).toBe(false);
    expect(isSafeSiteUrl('', origin)).toBe(false);
  });
});

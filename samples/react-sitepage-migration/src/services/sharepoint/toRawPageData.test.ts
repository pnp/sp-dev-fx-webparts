import { PageListItemResponse, toRawPageData } from './pageMapping';

const PAGE_URL = 'https://contoso.sharepoint.com/SitePages/Page(10).aspx';
const PAGE_PATH = '/SitePages/Page(10).aspx';

const map = (listItem: PageListItemResponse, pagePath = PAGE_PATH) =>
  toRawPageData({ pageUrl: PAGE_URL, pagePath, listItem });

describe('toRawPageData', () => {
  it('derives the file name from the path when the item omits FileLeafRef', () => {
    const page = map({ Id: 7, CanvasContent1: '<div></div>' });

    expect(page.pageName).toBe('Page(10).aspx');
    expect(page.pagePath).toBe(PAGE_PATH);
    expect(page.pageId).toBe('7');
  });

  it('prefers the item values when the list does return them', () => {
    const page = map({ Id: 7, FileLeafRef: 'Renamed.aspx', FileRef: '/SitePages/Renamed.aspx' });

    expect(page.pageName).toBe('Renamed.aspx');
    expect(page.pagePath).toBe('/SitePages/Renamed.aspx');
  });

  it('falls back to the file name when the page has no title', () => {
    expect(map({ Id: 1 }).title).toBe('Page(10)');
    expect(map({ Id: 1, Title: '   ' }).title).toBe('Page(10)');
    expect(map({ Id: 1, Title: 'Quarterly update' }).title).toBe('Quarterly update');
  });

  it('handles nested and encoded-source paths', () => {
    expect(map({ Id: 1 }, '/sites/team/SitePages/sv/DepartmentHome.aspx').pageName)
      .toBe('DepartmentHome.aspx');
    expect(map({ Id: 1 }, '/SitePages/Nyheter på svenska.aspx').pageName)
      .toBe('Nyheter på svenska.aspx');
  });

  it('accepts either shape of BannerImageUrl', () => {
    expect(map({ Id: 1, BannerImageUrl: '/a/b.png' }).bannerImageUrl).toBe('/a/b.png');
    expect(map({ Id: 1, BannerImageUrl: { Url: '/a/c.png' } }).bannerImageUrl).toBe('/a/c.png');
    expect(map({ Id: 1 }).bannerImageUrl).toBeUndefined();
  });

  it('normalises PromotedState to a string regardless of the field type', () => {
    expect(map({ Id: 1, PromotedState: 2 }).promotedState).toBe('2');
    expect(map({ Id: 1, PromotedState: '0' }).promotedState).toBe('0');
    expect(map({ Id: 1 }).promotedState).toBeUndefined();
  });

  it('defaults an absent canvas to an empty string rather than undefined', () => {
    expect(map({ Id: 1 }).canvasContent1).toBe('');
  });

  it('takes the author from the caller, not from the list item', () => {
    const page = toRawPageData({
      pageUrl: PAGE_URL,
      pagePath: PAGE_PATH,
      listItem: { Id: 1 },
      author: { name: 'Nicolas Kheirallah', email: 'nicolas@contoso.com' }
    });

    expect(page.authorName).toBe('Nicolas Kheirallah');
    expect(page.authorEmail).toBe('nicolas@contoso.com');
  });

  it('rejects an item with no Id, which cannot be migrated', () => {
    expect(() => map({} as PageListItemResponse)).toThrow(/no Id/i);
  });

  it('does not require any optional Site Pages field to be present', () => {
    const page = map({ Id: 1 });

    expect(page.thumbnailUrl).toBeUndefined();
    expect(page.topicHeader).toBeUndefined();
    expect(page.pageLayoutType).toBeUndefined();
    expect(page.pageName).toBe('Page(10).aspx');
  });
});

import { PageInventoryItem } from '../../models/PageInventoryItem';
import { filterByModifiedSince } from './GraphDiscoveryService';

const page = (name: string, lastModifiedDateTime: string): PageInventoryItem => ({
  key: name,
  id: name,
  pageId: name,
  title: name,
  name: `${name}.aspx`,
  webUrl: `https://contoso.sharepoint.com/sites/source/SitePages/${name}.aspx`,
  authorName: 'Someone',
  createdDateTime: '2026-01-01T00:00:00.000Z',
  lastModifiedDateTime,
  layout: 'article',
  promotionState: 'page',
  migrationStatus: 'NotStarted',
  warningCount: 0
});

describe('filterByModifiedSince', () => {
  const pages = [
    page('old', '2026-01-01T00:00:00.000Z'),
    page('new', '2026-07-01T00:00:00.000Z')
  ];

  it('keeps pages modified on or after the threshold', () => {
    expect(filterByModifiedSince(pages, '2026-06-01T00:00:00.000Z').map((p) => p.id)).toEqual(['new']);
    expect(filterByModifiedSince(pages, '2026-07-01T00:00:00.000Z').map((p) => p.id)).toEqual(['new']);
  });

  it('returns everything when no threshold is given', () => {
    expect(filterByModifiedSince(pages, undefined)).toBe(pages);
  });

  it('returns everything when the threshold cannot be parsed', () => {
    expect(filterByModifiedSince(pages, 'last tuesday')).toBe(pages);
  });

  it('keeps a page whose own timestamp cannot be parsed', () => {
    const broken = [page('broken', 'not-a-date')];

    expect(filterByModifiedSince(broken, '2026-06-01T00:00:00.000Z')).toHaveLength(1);
  });
});

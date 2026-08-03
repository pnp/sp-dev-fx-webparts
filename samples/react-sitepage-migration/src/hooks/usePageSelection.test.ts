import { PageInventoryItem } from '../models/PageInventoryItem';
import { buildGrouping, scopedStorageKey } from './usePageSelection';

const page = (id: string, overrides: Partial<PageInventoryItem> = {}): PageInventoryItem => ({
  key: id,
  id,
  pageId: id,
  title: `Page ${id}`,
  name: `${id}.aspx`,
  webUrl: `https://c.sharepoint.com/sites/a/SitePages/${id}.aspx`,
  authorName: 'Someone',
  createdDateTime: '2026-01-01T00:00:00.000Z',
  lastModifiedDateTime: '2026-01-01T00:00:00.000Z',
  layout: 'Article',
  promotionState: 'page',
  migrationStatus: 'NotStarted',
  warningCount: 0,
  ...overrides
});

describe('buildGrouping', () => {
  it('returns the items untouched when grouping is off', () => {
    const items = [page('a'), page('b')];
    const result = buildGrouping(items, 'none');

    expect(result.groups).toBeUndefined();
    expect(result.items).toBe(items);
  });

  it('returns items reordered to match the group offsets', () => {
    const items = [
      page('a', { migrationStatus: 'Completed' }),
      page('b', { migrationStatus: 'Failed' }),
      page('c', { migrationStatus: 'Completed' }),
      page('d', { migrationStatus: 'Failed' })
    ];

    const { items: ordered, groups } = buildGrouping(items, 'migrationStatus');

    expect(groups).toBeDefined();
    groups?.forEach((group) => {
      const slice = ordered.slice(group.startIndex, group.startIndex + group.count);
      expect(slice).toHaveLength(group.count);
      slice.forEach((item) => expect(item.migrationStatus).toBe(group.key));
    });
  });

  it('covers every item exactly once', () => {
    const items = [page('a'), page('b', { layout: 'Home' }), page('c')];
    const { items: ordered, groups } = buildGrouping(items, 'layout');

    expect(ordered).toHaveLength(items.length);
    expect(groups?.reduce((sum, group) => sum + group.count, 0)).toBe(items.length);
    expect(new Set(ordered.map((item) => item.id)).size).toBe(items.length);
  });

  it('orders status groups so the most actionable ones come first', () => {
    const items = [
      page('a', { migrationStatus: 'Completed' }),
      page('b', { migrationStatus: 'Failed' }),
      page('c', { migrationStatus: 'Warning' })
    ];

    const { groups } = buildGrouping(items, 'migrationStatus');
    expect(groups?.map((group) => group.key)).toEqual(['Failed', 'Warning', 'Completed']);
  });

  it('orders other groupings alphabetically', () => {
    const items = [page('a', { layout: 'Home' }), page('b', { layout: 'Article' })];
    const { groups } = buildGrouping(items, 'layout');
    expect(groups?.map((group) => group.key)).toEqual(['Article', 'Home']);
  });

  it('handles an empty list', () => {
    const { items, groups } = buildGrouping([], 'migrationStatus');
    expect(items).toHaveLength(0);
    expect(groups).toHaveLength(0);
  });
});

describe('scopedStorageKey', () => {
  it('separates users so one person\'s saved view is not visible to the next', () => {
    expect(scopedStorageKey('base', 'user-a')).toBe('base:user-a');
    expect(scopedStorageKey('base', 'user-a')).not.toBe(scopedStorageKey('base', 'user-b'));
  });
});

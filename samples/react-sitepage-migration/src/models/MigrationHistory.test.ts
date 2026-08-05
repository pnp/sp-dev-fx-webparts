import {
  applyMigrationHistory,
  countPreviouslyMigrated,
  MigrationHistoryEntry,
  mergeHistoryEntries,
  selectPagesNeedingMigration
} from './MigrationHistory';
import { PageInventoryItem } from './PageInventoryItem';

const SOURCE = 'https://contoso.sharepoint.com/SitePages';

const page = (name: string, overrides: Partial<PageInventoryItem> = {}): PageInventoryItem => ({
  key: name,
  id: name,
  pageId: name,
  title: name,
  name: `${name}.aspx`,
  webUrl: `${SOURCE}/${name}.aspx`,
  authorName: 'Someone',
  createdDateTime: '2026-01-01T00:00:00.000Z',
  lastModifiedDateTime: '2026-01-01T00:00:00.000Z',
  layout: 'Article',
  promotionState: 'page',
  migrationStatus: 'NotStarted',
  warningCount: 0,
  ...overrides
});

const entry = (name: string, overrides: Partial<MigrationHistoryEntry> = {}): MigrationHistoryEntry => ({
  sourcePageUrl: `${SOURCE}/${name}.aspx`,
  targetPageUrl: `https://contoso.sharepoint.com/sites/dest/SitePages/${name}.aspx`,
  migratedAt: '2026-07-01T10:00:00.000Z',
  finalStatus: 'Completed',
  ...overrides
});

describe('mergeHistoryEntries', () => {
  it('keeps only the most recent record for a page', () => {
    const history = mergeHistoryEntries([
      entry('home', { migratedAt: '2026-06-01T10:00:00.000Z', finalStatus: 'Failed' }),
      entry('home', { migratedAt: '2026-07-01T10:00:00.000Z', finalStatus: 'Completed' })
    ]);

    expect(history.size).toBe(1);
    expect([...history.values()][0].finalStatus).toBe('Completed');
  });

  it('matches page urls case-insensitively', () => {
    const history = mergeHistoryEntries([
      entry('home', { sourcePageUrl: `${SOURCE}/Home.aspx` }),
      entry('home', { sourcePageUrl: `${SOURCE}/home.aspx`, migratedAt: '2026-08-01T10:00:00.000Z' })
    ]);

    expect(history.size).toBe(1);
  });

  it('discards records with no page or no date', () => {
    const history = mergeHistoryEntries([
      entry('a', { sourcePageUrl: '' }),
      entry('b', { migratedAt: '' })
    ]);
    expect(history.size).toBe(0);
  });
});

describe('applyMigrationHistory', () => {
  it('marks previously migrated pages and carries the destination link', () => {
    const history = mergeHistoryEntries([entry('home')]);
    const [applied] = applyMigrationHistory([page('home')], history);

    expect(applied.migrationStatus).toBe('Completed');
    expect(applied.lastMigratedAt).toBe('2026-07-01T10:00:00.000Z');
    expect(applied.targetPageUrl).toContain('/sites/dest/SitePages/home.aspx');
  });

  it('does not claim success for a page whose last run failed', () => {
    const history = mergeHistoryEntries([entry('home', { finalStatus: 'Failed' })]);
    expect(applyMigrationHistory([page('home')], history)[0].migrationStatus).toBe('Failed');
  });

  it('never overwrites a status produced by the current session', () => {
    const history = mergeHistoryEntries([entry('home')]);

    (['Ready', 'Queued', 'Failed', 'Warning', 'Migrating'] as const).forEach((status) => {
      const [applied] = applyMigrationHistory([page('home', { migrationStatus: status })], history);
      expect(applied.migrationStatus).toBe(status);
      expect(applied.lastMigratedAt).toBeUndefined();
    });
  });

  it('leaves pages with no record untouched', () => {
    const history = mergeHistoryEntries([entry('home')]);
    const [applied] = applyMigrationHistory([page('other')], history);

    expect(applied.migrationStatus).toBe('NotStarted');
    expect(applied.lastMigratedAt).toBeUndefined();
  });

  it('returns the original array when nothing changes', () => {
    const pages = [page('other')];
    expect(applyMigrationHistory(pages, mergeHistoryEntries([entry('home')]))).toBe(pages);
    expect(applyMigrationHistory(pages, new Map())).toBe(pages);
  });
});

describe('countPreviouslyMigrated', () => {
  it('counts only pages that actually reached the destination', () => {
    const history = mergeHistoryEntries([
      entry('a'),
      entry('b', { finalStatus: 'Skipped' }),
      entry('c', { finalStatus: 'Failed' })
    ]);

    expect(countPreviouslyMigrated([page('a'), page('b'), page('c'), page('d')], history)).toBe(2);
  });
});

describe('selectPagesNeedingMigration', () => {
  it('includes pages that have never been migrated here', () => {
    const history = mergeHistoryEntries([entry('a')]);

    expect(selectPagesNeedingMigration([page('a'), page('b')], history)).toEqual(['b']);
  });

  it('includes a page changed at the source since it was migrated', () => {
    const history = mergeHistoryEntries([entry('a', { migratedAt: '2026-07-01T10:00:00.000Z' })]);
    const changed = page('a', { lastModifiedDateTime: '2026-07-02T10:00:00.000Z' });
    const unchanged = page('b', { lastModifiedDateTime: '2026-06-01T10:00:00.000Z' });

    expect(selectPagesNeedingMigration(
      [changed, unchanged],
      mergeHistoryEntries([...history.values(), entry('b', { migratedAt: '2026-07-01T10:00:00.000Z' })])
    )).toEqual(['a']);
  });

  it('includes a page whose last attempt wrote nothing', () => {
    const history = mergeHistoryEntries([
      entry('a', { finalStatus: 'Failed' }),
      entry('b', { finalStatus: 'Cancelled' }),
      entry('c', { finalStatus: 'Planned' }),
      entry('d', { finalStatus: 'Completed' })
    ]);

    expect(selectPagesNeedingMigration([page('a'), page('b'), page('c'), page('d')], history))
      .toEqual(['a', 'b', 'c']);
  });

  it('includes a page whose timestamps cannot be compared', () => {
    const history = mergeHistoryEntries([entry('a', { migratedAt: 'not a date' })]);

    expect(selectPagesNeedingMigration([page('a')], history)).toEqual(['a']);
  });

  it('treats a skipped page as already present', () => {
    const history = mergeHistoryEntries([entry('a', { finalStatus: 'Skipped' })]);

    expect(selectPagesNeedingMigration([page('a')], history)).toEqual([]);
  });
});

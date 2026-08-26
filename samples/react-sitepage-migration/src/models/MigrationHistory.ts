import { durableFinalStatuses, MigrationFinalStatus } from './MigrationReport';
import { PageInventoryItem } from './PageInventoryItem';

export interface MigrationHistoryEntry {
  readonly sourcePageUrl: string;
  readonly targetPageUrl?: string;
  readonly migratedAt: string;
  readonly finalStatus: MigrationFinalStatus;
  readonly runId?: string;
}

export type MigrationHistory = ReadonlyMap<string, MigrationHistoryEntry>;

export const historyKey = (sourcePageUrl: string): string => sourcePageUrl.trim().toLowerCase();

export const mergeHistoryEntries = (
  entries: ReadonlyArray<MigrationHistoryEntry>
): MigrationHistory => {
  const latest = new Map<string, MigrationHistoryEntry>();

  entries.forEach((entry) => {
    if (!entry.sourcePageUrl || !entry.migratedAt) {
      return;
    }

    const key = historyKey(entry.sourcePageUrl);
    const existing = latest.get(key);
    if (!existing || Date.parse(entry.migratedAt) > Date.parse(existing.migratedAt)) {
      latest.set(key, entry);
    }
  });

  return latest;
};

export const applyMigrationHistory = (
  pages: ReadonlyArray<PageInventoryItem>,
  history: MigrationHistory
): ReadonlyArray<PageInventoryItem> => {
  if (history.size === 0) {
    return pages;
  }

  let changed = false;
  const next = pages.map((page) => {
    const entry = history.get(historyKey(page.webUrl));
    if (!entry || page.migrationStatus !== 'NotStarted') {
      return page;
    }

    const isDurable = durableFinalStatuses.has(entry.finalStatus);
    if (!isDurable && entry.finalStatus !== 'Failed') {
      return page;
    }

    changed = true;
    return {
      ...page,
      migrationStatus: isDurable ? 'Completed' : 'Failed',
      targetPageUrl: entry.targetPageUrl ?? page.targetPageUrl,
      lastMigratedAt: entry.migratedAt
    } satisfies PageInventoryItem;
  });

  return changed ? next : pages;
};

export const countPreviouslyMigrated = (
  pages: ReadonlyArray<PageInventoryItem>,
  history: MigrationHistory
): number =>
  pages.filter((page) => {
    const entry = history.get(historyKey(page.webUrl));
    return !!entry && durableFinalStatuses.has(entry.finalStatus);
  }).length;

export const needsMigration = (
  page: PageInventoryItem,
  history: MigrationHistory
): boolean => {
  const entry = history.get(historyKey(page.webUrl));
  if (!entry || !durableFinalStatuses.has(entry.finalStatus)) {
    return true;
  }

  const migratedAt = Date.parse(entry.migratedAt);
  const modifiedAt = Date.parse(page.lastModifiedDateTime);
  if (Number.isNaN(migratedAt) || Number.isNaN(modifiedAt)) {
    return true;
  }

  return modifiedAt > migratedAt;
};

export const selectPagesNeedingMigration = (
  pages: ReadonlyArray<PageInventoryItem>,
  history: MigrationHistory
): ReadonlyArray<string> =>
  pages.filter((page) => needsMigration(page, history)).map((page) => page.id);

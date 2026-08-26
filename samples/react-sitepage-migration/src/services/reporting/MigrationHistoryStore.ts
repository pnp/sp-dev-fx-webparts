import { MigrationHistory, MigrationHistoryEntry, mergeHistoryEntries } from '../../models/MigrationHistory';

const STORAGE_KEY = 'spfx-page-migration:history';
const MAX_ENTRIES_PER_PAIR = 2000;

export class MigrationHistoryStore {
  private readonly _scope: string;

  public constructor(storageScope: string) {
    this._scope = storageScope;
  }

  public read(sourceSiteId: string, targetSiteId: string): MigrationHistory {
    try {
      const raw = localStorage.getItem(this.key(sourceSiteId, targetSiteId));
      if (!raw) {
        return new Map();
      }

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return new Map();
      }

      return mergeHistoryEntries(parsed.filter(isHistoryEntry));
    } catch {
      return new Map();
    }
  }

  public write(
    sourceSiteId: string,
    targetSiteId: string,
    entries: ReadonlyArray<MigrationHistoryEntry>
  ): void {
    if (entries.length === 0) {
      return;
    }

    try {
      const merged = mergeHistoryEntries([
        ...this.read(sourceSiteId, targetSiteId).values(),
        ...entries
      ]);

      const trimmed = [...merged.values()]
        .sort((left, right) => Date.parse(right.migratedAt) - Date.parse(left.migratedAt))
        .slice(0, MAX_ENTRIES_PER_PAIR);

      localStorage.setItem(this.key(sourceSiteId, targetSiteId), JSON.stringify(trimmed));
      // eslint-disable-next-line no-empty
    } catch {
    }
  }

  private key(sourceSiteId: string, targetSiteId: string): string {
    return `${STORAGE_KEY}:${this._scope}:${sourceSiteId}:${targetSiteId}`;
  }
}

const isHistoryEntry = (value: unknown): value is MigrationHistoryEntry => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<MigrationHistoryEntry>;
  return typeof candidate.sourcePageUrl === 'string'
    && typeof candidate.migratedAt === 'string'
    && typeof candidate.finalStatus === 'string';
};

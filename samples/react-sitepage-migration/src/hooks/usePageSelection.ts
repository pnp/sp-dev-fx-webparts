import * as React from 'react';
import { PageInventoryItem } from '../models/PageInventoryItem';
import { NormalizedPage } from '../models/NormalizedPage';

export type GroupByKey = 'none' | 'migrationStatus' | 'layout' | 'promotionState';
export type ColumnKey =
  | 'name'
  | 'authorName'
  | 'createdDateTime'
  | 'lastModifiedDateTime'
  | 'layout'
  | 'promotionState'
  | 'warningCount'
  | 'lastMigratedAt';

export interface PageGroup {
  readonly key: string;
  readonly startIndex: number;
  readonly count: number;
}

const ALL_COLUMN_KEYS: ReadonlyArray<ColumnKey> = [
  'name',
  'authorName',
  'createdDateTime',
  'lastModifiedDateTime',
  'layout',
  'promotionState',
  'warningCount',
  'lastMigratedAt'
];

const DEFAULT_COLUMN_KEYS: ReadonlyArray<ColumnKey> = [
  'authorName',
  'lastModifiedDateTime',
  'layout',
  'warningCount',
  'lastMigratedAt'
];

const COLUMN_STORAGE_KEY = 'spfx-page-migration:columns';
const FILTER_DEBOUNCE_MS = 200;

export const scopedStorageKey = (baseKey: string, scope: string): string => `${baseKey}:${scope}`;

const readVisibleColumns = (storageKey: string): ReadonlySet<ColumnKey> => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const valid = parsed.filter((key): key is ColumnKey => ALL_COLUMN_KEYS.includes(key as ColumnKey));
        if (valid.length > 0) {
          return new Set(valid);
        }
      }
    }
    // eslint-disable-next-line no-empty
  } catch {
  }
  return new Set(DEFAULT_COLUMN_KEYS);
};

const writeVisibleColumns = (storageKey: string, columns: ReadonlySet<ColumnKey>): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(columns)));
    // eslint-disable-next-line no-empty
  } catch {
  }
};

export interface UsePageSelectionResult {
  readonly pages: ReadonlyArray<PageInventoryItem>;
  readonly visiblePages: ReadonlyArray<PageInventoryItem>;
  readonly groups: ReadonlyArray<PageGroup> | undefined;
  readonly selectedPageIds: ReadonlySet<string>;
  readonly pageDetailsById: Readonly<Record<string, NormalizedPage>>;
  readonly filterText: string;
  readonly sortColumn: keyof PageInventoryItem;
  readonly sortDescending: boolean;
  readonly groupBy: GroupByKey;
  readonly visibleColumns: ReadonlySet<ColumnKey>;
  readonly setPages: React.Dispatch<React.SetStateAction<ReadonlyArray<PageInventoryItem>>>;
  readonly setPageDetailsById: React.Dispatch<React.SetStateAction<Readonly<Record<string, NormalizedPage>>>>;
  readonly setFilterText: (value: string) => void;
  readonly setSelectedPageIds: (pageIds: ReadonlyArray<string>) => void;
  readonly togglePageSelected: (pageId: string) => void;
  readonly setSorting: (column: keyof PageInventoryItem) => void;
  readonly setGroupBy: (key: GroupByKey) => void;
  readonly toggleColumnVisibility: (key: ColumnKey) => void;
  readonly updatePageStatus: (
    pageId: string,
    status: PageInventoryItem['migrationStatus'],
    targetPageUrl?: string,
    warningCount?: number
  ) => void;
  readonly resetPages: () => void;
  readonly selectAllVisible: () => void;
  readonly clearSelection: () => void;
}

const areSetsEqual = (left: ReadonlySet<string>, rightValues: ReadonlyArray<string>): boolean =>
  left.size === rightValues.length && rightValues.every((value) => left.has(value));

const compareValues = (left: unknown, right: unknown, column: keyof PageInventoryItem): number => {
  if (column === 'warningCount') {
    return Number(left ?? 0) - Number(right ?? 0);
  }

  if (column === 'lastModifiedDateTime' || column === 'createdDateTime') {
    const leftTime = Date.parse(String(left ?? ''));
    const rightTime = Date.parse(String(right ?? ''));
    return (Number.isNaN(leftTime) ? 0 : leftTime) - (Number.isNaN(rightTime) ? 0 : rightTime);
  }

  return String(left ?? '').localeCompare(String(right ?? ''), undefined, { sensitivity: 'base', numeric: true });
};

const STATUS_ORDER: Readonly<Record<string, number>> = {
  Failed: 0,
  Warning: 1,
  Ready: 2,
  Migrating: 3,
  Validating: 4,
  Queued: 5,
  NotStarted: 6,
  Completed: 7
};

export const buildGrouping = (
  items: ReadonlyArray<PageInventoryItem>,
  groupBy: GroupByKey
): { items: ReadonlyArray<PageInventoryItem>; groups: ReadonlyArray<PageGroup> | undefined } => {
  if (groupBy === 'none') {
    return { items, groups: undefined };
  }

  const buckets = new Map<string, PageInventoryItem[]>();
  for (const item of items) {
    const key = String(item[groupBy] ?? 'Unknown');
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      buckets.set(key, [item]);
    }
  }

  const entries = Array.from(buckets.entries());
  if (groupBy === 'migrationStatus') {
    entries.sort(([left], [right]) => (STATUS_ORDER[left] ?? 99) - (STATUS_ORDER[right] ?? 99));
  } else {
    entries.sort(([left], [right]) => left.localeCompare(right));
  }

  const ordered: PageInventoryItem[] = [];
  const groups: PageGroup[] = [];
  for (const [key, bucket] of entries) {
    groups.push({ key, startIndex: ordered.length, count: bucket.length });
    ordered.push(...bucket);
  }

  return { items: ordered, groups };
};

export const usePageSelection = (storageScope: string): UsePageSelectionResult => {
  const columnStorageKey = React.useMemo(
    () => scopedStorageKey(COLUMN_STORAGE_KEY, storageScope),
    [storageScope]
  );

  const [pages, setPages] = React.useState<ReadonlyArray<PageInventoryItem>>([]);
  const [selectedPageIds, setSelectedPageIdsState] = React.useState<ReadonlySet<string>>(new Set());
  const [pageDetailsById, setPageDetailsById] = React.useState<Readonly<Record<string, NormalizedPage>>>({});
  const [filterText, setFilterTextState] = React.useState('');
  const [debouncedFilterText, setDebouncedFilterText] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState<keyof PageInventoryItem>('lastModifiedDateTime');
  const [sortDescending, setSortDescending] = React.useState(true);
  const [groupBy, setGroupByState] = React.useState<GroupByKey>('none');
  const [visibleColumns, setVisibleColumnsState] = React.useState<ReadonlySet<ColumnKey>>(
    () => readVisibleColumns(columnStorageKey)
  );
  const debounceRef = React.useRef<number>();

  const setFilterText = React.useCallback((value: string) => {
    setFilterTextState(value);
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setDebouncedFilterText(value), FILTER_DEBOUNCE_MS);
  }, []);

  const filteredPages = React.useMemo(() => {
    const search = debouncedFilterText.trim().toLowerCase();
    const filtered = search
      ? pages.filter((page) =>
        page.title.toLowerCase().includes(search) ||
        page.name.toLowerCase().includes(search) ||
        page.webUrl.toLowerCase().includes(search) ||
        page.authorName.toLowerCase().includes(search) ||
        page.layout.toLowerCase().includes(search) ||
        page.migrationStatus.toLowerCase().includes(search))
      : pages;

    return [...filtered].sort((left, right) => {
      const comparison = compareValues(left[sortColumn], right[sortColumn], sortColumn);
      return sortDescending ? -comparison : comparison;
    });
  }, [debouncedFilterText, pages, sortColumn, sortDescending]);

  const grouping = React.useMemo(() => buildGrouping(filteredPages, groupBy), [filteredPages, groupBy]);
  const visiblePages = grouping.items;

  const visiblePagesRef = React.useRef(visiblePages);
  visiblePagesRef.current = visiblePages;

  const selectAllVisible = React.useCallback(() => {
    setSelectedPageIdsState(new Set(visiblePagesRef.current.map((page) => page.id)));
  }, []);

  const clearSelection = React.useCallback(() => {
    setSelectedPageIdsState(new Set());
  }, []);

  const setSelectedPageIds = React.useCallback((pageIds: ReadonlyArray<string>) => {
    setSelectedPageIdsState((previous) => areSetsEqual(previous, pageIds) ? previous : new Set(pageIds));
  }, []);

  const togglePageSelected = React.useCallback((pageId: string) => {
    setSelectedPageIdsState((previous) => {
      const next = new Set(previous);
      if (!next.delete(pageId)) {
        next.add(pageId);
      }
      return next;
    });
  }, []);

  const updatePageStatus = React.useCallback((
    pageId: string,
    migrationStatus: PageInventoryItem['migrationStatus'],
    targetPageUrl?: string,
    warningCount?: number
  ) => {
    setPages((previous) => {
      const index = previous.findIndex((page) => page.id === pageId);
      if (index < 0) {
        return previous;
      }

      const current = previous[index];
      if (
        current.migrationStatus === migrationStatus &&
        (targetPageUrl === undefined || current.targetPageUrl === targetPageUrl) &&
        (warningCount === undefined || current.warningCount === warningCount)
      ) {
        return previous;
      }

      const next = [...previous];
      next[index] = {
        ...current,
        migrationStatus,
        targetPageUrl: targetPageUrl ?? current.targetPageUrl,
        warningCount: warningCount ?? current.warningCount
      };
      return next;
    });
  }, []);

  const setSorting = React.useCallback((column: keyof PageInventoryItem) => {
    setSortColumn((previousColumn) => {
      if (previousColumn === column) {
        setSortDescending((descending) => !descending);
        return previousColumn;
      }
      setSortDescending(false);
      return column;
    });
  }, []);

  const setGroupBy = React.useCallback((key: GroupByKey) => setGroupByState(key), []);

  const toggleColumnVisibility = React.useCallback((key: ColumnKey) => {
    setVisibleColumnsState((previous) => {
      const next = new Set(previous);
      if (next.has(key)) {
        if (next.size > 1) {
          next.delete(key);
        }
      } else {
        next.add(key);
      }
      writeVisibleColumns(columnStorageKey, next);
      return next;
    });
  }, [columnStorageKey]);

  const resetPages = React.useCallback(() => {
    setPages([]);
    setSelectedPageIdsState(new Set());
    setPageDetailsById({});
    setFilterTextState('');
    setDebouncedFilterText('');
    setGroupByState('none');
  }, []);

  React.useEffect(() => () => window.clearTimeout(debounceRef.current), []);

  return {
    pages,
    visiblePages,
    groups: grouping.groups,
    selectedPageIds,
    pageDetailsById,
    filterText,
    sortColumn,
    sortDescending,
    groupBy,
    visibleColumns,
    setPages,
    setPageDetailsById,
    setFilterText,
    setSelectedPageIds,
    togglePageSelected,
    setSorting,
    setGroupBy,
    toggleColumnVisibility,
    updatePageStatus,
    resetPages,
    selectAllVisible,
    clearSelection
  };
};

export const allColumnKeys = ALL_COLUMN_KEYS;

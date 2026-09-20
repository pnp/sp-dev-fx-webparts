import type { IListViewColumn } from '../interfaces/IListView';

/** A single filter chip rendered above the table. */
export interface IFilterChip {
  /** Stable identifier for the chip. */
  id: string;
  /** Header label of the column being filtered. */
  columnHeader: string;
  /** Display value (single value or comma-list). */
  valueLabel: string;
  /** Removal callback. */
  onRemove: () => void;
}

export interface IFilterChipsBarProps<TItem> {
  columns: IListViewColumn<TItem>[];
  appliedFilters: Record<string, Set<string>>;
  onRemoveValueFilter: (columnKey: string, value: string) => void;
  onClearAll: () => void;
  /** Localised "Filtered by:" prefix label. */
  filteredByLabel?: string;
  /** Localised clear-all action label. */
  clearAllLabel?: string;
  /** Optional className override merged with the shipped class. */
  className?: string;
}

import type { IListViewColumn } from '../interfaces/IListView';
import type { IFilterChip } from './FilterChipsBar.types';

/**
 * Builds the chip list shown above the table from the current applied
 * filter state.
 */
export const buildFilterChips = <TItem,>(
  columns: IListViewColumn<TItem>[],
  appliedFilters: Record<string, Set<string>>,
  onRemoveValueFilter: (columnKey: string, value: string) => void
): IFilterChip[] => {
  const chips: IFilterChip[] = [];

  for (const [columnKey, values] of Object.entries(appliedFilters)) {
    if (!values?.size) continue;
    const column = columns.find((c) => c.key === columnKey);
    if (!column) continue;
    values.forEach((value) => {
      chips.push({
        id: `${columnKey}::${value}`,
        columnHeader: column.header,
        valueLabel: value,
        onRemove: () => onRemoveValueFilter(columnKey, value)
      });
    });
  }

  return chips;
};

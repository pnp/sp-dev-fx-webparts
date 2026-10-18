import type { IListViewStrings } from './interfaces/IListViewStrings';

export const EMPTY_VALUE_LABEL = '';
export const FILTER_EMPTY_VALUE_LABEL = '(Empty)';

/** Default non-string ListView behaviour. */
export const LIST_VIEW_DEFAULTS = {
  EXPORT_FILENAME: 'list-view-export',
  ROW_HEIGHT: 44,
  VIEWPORT_HEIGHT: 960
} as const;

/**
 * Shipped English defaults for every string surface of `ListView`.
 * Consumers override individual entries via `IListViewProps.strings`.
 */
export const DEFAULT_LIST_VIEW_STRINGS: IListViewStrings = {
  emptyMessage: 'No items found',
  searchPlaceholder: 'Search this list',

  columnChooserAriaLabel: 'Choose columns',
  exportButtonLabel: 'Export to Excel',
  exportCsvLabel: 'Export to CSV',
  exportExcelLabel: 'Export to Excel',
  exportMenuAriaLabel: 'Choose export format',

  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  filter: 'Filter',

  filteredByLabel: 'Filtered by:',
  clearAllFiltersLabel: 'Clear all',

  filterPanelTitlePrefix: 'Filter by ',
  closeFilterPanelAriaLabel: 'Close filter panel',
  filterPanelSearchPlaceholder: 'Search values',
  filterPanelNoValues: 'No values found',
  filterPanelSelectedSuffix: 'selected',
  filterPanelApplyLabel: 'Apply',
  filterPanelClearLabel: 'Clear',
  filterPanelSelectAllLabel: 'Select all',
  filterPanelClearAllLabel: 'Clear all',

  emptyValueLabel: '',

  booleanTrueLabel: 'Yes',
  booleanFalseLabel: 'No',

  tableAriaLabel: 'List view',

  commonFilterAriaLabel: 'Filters',
  commonFilterPanelTitle: 'Filters',
  commonFilterNoColumns: 'No filterable columns',
  commonFilterApplyLabel: 'Apply',
  commonFilterClearAllLabel: 'Clear all',
  commonFilterCloseAriaLabel: 'Close filters',
  commonFilterActiveSuffix: 'active'
};

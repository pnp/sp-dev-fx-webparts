/**
 * Every user-facing string emitted by `ListView` and its sub-components.
 *
 * Pass a partial via `IListViewProps.strings` to localize. Anything missing
 * falls back to the shipped English defaults defined in
 * `DEFAULT_LIST_VIEW_STRINGS`.
 */
export interface IListViewStrings {
  /** Empty-state body text. */
  emptyMessage: string;
  /** Toolbar SearchBox placeholder. */
  searchPlaceholder: string;

  /** Tooltip / aria-label for the column-chooser button. */
  columnChooserAriaLabel: string;
  /** Toolbar export button label. */
  exportButtonLabel: string;
  /** Toolbar export menu — CSV item label (used when both CSV + Excel are enabled). */
  exportCsvLabel: string;
  /** Toolbar export menu — Excel item label (used when both CSV + Excel are enabled). */
  exportExcelLabel: string;
  /** Toolbar export menu — aria-label for the format dropdown trigger. */
  exportMenuAriaLabel: string;

  /** Header-cell menu — sort ascending. */
  sortAscending: string;
  /** Header-cell menu — sort descending. */
  sortDescending: string;
  /** Header-cell menu — open the filter panel. */
  filter: string;

  /** Filter chips bar prefix label. */
  filteredByLabel: string;
  /** Filter chips bar — clear-all action. */
  clearAllFiltersLabel: string;

  /** Filter panel — drawer title prefix (e.g. `Filter by `). */
  filterPanelTitlePrefix: string;
  /** Filter panel — close button aria-label. */
  closeFilterPanelAriaLabel: string;
  /** Filter panel — value-search box placeholder. */
  filterPanelSearchPlaceholder: string;
  /** Filter panel — empty-state. */
  filterPanelNoValues: string;
  /** Filter panel — selected suffix. */
  filterPanelSelectedSuffix: string;
  /** Filter panel — apply button label. */
  filterPanelApplyLabel: string;
  /** Filter panel — clear button label. */
  filterPanelClearLabel: string;
  /** Filter panel — select-all checkbox label. */
  filterPanelSelectAllLabel: string;
  /** Filter panel — clear-selection button label. */
  filterPanelClearAllLabel: string;

  /** Empty-formatted-value placeholder used in filter values. */
  emptyValueLabel: string;

  /** Boolean cell — default truthy label. */
  booleanTrueLabel: string;
  /** Boolean cell — default falsy label. */
  booleanFalseLabel: string;

  /** Aria label applied to the underlying `<Table>` element. */
  tableAriaLabel: string;

  /** Toolbar — common-filter toggle aria-label / tooltip. */
  commonFilterAriaLabel: string;
  /** Common filter panel — drawer title. */
  commonFilterPanelTitle: string;
  /** Common filter panel — empty state when no filterable columns exist. */
  commonFilterNoColumns: string;
  /** Common filter panel — apply button label. */
  commonFilterApplyLabel: string;
  /** Common filter panel — clear-all button label. */
  commonFilterClearAllLabel: string;
  /** Common filter panel — close button aria-label. */
  commonFilterCloseAriaLabel: string;
  /** Common filter panel — "active filters" footer summary suffix. */
  commonFilterActiveSuffix: string;
}

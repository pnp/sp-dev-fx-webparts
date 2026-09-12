/** Localised strings consumed by the filter side panel. */
export interface IListViewFilterPanelStrings {
  closeFilterPanelAriaLabel: string;
  searchValuesPlaceholder: string;
  noValuesFound: string;
  selectedSuffix: string;
  apply: string;
  clear: string;
  selectAll: string;
  clearAll: string;
}

/** Per-slot className overrides for the filter panel. */
export interface IListViewFilterPanelClassNames {
  drawerBody?: string;
  body?: string;
  searchContainer?: string;
  bulkRow?: string;
  valuesContainer?: string;
  footer?: string;
  emptyState?: string;
}

/** Props consumed by {@link ListViewFilterPanel}. */
export interface IListViewFilterPanelProps {
  open: boolean;
  title: string;
  values: string[];
  appliedValues: Set<string>;
  selectedValues: Set<string>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleValue: (value: string) => void;
  /** Bulk replacement of the selection — used by Select All / Clear All. */
  onReplaceValues: (next: Set<string>) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  /** Localised strings (full set required to keep the panel deterministic). */
  strings: IListViewFilterPanelStrings;
  /** Optional className overrides per slot. */
  classNames?: IListViewFilterPanelClassNames;
}

import * as React from 'react';
import {
  Button,
  Menu,
  MenuItemCheckbox,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SearchBox,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableResizeHandle,
  TableSelectionCell,
  Text,
  makeStyles,
  tokens,
  useTableColumnSizing_unstable,
  useTableFeatures,
  Hamburger
} from '@fluentui/react-components';
import {
  ArrowSortDownRegular,
  ArrowSortUpRegular,
  FilterRegular
} from '@fluentui/react-icons';
import { ListViewFilterPanel } from './FilterPanel/ListViewFilterPanel';
import {
  type IListViewColumn,
  type IListViewProps,
  type IListViewRef,
  type ISortState
} from './interfaces';
import { EMPTY_VALUE_LABEL, FILTER_EMPTY_VALUE_LABEL, LIST_VIEW_DEFAULTS } from './constants';

const useStyles = makeStyles({
  root: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden'
  },
  searchBoxContainer: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '8px 12px',
    display: 'flex',
    justifyContent:"flex-end"
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  searchBox: {
    flex: 1
  },
  viewport: {
    maxHeight: '480px',
    overflow: 'auto'
  },
  table: {
    width: '100%'
  },
  headerCell: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'left'
  },
  headerButton: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '32px',
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: tokens.fontWeightSemibold
  },
  row: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  emptyState: {
    padding: '20px',
    color: tokens.colorNeutralForeground3
  },
  virtualSpacer: {
    width: '100%'
  },
  cellContent: {
    minHeight: '40px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  selectionHeaderCell: {
    width: '44px',
    flex: '0 0 44px',
    minWidth: '44px',
    maxWidth: '44px'
  },
  selectionCell: {
    width: '44px',
    flex: '0 0 44px',
    minWidth: '44px',
    maxWidth: '44px'
  },
  resizeHandle: {
    marginLeft: 'auto',
    width: '12px',
    cursor: 'col-resize',
    touchAction: 'none'
  }
});

function ListViewInner<TItem>(
  props: Readonly<IListViewProps<TItem>>,
  ref: React.Ref<IListViewRef<TItem>>
): React.ReactElement {
  const {
    items,
    columns,
    getRowId,
    emptyMessage = LIST_VIEW_DEFAULTS.EMPTY_MESSAGE,
    panelTitle = LIST_VIEW_DEFAULTS.PANEL_TITLE,
    searchPlaceholder = LIST_VIEW_DEFAULTS.SEARCH_PLACEHOLDER,
    enableGlobalSearch = true,
    searchText,
    onSearchTextChange,
    enableColumnChooser = true,
    rowHeight = 44,
    viewportHeight = 480,
    overscanCount = 6,
    selectionMode = 'none',
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectionChange,
    onRowClick,
    renderRow
  } = props;
  const styles = useStyles();

  const [sortState, setSortState] = React.useState<ISortState | undefined>(undefined);
  const [internalSearchText, setInternalSearchText] = React.useState<string>('');
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const [activeFilterColumnKey, setActiveFilterColumnKey] = React.useState<string | undefined>(undefined);
  const [filterPanelSearch, setFilterPanelSearch] = React.useState<string>('');
  const [appliedFilters, setAppliedFilters] = React.useState<Record<string, Set<string>>>({});
  const [draftFilterValues, setDraftFilterValues] = React.useState<Set<string>>(new Set<string>());
  const [internalSelectedRowIds, setInternalSelectedRowIds] = React.useState<Set<string>>(
    defaultSelectedRowIds ? new Set(defaultSelectedRowIds) : new Set<string>()
  );
  const [visibleColumnKeys, setVisibleColumnKeys] = React.useState<string[]>(() =>
    columns
      .filter((column) => column.defaultVisible !== false)
      .map((column) => column.key)
  );

  const isSelectionControlled = selectedRowIds !== undefined;
  const selectedRows = isSelectionControlled ? selectedRowIds : internalSelectedRowIds;
  const hasSelection = selectionMode !== 'none';
  const activeSearchText = searchText ?? internalSearchText;

  const visibleColumns = React.useMemo(
    () =>
      visibleColumnKeys
        .map((key) => columns.find((col) => col.key === key))
        .filter((col): col is IListViewColumn<TItem> => col !== undefined),
    [columns, visibleColumnKeys]
  );

  React.useEffect(() => {
    setVisibleColumnKeys((previous) => {
      const allKeys = new Set(columns.map((col) => col.key));
      // Keep existing visible keys that still exist in columns (preserve order)
      let retained = previous.filter((key) => allKeys.has(key));
      const retainedSet = new Set(retained);
      // Append newly default-visible columns not yet in the list
      let added = columns
        .filter((col) => col.defaultVisible !== false && !retainedSet.has(col.key))
        .map((col) => col.key);
      // if __actions is being newly added, push it to the front rather than at the end
      if (added.includes('__actions')) {
        added = added.filter(k => k !== '__actions');
        retained = ['__actions', ...retained];
      }
      if (added.length === 0 && retained.length === previous.length) {
        return previous; // nothing changed
      }
      return [...retained, ...added];
    });
  }, [columns]);

  const activeFilterColumn = React.useMemo(
    () => columns.find((column) => column.key === activeFilterColumnKey),
    [activeFilterColumnKey, columns]
  );

  const updateSelection = React.useCallback((nextSelection: Set<string>) => {
    if (!isSelectionControlled) {
      setInternalSelectedRowIds(nextSelection);
    }

    onSelectionChange?.(nextSelection);
  }, [isSelectionControlled, onSelectionChange]);

  const getDisplayValueLabel = React.useCallback(<T,>(value: T): string => {
    if (value === null || value === undefined || String(value).trim() === '') {
      return EMPTY_VALUE_LABEL;
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return String(value);
  }, []);

  const getFilterValueLabel = React.useCallback(<T,>(value: T): string => {
    if (value === null || value === undefined || String(value).trim() === '') {
      return FILTER_EMPTY_VALUE_LABEL;
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return String(value);
  }, []);

  const activeFilterValues = React.useMemo(() => {
    if (!activeFilterColumn) {
      return [];
    }

    const uniqueValues = new Set<string>();

    items.forEach((item) => {
      uniqueValues.add(getFilterValueLabel(activeFilterColumn.getValue(item)));
    });

    return [...uniqueValues].sort((a, b) => a.localeCompare(b));
  }, [activeFilterColumn, getFilterValueLabel, items]);

  const visibleFilterValues = React.useMemo(() => {
    const normalizedSearch = filterPanelSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return activeFilterValues;
    }

    return activeFilterValues.filter((value) => value.toLowerCase().includes(normalizedSearch));
  }, [activeFilterValues, filterPanelSearch]);

  const passesGlobalSearch = React.useCallback((item: TItem): boolean => {
    const normalizedSearch = activeSearchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return true;
    }

    return columns.some((column) => {
      const cellValue = getDisplayValueLabel(column.getValue(item));
      return cellValue.toLowerCase().includes(normalizedSearch);
    });
  }, [activeSearchText, columns, getDisplayValueLabel]);

  const passesFilters = React.useCallback((item: TItem): boolean => {
    for (const [columnKey, selectedValues] of Object.entries(appliedFilters)) {
      if (!selectedValues?.size) {
        continue;
      }

      const column = columns.find((currentColumn) => currentColumn.key === columnKey);
      if (!column) {
        continue;
      }

      const cellLabel = getFilterValueLabel(column.getValue(item));
      if (!selectedValues.has(cellLabel)) {
        return false;
      }
    }

    return true;
  }, [appliedFilters, columns, getFilterValueLabel]);

  const applySorting = React.useCallback((sourceItems: TItem[]): TItem[] => {
    if (!sortState) {
      return sourceItems;
    }

    const sortedItems = [...sourceItems];
    const sortColumn = columns.find((column) => column.key === sortState.columnKey);

    if (!sortColumn) {
      return sortedItems;
    }

    sortedItems.sort((itemA, itemB) => {
      const valueA = getDisplayValueLabel(sortColumn.getValue(itemA));
      const valueB = getDisplayValueLabel(sortColumn.getValue(itemB));
      const comparison = valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
      return sortState.direction === 'asc' ? comparison : -comparison;
    });

    return sortedItems;
  }, [columns, getDisplayValueLabel, sortState]);

  const filteredAndSortedItems = React.useMemo(() => {
    const filteredItems = items
      .filter(passesGlobalSearch)
      .filter(passesFilters);

    return applySorting(filteredItems);
  }, [applySorting, items, passesFilters, passesGlobalSearch]);

  React.useImperativeHandle(ref, () => ({
    getCurrentItems: () => filteredAndSortedItems
  }), [filteredAndSortedItems]);

  const columnSizingOptions = React.useMemo(() => {
    return visibleColumns.reduce<Record<string, {
      minWidth?: number;
      idealWidth?: number;
      defaultWidth?: number;
    }>>((accumulator, column) => {
      const minWidth = column.minWidth ?? 120;
      const idealWidth = column.width ?? (column.isFlexibleWidth ? 260 : 180);

      accumulator[column.key] = {
        minWidth,
        idealWidth,
        defaultWidth: idealWidth
      };

      return accumulator;
    }, {});
  }, [visibleColumns]);

  const tableColumns = React.useMemo(() => {
    return visibleColumns.map((column) => ({
      columnId: column.key,
      compare: (itemA: TItem, itemB: TItem) => {
        const valueA = getDisplayValueLabel(column.getValue(itemA));
        const valueB = getDisplayValueLabel(column.getValue(itemB));
        return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
      },
      renderHeaderCell: () => column.header,
      renderCell: (item: TItem) => {
        const value = getDisplayValueLabel(column.getValue(item));
        return column.renderCell ? column.renderCell(item) : value;
      }
    }));
  }, [getDisplayValueLabel, visibleColumns]);

  const tableState = useTableFeatures({
    columns: tableColumns,
    items: filteredAndSortedItems
  }, [
    useTableColumnSizing_unstable({
      autoFitColumns: false,
      columnSizingOptions
    })
  ]);

  const { columnSizing_unstable: columnSizing } = tableState;
  const tableSizingProps = columnSizing.getTableProps();

  const openFilterPanel = React.useCallback(
    (columnKey: string) => {
      setActiveFilterColumnKey(columnKey);
      setFilterPanelSearch('');
      setDraftFilterValues(new Set(appliedFilters[columnKey] ?? []));
    },
    [appliedFilters]
  );

  const closeFilterPanel = React.useCallback(() => {
    setActiveFilterColumnKey(undefined);
    setFilterPanelSearch('');
    setDraftFilterValues(new Set<string>());
  }, []);

  const applyFilter = React.useCallback(() => {
    if (!activeFilterColumnKey) {
      return;
    }

    setAppliedFilters((prev) => {
      const next = { ...prev };

      if (draftFilterValues.size === 0) {
        delete next[activeFilterColumnKey];
      } else {
        next[activeFilterColumnKey] = new Set(draftFilterValues);
      }

      return next;
    });

    closeFilterPanel();
  }, [activeFilterColumnKey, closeFilterPanel, draftFilterValues]);

  const clearAllFiltersForActiveColumn = React.useCallback(() => {
    if (!activeFilterColumnKey) {
      return;
    }

    setAppliedFilters((prev) => {
      const next = { ...prev };
      delete next[activeFilterColumnKey];
      return next;
    });

    closeFilterPanel();
  }, [activeFilterColumnKey, closeFilterPanel]);

  const appliedValuesForActiveColumn = React.useMemo(
    () => new Set(appliedFilters[activeFilterColumnKey ?? ''] ?? []),
    [activeFilterColumnKey, appliedFilters]
  );

  const toggleDraftValue = React.useCallback((value: string) => {
    setDraftFilterValues((prev) => {
      const next = new Set(prev);

      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }

      return next;
    });
  }, []);

  const toggleRowSelection = React.useCallback((rowId: string) => {
    const nextSelection = new Set(selectedRows);

    if (selectionMode === 'single') {
      if (nextSelection.has(rowId)) {
        nextSelection.clear();
      } else {
        nextSelection.clear();
        nextSelection.add(rowId);
      }
    }

    if (selectionMode === 'multiple') {
      if (nextSelection.has(rowId)) {
        nextSelection.delete(rowId);
      } else {
        nextSelection.add(rowId);
      }
    }

    updateSelection(nextSelection);
  }, [selectedRows, selectionMode, updateSelection]);

  const toggleSelectAll = React.useCallback(() => {
    if (selectionMode !== 'multiple') {
      return;
    }

    const allRowIds = filteredAndSortedItems.map((item, index) => getRowId(item, index));
    const areAllSelected = allRowIds.length > 0 && allRowIds.every((rowId) => selectedRows.has(rowId));

    if (areAllSelected) {
      updateSelection(new Set<string>());
      return;
    }

    updateSelection(new Set(allRowIds));
  }, [filteredAndSortedItems, getRowId, selectedRows, selectionMode, updateSelection]);

  const allVisibleRowsSelected = React.useMemo(() => {
    if (selectionMode !== 'multiple' || filteredAndSortedItems.length === 0) {
      return false;
    }

    return filteredAndSortedItems.every((item, index) => selectedRows.has(getRowId(item, index)));
  }, [filteredAndSortedItems, getRowId, selectedRows, selectionMode]);

  const totalColumnCount = visibleColumns.length + (hasSelection ? 1 : 0);

  const totalRows = filteredAndSortedItems.length;
  const visibleRowCount = Math.ceil(viewportHeight / rowHeight) + (overscanCount * 2);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscanCount);
  const endIndex = Math.min(totalRows, startIndex + visibleRowCount);
  const topSpacerHeight = startIndex * rowHeight;
  const bottomSpacerHeight = Math.max(0, (totalRows - endIndex) * rowHeight);
  const virtualizedItems = filteredAndSortedItems.slice(startIndex, endIndex);

  const handleSearchChange = React.useCallback((value: string) => {
    if (onSearchTextChange) {
      onSearchTextChange(value);
      return;
    }

    setInternalSearchText(value);
  }, [onSearchTextChange]);

  return (
    <>
      <div className={styles.root}>
        {enableGlobalSearch && (
          <div className={styles.searchBoxContainer}>
            <div className={styles.topBar}>
              {enableColumnChooser && (
                <Menu
                  checkedValues={{ 'column-chooser': [...visibleColumnKeys] }}
                  onCheckedValueChange={(_event, data) => {
                    if (data.name !== 'column-chooser') {
                      return;
                    }

                    if (data.checkedItems.length === 0) {
                      return;
                    }

                    const nextChecked = new Set(data.checkedItems);
                    setVisibleColumnKeys((prev) => {
                      // Preserve order of already-visible columns; append any newly-added ones at the end
                      const retained = prev.filter((key) => nextChecked.has(key));
                      const retainedSet = new Set(retained);
                      const added = data.checkedItems.filter((key) => !retainedSet.has(key));
                      return [...retained, ...added];
                    });
                  }}
                >
                  <MenuTrigger disableButtonEnhancement>
                    
                    <Hamburger/>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      {columns.map((column) => (
                        <MenuItemCheckbox
                          key={column.key}
                          name="column-chooser"
                          value={column.key}
                        >
                          {column.header}
                        </MenuItemCheckbox>
                      ))}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              )}
              <SearchBox
                className={styles.searchBox}
                placeholder={searchPlaceholder}
                value={activeSearchText}
                onChange={(_event, data) => handleSearchChange(data.value ?? '')}
              />
            </div>
          </div>
        )}

        <div
          className={styles.viewport}
          style={{ maxHeight: `${viewportHeight}px` }}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <Table
            className={styles.table}
            aria-label="List view body"
            noNativeElements
            {...tableSizingProps}
          >
            <TableHeader>
              <TableRow>
                {hasSelection && (
                  <TableHeaderCell className={styles.selectionHeaderCell}>
                    <TableSelectionCell
                      type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                      checked={selectionMode === 'multiple' ? allVisibleRowsSelected : false}
                      invisible={selectionMode === 'single'}
                      onClick={toggleSelectAll}
                    />
                  </TableHeaderCell>
                )}

                {visibleColumns.map((column) => {
                  const hasMenu = column.isSortable || column.isFilterable;
                  const hasAppliedFilter = Boolean(appliedFilters[column.key]?.size);
                  const isSortedColumn = sortState?.columnKey === column.key;
                  let activeSortIcon: React.ReactNode;

                  if (isSortedColumn) {
                    activeSortIcon = sortState?.direction === 'asc' ? <ArrowSortUpRegular /> : <ArrowSortDownRegular />;
                  }

                  const activeFilterIcon = hasAppliedFilter ? <FilterRegular /> : undefined;
                  const headerCellProps = columnSizing.getTableHeaderCellProps(column.key);

                  return (
                    <TableHeaderCell
                      key={column.key}
                      className={styles.headerCell}
                      {...headerCellProps}
                      aside={
                        column.isFlexibleWidth ? (
                          <TableResizeHandle
                            className={styles.resizeHandle}
                            onMouseDown={columnSizing.getOnMouseDown(column.key)}
                            onTouchStart={columnSizing.getOnMouseDown(column.key)}
                          />
                        ) : undefined
                      }
                    >
                      {hasMenu ? (
                        <Menu>
                          <MenuTrigger disableButtonEnhancement>
                            <Button
                              appearance="subtle"
                              className={styles.headerButton}
                            >
                              {column.headerIcon}
                              {column.header}
                              {activeSortIcon}
                              {activeFilterIcon}
                            </Button>
                          </MenuTrigger>
                          <MenuPopover>
                            <MenuList>
                              {column.isSortable && (
                                <>
                                  <MenuItem icon={<ArrowSortUpRegular />} onClick={() => setSortState({ columnKey: column.key, direction: 'asc' })}>
                                    Sort ascending
                                  </MenuItem>
                                  <MenuItem icon={<ArrowSortDownRegular />} onClick={() => setSortState({ columnKey: column.key, direction: 'desc' })}>
                                    Sort descending
                                  </MenuItem>
                                </>
                              )}
                              {column.isFilterable && (
                                <MenuItem icon={<FilterRegular />} onClick={() => openFilterPanel(column.key)}>
                                  Filter
                                </MenuItem>
                              )}
                            </MenuList>
                          </MenuPopover>
                        </Menu>
                      ) : (
                        <Text weight="semibold">{column.header}</Text>
                      )}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
            {filteredAndSortedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={totalColumnCount}>
                  <div className={styles.emptyState}>{emptyMessage}</div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {topSpacerHeight > 0 && (
                  <TableRow>
                    <TableCell colSpan={totalColumnCount}>
                      <div className={styles.virtualSpacer} style={{ height: `${topSpacerHeight}px` }} />
                    </TableCell>
                  </TableRow>
                )}

                {virtualizedItems.map((item, virtualIndex) => {
                  const actualIndex = startIndex + virtualIndex;
                  const rowId = getRowId(item, actualIndex);
                  const isSelected = selectedRows.has(rowId);

                  const defaultCells = visibleColumns.map((column) => {
                    const value = getDisplayValueLabel(column.getValue(item));

                    return (
                      <TableCell
                        key={`${rowId}-${column.key}`}
                        {...columnSizing.getTableCellProps(column.key)}
                      >
                        <TableCellLayout className={styles.cellContent} media={column.getIcon?.(item)}>
                          {column.renderCell ? column.renderCell(item) : value}
                        </TableCellLayout>
                      </TableCell>
                    );
                  });

                  const customRowContent = renderRow?.(item, {
                    rowId,
                    rowIndex: actualIndex,
                    isSelected,
                    defaultCells,
                    columns: visibleColumns
                  });

                  return (
                    <TableRow
                      key={rowId}
                      className={styles.row}
                      style={{ minHeight: `${rowHeight}px` }}
                      onClick={() => onRowClick?.(item, {
                        rowId,
                        rowIndex: actualIndex,
                        isSelected,
                        defaultCells,
                        columns: visibleColumns
                      })}
                    >
                      {hasSelection && (
                        <TableCell className={styles.selectionCell}>
                          <TableSelectionCell
                            type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                            checked={isSelected}
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleRowSelection(rowId);
                            }}
                          />
                        </TableCell>
                      )}

                      {customRowContent ?? defaultCells}
                    </TableRow>
                  );
                })}

                {bottomSpacerHeight > 0 && (
                  <TableRow>
                    <TableCell colSpan={totalColumnCount}>
                      <div className={styles.virtualSpacer} style={{ height: `${bottomSpacerHeight}px` }} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ListViewFilterPanel
        open={Boolean(activeFilterColumn)}
        title={`${panelTitle} ${activeFilterColumn?.header ?? ''}`}
        values={visibleFilterValues}
        appliedValues={appliedValuesForActiveColumn}
        selectedValues={draftFilterValues}
        searchValue={filterPanelSearch}
        onSearchChange={setFilterPanelSearch}
        onToggleValue={toggleDraftValue}
        onApply={applyFilter}
        onClear={clearAllFiltersForActiveColumn}
        onClose={closeFilterPanel}
      />
    </>
  );
}

export const ListView = React.forwardRef(ListViewInner) as <TItem>(
  props: Readonly<IListViewProps<TItem>> & React.RefAttributes<IListViewRef<TItem>>
) => React.ReactElement;

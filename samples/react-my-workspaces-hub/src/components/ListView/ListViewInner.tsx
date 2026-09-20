/* eslint-disable no-void */
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableResizeHandle,
  TableRow,
  useTableColumnSizing_unstable,
  useTableFeatures
} from '@fluentui/react-components';
import { Virtualizer } from '@fluentui/react-virtualizer';

import { DEFAULT_LIST_VIEW_STRINGS, LIST_VIEW_DEFAULTS } from './constants';
import { CommonFilterPanel, type ICommonFilterColumnDescriptor } from './FilterPanel/CommonFilterPanel';
import { ListViewFilterPanel } from './FilterPanel/ListViewFilterPanel';
import { renderTypedCell } from './cells';
import { FilterChipsBar } from './components';
import { buildFrozenLayout } from './hooks';
import { useListViewVirtualization } from './hooks/useListViewVirtualization';
import type { TFlatRow } from './internal/types';
import { joinClassNames } from './utils/joinClassNames';
import {
  downloadCsv,
  downloadExcel,
  formatValueByType,
  getSortableValue
} from './utils';
import {
  type IListViewColumn,
  type IListViewProps,
  type ISortState
} from './interfaces';
import { useListViewStyles } from './ListView.styles';
import { ColumnHeaderCell } from './parts/ColumnHeaderCell';
import { ListViewToolbar, type TListViewExportFormat } from './parts/ListViewToolbar';

export function ListViewInner<TItem>(
  props: Readonly<IListViewProps<TItem>>
): React.ReactElement {
  const {
    items,
    columns,
    getRowId,
    enableGlobalSearch = true,
    searchText,
    onSearchTextChange,
    enableColumnChooser = true,
    visibleColumnKeys: controlledVisibleColumnKeys,
    onVisibleColumnKeysChange,
    showFilterChips = true,
    enableCommonFilter = false,
    onExport,
    enableBuiltInExport = false,
    enableBuiltInExcelExport = false,
    exportFilename = LIST_VIEW_DEFAULTS.EXPORT_FILENAME,
    formatDateForPicker,
    rowHeight = LIST_VIEW_DEFAULTS.ROW_HEIGHT,
    viewportHeight = LIST_VIEW_DEFAULTS.VIEWPORT_HEIGHT,
    strings: stringsOverride,
    classNames: slotClassNames,
    styles: slotStyles,
    getRowStyle
  } = props;
  const styles = useListViewStyles();
  const strings = React.useMemo(
    () => ({ ...DEFAULT_LIST_VIEW_STRINGS, ...(stringsOverride ?? {}) }),
    [stringsOverride]
  );

  const [sortState, setSortState] = React.useState<ISortState | undefined>(undefined);
  const [internalSearchText, setInternalSearchText] = React.useState<string>('');
  const [activeFilterColumnKey, setActiveFilterColumnKey] = React.useState<string | undefined>();
  const [filterPanelSearch, setFilterPanelSearch] = React.useState<string>('');
  const [appliedFilters, setAppliedFilters] = React.useState<Record<string, Set<string>>>({});
  const [draftFilterValues, setDraftFilterValues] = React.useState<Set<string>>(new Set<string>());
  const [isCommonFilterOpen, setIsCommonFilterOpen] = React.useState<boolean>(false);
  const [commonDraftValueFilters, setCommonDraftValueFilters] = React.useState<Record<string, Set<string>>>({});
  const [internalVisibleColumnKeys, setInternalVisibleColumnKeys] = React.useState<string[]>(() =>
    columns.filter((c) => c.defaultVisible !== false).map((c) => c.key)
  );

  const activeSearchText = searchText ?? internalSearchText;
  const visibleColumnKeys = controlledVisibleColumnKeys ?? internalVisibleColumnKeys;

  const visibleColumns = React.useMemo(
    () =>
      visibleColumnKeys
        .map((key) => columns.find((c) => c.key === key))
        .filter((c): c is IListViewColumn<TItem> => c !== undefined),
    [columns, visibleColumnKeys]
  );

  React.useEffect(() => {
    if (controlledVisibleColumnKeys !== undefined) return;
    setInternalVisibleColumnKeys((previous) => {
      const allKeys = new Set(columns.map((c) => c.key));
      const retained = previous.filter((k) => allKeys.has(k));
      const retainedSet = new Set(retained);
      const added = columns.filter((c) => c.defaultVisible !== false && !retainedSet.has(c.key)).map((c) => c.key);
      if (added.length === 0 && retained.length === previous.length) return previous;
      return [...retained, ...added];
    });
  }, [columns, controlledVisibleColumnKeys]);

  // ---- Frozen layout (recomputed below once column widths are known) -----------------------
  // We compute an initial frozen layout from the static column definitions so that
  // we can derive `orderedVisibleColumns` for the table feature configuration. After
  // `useTableFeatures` runs, we recompute the layout below using the live runtime widths
  // so sticky offsets stay in sync with the user's resizing.
  const initialFrozenLayout = React.useMemo(() => buildFrozenLayout(visibleColumns), [visibleColumns]);
  const orderedVisibleColumns = initialFrozenLayout.orderedColumns;

  const activeFilterColumn = React.useMemo(
    () => columns.find((c) => c.key === activeFilterColumnKey),
    [activeFilterColumnKey, columns]
  );

  const getDisplay = React.useCallback(<T,>(value: T, column: IListViewColumn<TItem>): string => {
    return formatValueByType(value, column, formatDateForPicker, {
      emptyLabel: strings.emptyValueLabel,
      booleanTrueLabel: strings.booleanTrueLabel,
      booleanFalseLabel: strings.booleanFalseLabel
    });
  }, [formatDateForPicker, strings.booleanFalseLabel, strings.booleanTrueLabel, strings.emptyValueLabel]);

  const getFilterLabel = React.useCallback(<T,>(value: T, column: IListViewColumn<TItem>): string => {
    const display = formatValueByType(value, column, formatDateForPicker, {
      emptyLabel: strings.emptyValueLabel,
      booleanTrueLabel: strings.booleanTrueLabel,
      booleanFalseLabel: strings.booleanFalseLabel
    });
    return display === '' ? strings.emptyValueLabel : display;
  }, [formatDateForPicker, strings.booleanFalseLabel, strings.booleanTrueLabel, strings.emptyValueLabel]);

  // ---- Filter values for the active panel ----------------------------------------------------
  const activeFilterValues = React.useMemo(() => {
    if (!activeFilterColumn) return [] as string[];
    const out = new Set<string>();
    items.forEach((item) => {
      if (activeFilterColumn.getFilterValues) {
        for (const v of activeFilterColumn.getFilterValues(item)) out.add(v || strings.emptyValueLabel);
      } else {
        out.add(getFilterLabel(activeFilterColumn.getValue(item), activeFilterColumn));
      }
    });
    return [...out].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  }, [activeFilterColumn, getFilterLabel, items, strings.emptyValueLabel]);

  const visibleFilterValues = React.useMemo(() => {
    const q = filterPanelSearch.trim().toLowerCase();
    if (!q) return activeFilterValues;
    return activeFilterValues.filter((v) => v.toLowerCase().includes(q));
  }, [activeFilterValues, filterPanelSearch]);

  // ---- Search / filter / sort pipeline -------------------------------------------------------
  const passesGlobalSearch = React.useCallback((item: TItem): boolean => {
    const q = activeSearchText.trim().toLowerCase();
    if (!q) return true;
    return columns.some((column) => getDisplay(column.getValue(item), column).toLowerCase().includes(q));
  }, [activeSearchText, columns, getDisplay]);

  const passesFilters = React.useCallback((item: TItem): boolean => {
    for (const [columnKey, selected] of Object.entries(appliedFilters)) {
      if (!selected?.size) continue;
      const column = columns.find((c) => c.key === columnKey);
      if (!column) continue;
      if (column.getFilterValues) {
        const itemValues = column.getFilterValues(item).map((v) => v || strings.emptyValueLabel);
        if (!itemValues.some((v) => selected.has(v))) return false;
      } else {
        if (!selected.has(getFilterLabel(column.getValue(item), column))) return false;
      }
    }

    return true;
  }, [appliedFilters, columns, getFilterLabel, strings.emptyValueLabel]);

  const applySorting = React.useCallback((source: TItem[]): TItem[] => {
    if (!sortState) return source;
    const sortColumn = columns.find((c) => c.key === sortState.columnKey);
    if (!sortColumn) return source;
    const sorted = [...source];
    sorted.sort((a, b) => {
      const va = getSortableValue(sortColumn.getValue(a), sortColumn);
      const vb = getSortableValue(sortColumn.getValue(b), sortColumn);
      let cmp: number;
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb;
      else cmp = String(va).localeCompare(String(vb), undefined, { numeric: true, sensitivity: 'base' });
      return sortState.direction === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [columns, sortState]);

  const filteredAndSortedItems = React.useMemo(() => {
    return applySorting(items.filter(passesGlobalSearch).filter(passesFilters));
  }, [applySorting, items, passesFilters, passesGlobalSearch]);

  // ---- Build flat row list for rendering -----------------------------------------------------
  const flatRows = React.useMemo<TFlatRow<TItem>[]>(
    () => filteredAndSortedItems.map((item, index) => ({ item, rowId: getRowId(item, index), rowIndex: index })),
    [filteredAndSortedItems, getRowId]
  );

  // ---- Column sizing / table features --------------------------------------------------------
  const columnSizingOptions = React.useMemo(() => {
    return orderedVisibleColumns.reduce<Record<string, { minWidth?: number; idealWidth?: number; defaultWidth?: number }>>((acc, c) => {
      const minWidth = c.minWidth ?? 120;
      const idealWidth = c.width ?? (c.isFlexibleWidth ? 260 : 180);
      acc[c.key] = { minWidth, idealWidth, defaultWidth: idealWidth };
      return acc;
    }, {});
  }, [orderedVisibleColumns]);

  const tableColumns = React.useMemo(() => {
    return orderedVisibleColumns.map((column) => ({
      columnId: column.key,
      compare: (a: TItem, b: TItem) => {
        const va = getSortableValue(column.getValue(a), column);
        const vb = getSortableValue(column.getValue(b), column);
        if (typeof va === 'number' && typeof vb === 'number') return va - vb;
        return String(va).localeCompare(String(vb), undefined, { numeric: true, sensitivity: 'base' });
      },
      renderHeaderCell: () => column.header,
      renderCell: (item: TItem) => getDisplay(column.getValue(item), column)
    }));
  }, [getDisplay, orderedVisibleColumns]);

  const tableState = useTableFeatures({
    columns: tableColumns,
    items: filteredAndSortedItems
  }, [
    useTableColumnSizing_unstable({ autoFitColumns: false, columnSizingOptions })
  ]);
  const { columnSizing_unstable: columnSizing } = tableState;
  const tableSizingProps = columnSizing.getTableProps();

  // Recompute frozen layout using the live column widths so sticky offsets follow resize.
  const liveColumnWidths = React.useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    columnSizing.getColumnWidths().forEach((entry) => {
      map[entry.columnId as string] = entry.idealWidth ?? entry.width;
    });
    return map;
  }, [columnSizing]);

  const totalTableWidth = React.useMemo(() => {
    return orderedVisibleColumns.reduce((sum, column) => {
      return sum + (liveColumnWidths[column.key] ?? column.width ?? column.minWidth ?? 120);
    }, 0);
  }, [liveColumnWidths, orderedVisibleColumns]);

  const frozenLayout = React.useMemo(
    () => buildFrozenLayout(visibleColumns, (key) => liveColumnWidths[key]),
    [visibleColumns, liveColumnWidths]
  );

  // ---- Filter panel handlers -----------------------------------------------------------------
  const openFilterPanel = React.useCallback((columnKey: string) => {
    setActiveFilterColumnKey(columnKey);
    setFilterPanelSearch('');
    setDraftFilterValues(new Set(appliedFilters[columnKey] ?? []));
  }, [appliedFilters]);

  const closeFilterPanel = React.useCallback(() => {
    setActiveFilterColumnKey(undefined);
    setFilterPanelSearch('');
    setDraftFilterValues(new Set<string>());
  }, []);

  const applyFilter = React.useCallback(() => {
    if (!activeFilterColumnKey) return;
    setAppliedFilters((prev) => {
      const next = { ...prev };
      if (draftFilterValues.size === 0) delete next[activeFilterColumnKey];
      else next[activeFilterColumnKey] = new Set(draftFilterValues);
      return next;
    });
    closeFilterPanel();
  }, [activeFilterColumnKey, closeFilterPanel, draftFilterValues]);

  const clearActiveColumnFilter = React.useCallback(() => {
    if (!activeFilterColumnKey) return;
    setAppliedFilters((prev) => { const n = { ...prev }; delete n[activeFilterColumnKey]; return n; });
    closeFilterPanel();
  }, [activeFilterColumnKey, closeFilterPanel]);

  const appliedValuesForActiveColumn = React.useMemo(
    () => new Set(appliedFilters[activeFilterColumnKey ?? ''] ?? []),
    [activeFilterColumnKey, appliedFilters]
  );

  const toggleDraftValue = React.useCallback((value: string) => {
    setDraftFilterValues((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value); else next.add(value);
      return next;
    });
  }, []);

  // Virtualization always-on (uniform data-row heights).
  const { virtualizerLength, bufferItems, bufferSize, scrollRef, containerSizeRef, getItemSize } = useListViewVirtualization({
    flatRows,
    rowHeight
  });

  const handleSearchChange = React.useCallback((value: string) => {
    if (onSearchTextChange) onSearchTextChange(value); else setInternalSearchText(value);
  }, [onSearchTextChange]);

  const handleVisibleColumnKeysChange = React.useCallback((next: string[]) => {
    if (controlledVisibleColumnKeys !== undefined) { onVisibleColumnKeysChange?.(next); return; }
    setInternalVisibleColumnKeys(next);
    onVisibleColumnKeysChange?.(next);
  }, [controlledVisibleColumnKeys, onVisibleColumnKeysChange]);

  const handleExportFormatClick = React.useCallback((format: TListViewExportFormat) => {
    if (onExport) { void onExport(filteredAndSortedItems, orderedVisibleColumns); return; }
    if (format === 'excel' && enableBuiltInExcelExport) {
      void downloadExcel(filteredAndSortedItems, orderedVisibleColumns, exportFilename);
      return;
    }
    if (format === 'csv' && enableBuiltInExport) {
      downloadCsv(filteredAndSortedItems, orderedVisibleColumns, exportFilename);
    }
  }, [enableBuiltInExcelExport, enableBuiltInExport, exportFilename, filteredAndSortedItems, onExport, orderedVisibleColumns]);

  const exportFormats = React.useMemo<TListViewExportFormat[]>(() => {
    if (onExport) return ['csv'];
    const formats: TListViewExportFormat[] = [];
    if (enableBuiltInExport) formats.push('csv');
    if (enableBuiltInExcelExport) formats.push('excel');
    return formats;
  }, [enableBuiltInExcelExport, enableBuiltInExport, onExport]);

  // ---- Cell renderers ------------------------------------------------------------------------
  const renderDataCellsForRow = React.useCallback((item: TItem, rowId: string, rowIndex: number): React.ReactNode[] => {
    return orderedVisibleColumns.map((column) => {
      const formatted = getDisplay(column.getValue(item), column);
      const ctx = { rowId, rowIndex, column, formattedValue: formatted };
      const cellNode = column.renderCell ? column.renderCell(item, ctx) : renderTypedCell(item, column, ctx);
      const isLeftFrozen = frozenLayout.leftFrozenKeys.has(column.key);
      const isRightFrozen = frozenLayout.rightFrozenKeys.has(column.key);
      const stickyStyle: React.CSSProperties = {};
      if (isLeftFrozen) stickyStyle.left = `${frozenLayout.leftOffsets[column.key]}px`;
      if (isRightFrozen) stickyStyle.right = `${frozenLayout.rightOffsets[column.key]}px`;
      const sizingProps = columnSizing.getTableCellProps(column.key);
      return (
        <TableCell
          key={`${rowId}-${column.key}`}
          {...sizingProps}
          className={joinClassNames(
            isLeftFrozen || isRightFrozen ? styles.cellFrozen : undefined,
            slotClassNames?.cell,
            (isLeftFrozen || isRightFrozen) ? slotClassNames?.cellFrozen : undefined
          )}
          style={{ ...sizingProps.style, ...stickyStyle, ...slotStyles?.cell, ...((isLeftFrozen || isRightFrozen) ? slotStyles?.cellFrozen : undefined) }}
        >
          <TableCellLayout className={styles.cellContent} media={column.getIcon?.(item)}>
            {cellNode}
          </TableCellLayout>
        </TableCell>
      );
    });
  }, [columnSizing, frozenLayout, getDisplay, orderedVisibleColumns, slotClassNames, slotStyles, styles.cellContent, styles.cellFrozen]);

  // Total column count (for empty colSpan etc.)
  const totalColumnCount = orderedVisibleColumns.length;

  // ---- Body row renderer ---------------------------------------------------------------------
  const renderBodyRowAt = React.useCallback((index: number): React.ReactElement => {
    const row = flatRows[index];
    return (
      <TableRow
        key={row.rowId}
        role="row"
        aria-rowindex={row.rowIndex + 1}
        className={joinClassNames(styles.row, slotClassNames?.row)}
        style={{ minHeight: `${rowHeight}px`, ...slotStyles?.row, ...getRowStyle?.(row.item, row.rowIndex) }}
      >
        {renderDataCellsForRow(row.item, row.rowId, row.rowIndex)}
      </TableRow>
    );
  }, [flatRows, getRowStyle, renderDataCellsForRow, rowHeight, slotClassNames?.row, slotStyles?.row, styles.row]);

  // Strings forwarded to extracted children.
  const headerCellStrings = React.useMemo(() => ({
    sortAscending: strings.sortAscending,
    sortDescending: strings.sortDescending,
    filter: strings.filter
  }), [strings.filter, strings.sortAscending, strings.sortDescending]);

  const toolbarStrings = React.useMemo(() => ({
    columnChooserAriaLabel: strings.columnChooserAriaLabel,
    searchPlaceholder: strings.searchPlaceholder,
    exportButtonLabel: strings.exportButtonLabel,
    exportCsvLabel: strings.exportCsvLabel,
    exportExcelLabel: strings.exportExcelLabel,
    exportMenuAriaLabel: strings.exportMenuAriaLabel,
    commonFilterAriaLabel: strings.commonFilterAriaLabel
  }), [strings.columnChooserAriaLabel, strings.commonFilterAriaLabel, strings.exportButtonLabel, strings.exportCsvLabel, strings.exportExcelLabel, strings.exportMenuAriaLabel, strings.searchPlaceholder]);

  const filterPanelStrings = React.useMemo(() => ({
    closeFilterPanelAriaLabel: strings.closeFilterPanelAriaLabel,
    searchValuesPlaceholder: strings.filterPanelSearchPlaceholder,
    noValuesFound: strings.filterPanelNoValues,
    selectedSuffix: strings.filterPanelSelectedSuffix,
    apply: strings.filterPanelApplyLabel,
    clear: strings.filterPanelClearLabel,
    selectAll: strings.filterPanelSelectAllLabel,
    clearAll: strings.filterPanelClearAllLabel
  }), [
    strings.closeFilterPanelAriaLabel,
    strings.filterPanelApplyLabel,
    strings.filterPanelClearAllLabel,
    strings.filterPanelClearLabel,
    strings.filterPanelNoValues,
    strings.filterPanelSearchPlaceholder,
    strings.filterPanelSelectAllLabel,
    strings.filterPanelSelectedSuffix
  ]);

  // ---- Common filter panel -------------------------------------------------------------------
  const commonFilterStrings = React.useMemo(() => ({
    title: strings.commonFilterPanelTitle,
    closeAriaLabel: strings.commonFilterCloseAriaLabel,
    apply: strings.commonFilterApplyLabel,
    clearAll: strings.commonFilterClearAllLabel,
    noColumns: strings.commonFilterNoColumns,
    activeSuffix: strings.commonFilterActiveSuffix,
    searchValuesPlaceholder: strings.filterPanelSearchPlaceholder,
    noValuesFound: strings.filterPanelNoValues,
    selectAll: strings.filterPanelSelectAllLabel
  }), [
    strings.commonFilterActiveSuffix,
    strings.commonFilterApplyLabel,
    strings.commonFilterClearAllLabel,
    strings.commonFilterCloseAriaLabel,
    strings.commonFilterNoColumns,
    strings.commonFilterPanelTitle,
    strings.filterPanelNoValues,
    strings.filterPanelSearchPlaceholder,
    strings.filterPanelSelectAllLabel
  ]);

  const filterableColumns = React.useMemo(
    () => columns.filter((c) => c.isFilterable),
    [columns]
  );

  const commonFilterDescriptors = React.useMemo<ICommonFilterColumnDescriptor<TItem>[]>(() => {
    if (!enableCommonFilter || filterableColumns.length === 0) return [];
    return filterableColumns.map((column) => {
      const valueSet = new Set<string>();
      items.forEach((item) => {
        if (column.getFilterValues) {
          for (const v of column.getFilterValues(item)) valueSet.add(v || strings.emptyValueLabel);
        } else {
          valueSet.add(getFilterLabel(column.getValue(item), column));
        }
      });
      const values = [...valueSet].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      );
      return { column, values };
    });
  }, [enableCommonFilter, filterableColumns, getFilterLabel, items, strings.emptyValueLabel]);

  const commonFilterAppliedCount = React.useMemo(() => {
    let count = 0;
    for (const set of Object.values(appliedFilters)) if (set.size > 0) count += 1;
    return count;
  }, [appliedFilters]);

  const syncCommonDraftsFromApplied = React.useCallback(() => {
    const valueDraft: Record<string, Set<string>> = {};
    for (const [key, set] of Object.entries(appliedFilters)) valueDraft[key] = new Set(set);
    setCommonDraftValueFilters(valueDraft);
  }, [appliedFilters]);

  const handleToggleCommonFilter = React.useCallback(() => {
    setIsCommonFilterOpen((prev) => {
      const next = !prev;
      if (next) syncCommonDraftsFromApplied();
      return next;
    });
  }, [syncCommonDraftsFromApplied]);

  const handleCloseCommonFilter = React.useCallback(() => {
    setIsCommonFilterOpen(false);
  }, []);

  const handleCommonDraftValuesChange = React.useCallback((columnKey: string, next: Set<string>) => {
    setCommonDraftValueFilters((prev) => {
      const out = { ...prev };
      if (next.size === 0) delete out[columnKey];
      else out[columnKey] = next;
      return out;
    });
  }, []);

  const applyCommonFilters = React.useCallback(() => {
    const nextValues: Record<string, Set<string>> = {};
    for (const [key, set] of Object.entries(commonDraftValueFilters)) {
      if (set.size > 0) nextValues[key] = new Set(set);
    }
    setAppliedFilters(nextValues);
    setIsCommonFilterOpen(false);
  }, [commonDraftValueFilters]);

  const clearAllCommonFilters = React.useCallback(() => {
    setCommonDraftValueFilters({});
    setAppliedFilters({});
  }, []);

  return (
    <>
      <div
        className={joinClassNames(styles.root, slotClassNames?.root)}
        style={slotStyles?.root}
      >
        <ListViewToolbar
          columns={columns}
          visibleColumnKeys={visibleColumnKeys}
          onVisibleColumnKeysChange={handleVisibleColumnKeysChange}
          enableColumnChooser={enableColumnChooser}
          enableGlobalSearch={enableGlobalSearch}
          searchValue={activeSearchText}
          onSearchChange={handleSearchChange}
          exportFormats={exportFormats}
          onExportFormatClick={handleExportFormatClick}
          showCommonFilterToggle={enableCommonFilter}
          isCommonFilterOpen={isCommonFilterOpen}
          commonFilterAppliedCount={commonFilterAppliedCount}
          onToggleCommonFilter={handleToggleCommonFilter}
          strings={toolbarStrings}
          className={joinClassNames(styles.toolbarContainer, slotClassNames?.toolbar)}
        />
        {showFilterChips && (
          <FilterChipsBar
            columns={columns}
            appliedFilters={appliedFilters}
            onRemoveValueFilter={(key, value) => setAppliedFilters((prev) => {
              const next = { ...prev };
              const set = new Set(next[key] ?? []);
              set.delete(value);
              if (set.size === 0) delete next[key]; else next[key] = set;
              return next;
            })}
            onClearAll={() => { setAppliedFilters({}); }}
            filteredByLabel={strings.filteredByLabel}
            clearAllLabel={strings.clearAllFiltersLabel}
            className={slotClassNames?.filterChips}
          />
        )}

        <div className={styles.viewportRow}>
          <div
            className={joinClassNames(styles.viewport, slotClassNames?.viewport)}
            ref={scrollRef}
            style={{ height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px`, ...slotStyles?.viewport }}
          >
          <Table
            className={joinClassNames(styles.table, slotClassNames?.table)}
            aria-label={strings.tableAriaLabel}
            aria-rowcount={flatRows.length}
            aria-colcount={totalColumnCount}
            role="grid"
            noNativeElements
            {...tableSizingProps}
            style={{ ...tableSizingProps.style, minWidth: `${totalTableWidth}px`, ...slotStyles?.table }}
          >
            <TableHeader className={joinClassNames(styles.tableHeader, slotClassNames?.tableHeader)}>
              <TableRow className={joinClassNames(styles.headerRow, slotClassNames?.headerRow)}>
                {orderedVisibleColumns.map((column) => {
                  const headerCellProps = columnSizing.getTableHeaderCellProps(column.key);
                  const isLeftFrozen = frozenLayout.leftFrozenKeys.has(column.key);
                  const isRightFrozen = frozenLayout.rightFrozenKeys.has(column.key);
                  const isFrozen = isLeftFrozen || isRightFrozen;
                  // Each header cell pins itself vertically (`top: 0`). Frozen
                  // cells additionally pin horizontally (`left` / `right`) and
                  // need a higher z-index than non-frozen header siblings so
                  // the latter can’t paint on top of them once they scroll
                  // into the same horizontal range.
                  const stickyStyle: React.CSSProperties = {
                    top: 0,
                    position: 'sticky',
                    zIndex: isFrozen ? 6 : 4
                  };
                  if (isLeftFrozen) stickyStyle.left = `${frozenLayout.leftOffsets[column.key]}px`;
                  if (isRightFrozen) stickyStyle.right = `${frozenLayout.rightOffsets[column.key]}px`;
                  const isResizable = column.isResizable !== false;
                  const hasAppliedFilter = Boolean(appliedFilters[column.key]?.size);
                  return (
                    <TableHeaderCell
                      key={column.key}
                      {...headerCellProps}
                      className={joinClassNames(
                        styles.headerCell,
                        slotClassNames?.headerCell,
                        isFrozen ? styles.headerCellFrozen : undefined,
                        isFrozen ? slotClassNames?.headerCellFrozen : undefined
                      )}
                      style={{ ...headerCellProps.style, ...stickyStyle, ...slotStyles?.headerCell, ...(isFrozen ? slotStyles?.headerCellFrozen : undefined) }}
                      aside={isResizable ? (
                        <TableResizeHandle
                          className={styles.resizeHandle}
                          onMouseDown={columnSizing.getOnMouseDown(column.key)}
                          onTouchStart={columnSizing.getOnMouseDown(column.key)}
                        />
                      ) : undefined}
                    >
                      <ColumnHeaderCell
                        column={column}
                        sort={sortState}
                        hasAppliedFilter={hasAppliedFilter}
                        onSort={(sort) => setSortState(sort)}
                        onOpenFilter={openFilterPanel}
                        strings={headerCellStrings}
                        buttonClassName={styles.headerButton}
                      />
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {flatRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={totalColumnCount}>
                    <div className={joinClassNames(styles.emptyState, slotClassNames?.emptyState)} style={slotStyles?.emptyState}>
                      {strings.emptyMessage}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <Virtualizer
                  numItems={flatRows.length}
                  virtualizerLength={virtualizerLength}
                  bufferItems={bufferItems}
                  bufferSize={bufferSize}
                  itemSize={rowHeight}
                  getItemSize={getItemSize}
                  containerSizeRef={containerSizeRef}
                >
                  {(index: number) => renderBodyRowAt(index)}
                </Virtualizer>
              )}
            </TableBody>
          </Table>
          </div>

          {enableCommonFilter && (
            <CommonFilterPanel
              open={isCommonFilterOpen}
              descriptors={commonFilterDescriptors}
              draftValueFilters={commonDraftValueFilters}
              appliedValueFilters={appliedFilters}
              onChangeDraftValues={handleCommonDraftValuesChange}
              onApply={applyCommonFilters}
              onClearAll={clearAllCommonFilters}
              onClose={handleCloseCommonFilter}
              strings={commonFilterStrings}
              className={slotClassNames?.commonFilterPanel}
            />
          )}
        </div>
      </div>

      <ListViewFilterPanel
        open={Boolean(activeFilterColumn)}
        title={`${strings.filterPanelTitlePrefix} ${activeFilterColumn?.header ?? ''}`}
        values={visibleFilterValues}
        appliedValues={appliedValuesForActiveColumn}
        selectedValues={draftFilterValues}
        searchValue={filterPanelSearch}
        onSearchChange={setFilterPanelSearch}
        onToggleValue={toggleDraftValue}
        onReplaceValues={(next) => setDraftFilterValues(next)}
        onApply={applyFilter}
        onClear={clearActiveColumnFilter}
        onClose={closeFilterPanel}
        strings={filterPanelStrings}
      />
    </>
  );
}

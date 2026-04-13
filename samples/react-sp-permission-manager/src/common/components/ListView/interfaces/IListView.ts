import * as React from 'react';

export type TSortDirection = 'asc' | 'desc';
export type TListViewSelectionMode = 'none' | 'single' | 'multiple';

export interface IListViewColumn<TItem> {
  key: string;
  header: string;
  headerIcon?: React.ReactElement;
  defaultVisible?: boolean;
  getValue: (item: TItem) => string | number | boolean | undefined;
  getIcon?: (item: TItem) => React.ReactElement | undefined;
  renderCell?: (item: TItem) => React.ReactNode;
  isSortable?: boolean;
  isFilterable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  isFlexibleWidth?: boolean;
}

export interface IListViewRowRenderContext<TItem> {
  rowId: string;
  rowIndex: number;
  isSelected: boolean;
  defaultCells: React.ReactNode[];
  columns: IListViewColumn<TItem>[];
}

export interface IListViewProps<TItem> {
  items: TItem[];
  columns: IListViewColumn<TItem>[];
  getRowId: (item: TItem, index: number) => string;
  emptyMessage?: string;
  panelTitle?: string;
  searchPlaceholder?: string;
  enableGlobalSearch?: boolean;
  searchText?: string;
  onSearchTextChange?: (value: string) => void;
  enableColumnChooser?: boolean;
  rowHeight?: number;
  viewportHeight?: number;
  overscanCount?: number;
  selectionMode?: TListViewSelectionMode;
  selectedRowIds?: Set<string>;
  defaultSelectedRowIds?: Set<string>;
  onSelectionChange?: (selectedRowIds: Set<string>) => void;
  onRowClick?: (item: TItem, context: IListViewRowRenderContext<TItem>) => void;
  renderRow?: (item: TItem, context: IListViewRowRenderContext<TItem>) => React.ReactNode;
}

export interface IListViewRef<TItem> {
  getCurrentItems: () => TItem[];
}

export interface ISortState {
  columnKey: string;
  direction: TSortDirection;
}

import * as React from 'react';
import type { IListViewStrings } from './IListViewStrings';
import type { IListViewClassNames } from './IListViewClassNames';
import type { IListViewSlotStyles } from './IListViewSlotStyles';

/** Sort order applied to a column. */
export type TSortDirection = 'asc' | 'desc';

/** Fundamental data type of a column. Drives default formatting, sorting, and filter UX. */
export type TColumnDataType =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'boolean'
  | 'user'
  | 'custom';

/** Side a column is pinned to. */
export type TFrozenSide = 'left' | 'right';

/**
 * Standardized user value consumed by columns whose `dataType` is `'user'`.
 * `getValue` should return either a single user or an array of them.
 */
export interface IListViewUser {
  id?: number | string;
  displayName: string;
  email?: string;
  loginName?: string;
  imageUrl?: string;
  jobTitle?: string;
  department?: string;
}

/** Per-data-type formatting overrides. */
export interface IColumnFormat<TItem> {
  /** Text-cell formatting. */
  text?: {
    transform?: (value: string, item: TItem) => string;
    emptyText?: string;
    truncateAt?: number;
  };
  /** Number-cell formatting via `Intl.NumberFormat`. */
  number?: {
    decimals?: number;
    locale?: string;
    notation?: 'standard' | 'compact' | 'scientific';
  };
  /** Currency-cell formatting via `Intl.NumberFormat`. */
  currency?: {
    /** ISO 4217 code (e.g. `'USD'`, `'GBP'`). Defaults to `'USD'`. */
    currency?: string;
    /**
     * When `true`, uses the browser locale (`navigator.languages` / `navigator.language`)
     * instead of an explicit `locale` override when formatting currency values.
     */
    useBrowserLocale?: boolean;
    locale?: string;
    decimals?: number;
  };
  /** Date-cell formatting. */
  date?: {
    /** Preset format (`'short' | 'medium' | 'long' | 'iso' | 'relative'`). */
    format?: 'short' | 'medium' | 'long' | 'iso' | 'relative';
    locale?: string;
    /** Custom formatter — overrides `format` and `locale`. */
    formatter?: (date: Date) => string;
  };
  /** Boolean-cell formatting. */
  boolean?: {
    trueLabel?: string;
    falseLabel?: string;
    /** Render as a coloured badge, an icon, or plain text. Defaults to `'badge'`. */
    appearance?: 'badge' | 'icon' | 'text';
  };
  /** User-cell formatting. */
  user?: {
    showAvatar?: boolean;
    showSecondary?: boolean;
    /** Show a SharePoint-style profile card on hover. Defaults to `true`. */
    showHoverCard?: boolean;
    avatarSize?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64;
  };
}

/** Column descriptor. */
export interface IListViewColumn<TItem> {
  /** Stable column identifier. */
  key: string;
  /** Header label. */
  header: string;
  /** Optional icon shown before the header text. */
  headerIcon?: React.ReactElement;
  /** Initial visibility — defaults to `true`. */
  defaultVisible?: boolean;

  /** Fundamental data type. Drives default formatting / sorting / filter behaviour. */
  dataType?: TColumnDataType;
  /** Per-type formatting overrides. */
  format?: IColumnFormat<TItem>;

  /**
   * Reads the raw cell value. Return value depends on `dataType`:
   * - `'text'` → string, `'number' | 'currency'` → number,
   * - `'date'` → `Date | string` (ISO), `'boolean'` → boolean,
   * - `'user'` → `IListViewUser` or `IListViewUser[]`,
   * - `'custom'` → anything (use `renderCell`).
   */
  getValue: (item: TItem) => unknown;
  /** Multi-value filter values for columns whose value is an aggregate. */
  getFilterValues?: (item: TItem) => string[];
  /** Optional row-level icon shown in the cell media slot. */
  getIcon?: (item: TItem) => React.ReactElement | undefined;

  /** Custom cell renderer. When omitted, the cell is rendered using `dataType`. */
  renderCell?: (item: TItem, ctx: IListViewCellRenderContext<TItem>) => React.ReactNode;
  /** Custom header renderer. */
  renderHeader?: (column: IListViewColumn<TItem>) => React.ReactNode;

  /** Allow header-menu sort. */
  isSortable?: boolean;
  /** Allow header-menu filter. */
  isFilterable?: boolean;

  /** Pin the column to the leading or trailing edge. */
  frozen?: TFrozenSide;

  /** Initial column width in px. */
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  isFlexibleWidth?: boolean;
  /**
   * Allow the user to drag-resize the column. Defaults to `true`.
   * Set to `false` to lock the width.
   */
  isResizable?: boolean;
}

/** Context passed to {@link IListViewColumn.renderCell}. */
export interface IListViewCellRenderContext<TItem> {
  rowId: string;
  rowIndex: number;
  column: IListViewColumn<TItem>;
  /** Display label produced by the built-in formatter. */
  formattedValue: string;
}

/** Sort state. */
export interface ISortState {
  columnKey: string;
  direction: TSortDirection;
}

/** Public ListView props. */
export interface IListViewProps<TItem> {
  items: TItem[];
  columns: IListViewColumn<TItem>[];
  getRowId: (item: TItem, index: number) => string;

  /**
   * Localised string overrides. Anything omitted falls back to
   * `DEFAULT_LIST_VIEW_STRINGS`. Pass a fully translated object to
   * surface the ListView in the user's language.
   */
  strings?: Partial<IListViewStrings>;

  /** Per-slot className overrides — appended to the shipped classes. */
  classNames?: IListViewClassNames;
  /** Per-slot inline `style` overrides — merged with the shipped styles. */
  styles?: IListViewSlotStyles;
  /** Optional per-row inline style. Applied after the shared row style. */
  getRowStyle?: (item: TItem, index: number) => React.CSSProperties | undefined;

  enableGlobalSearch?: boolean;
  searchText?: string;
  onSearchTextChange?: (value: string) => void;

  enableColumnChooser?: boolean;
  visibleColumnKeys?: string[];
  onVisibleColumnKeysChange?: (visibleColumnKeys: string[]) => void;

  /** Show applied filters as removable chips above the table. Defaults to `true`. */
  showFilterChips?: boolean;

  /**
   * Show a toolbar toggle that opens an in-area "Common filter" drawer on
   * the right edge of the ListView. The drawer surfaces every filterable
   * column in a single panel — value pickers for `'choice'` columns,
   * date range pickers for `'date'`, and min/max inputs for
   * `'number' | 'currency'`. Defaults to `false`.
   */
  enableCommonFilter?: boolean;

  /** Optional custom export callback — receives current items + columns. */
  onExport?: (items: TItem[], columns: IListViewColumn<TItem>[]) => void | Promise<void>;
  /** When `true` and `onExport` is omitted, the toolbar Export button generates a CSV. */
  enableBuiltInExport?: boolean;
  /**
   * When `true` and `onExport` is omitted, the toolbar Export button generates an `.xlsx` file
   * (via SheetJS). When BOTH `enableBuiltInExport` and `enableBuiltInExcelExport` are `true`,
   * the toolbar surfaces a dropdown letting the user pick the format.
   */
  enableBuiltInExcelExport?: boolean;
  exportFilename?: string;

  formatDateForPicker?: (date?: Date) => string;
  rowHeight?: number;
  viewportHeight?: number;
}


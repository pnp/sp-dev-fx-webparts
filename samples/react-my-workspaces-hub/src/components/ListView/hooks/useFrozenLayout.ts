import type { IListViewColumn } from '../interfaces/IListView';

export interface IFrozenLayout<TItem> {
  /** Visible columns reordered: left-frozen → middle → right-frozen. */
  orderedColumns: IListViewColumn<TItem>[];
  /** Map of column key → cumulative `left` (px) for left-frozen columns. */
  leftOffsets: Record<string, number>;
  /** Map of column key → cumulative `right` (px) for right-frozen columns. */
  rightOffsets: Record<string, number>;
  /** Sets of column keys for quick membership lookups. */
  leftFrozenKeys: Set<string>;
  rightFrozenKeys: Set<string>;
}

/** Default column width when neither a configured `width`/`minWidth` nor a runtime width is available. */
const defaultColumnWidth = <TItem,>(column: IListViewColumn<TItem>): number => {
  return column.width ?? column.minWidth ?? (column.isFlexibleWidth ? 260 : 180);
};

/**
 * Computes a frozen-column layout from the supplied visible columns.
 * Left-frozen columns are placed first in their relative order; right-frozen columns are
 * placed last. Cumulative `left` / `right` offsets are returned for sticky positioning.
 *
 * @param getColumnWidth Optional resolver returning the *live* width for a column key.
 *                       When provided, sticky offsets stay in sync with user resize.
 */
export const buildFrozenLayout = <TItem,>(
  visibleColumns: IListViewColumn<TItem>[],
  getColumnWidth?: (columnKey: string) => number | undefined
): IFrozenLayout<TItem> => {
  const widthFor = (column: IListViewColumn<TItem>): number => {
    const live = getColumnWidth?.(column.key);
    return typeof live === 'number' && live > 0 ? live : defaultColumnWidth(column);
  };

  const left = visibleColumns.filter((c) => c.frozen === 'left');
  const right = visibleColumns.filter((c) => c.frozen === 'right');
  const middle = visibleColumns.filter((c) => c.frozen !== 'left' && c.frozen !== 'right');

  const leftOffsets: Record<string, number> = {};
  let cumulativeLeft = 0;
  left.forEach((column) => {
    leftOffsets[column.key] = cumulativeLeft;
    cumulativeLeft += widthFor(column);
  });

  const rightOffsets: Record<string, number> = {};
  let cumulativeRight = 0;
  [...right].reverse().forEach((column) => {
    rightOffsets[column.key] = cumulativeRight;
    cumulativeRight += widthFor(column);
  });

  return {
    orderedColumns: [...left, ...middle, ...right],
    leftOffsets,
    rightOffsets,
    leftFrozenKeys: new Set(left.map((c) => c.key)),
    rightFrozenKeys: new Set(right.map((c) => c.key))
  };
};

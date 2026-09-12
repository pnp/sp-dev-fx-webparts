import type * as React from 'react';

/** Inline `style` overrides — same slot vocabulary as `IListViewClassNames`. */
export interface IListViewSlotStyles {
  root?: React.CSSProperties;
  toolbar?: React.CSSProperties;
  searchBox?: React.CSSProperties;
  filterChips?: React.CSSProperties;
  viewport?: React.CSSProperties;
  table?: React.CSSProperties;
  tableHeader?: React.CSSProperties;
  headerRow?: React.CSSProperties;
  headerCell?: React.CSSProperties;
  headerCellFrozen?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
  cellFrozen?: React.CSSProperties;
  emptyState?: React.CSSProperties;
  filterPanel?: React.CSSProperties;
}

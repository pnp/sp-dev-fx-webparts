/**
 * Per-slot className overrides applied across the ListView. Each entry is
 * appended to the corresponding default class so consumers retain the
 * shipped styles unless they explicitly override them.
 */
export interface IListViewClassNames {
  /** Outer container. */
  root?: string;
  /** Toolbar wrapper above the table. */
  toolbar?: string;
  /** Search box inside the toolbar. */
  searchBox?: string;
  /** Filter chips bar above the table. */
  filterChips?: string;
  /** Scrollable viewport that hosts the table. */
  viewport?: string;
  /** Underlying `<Table>` element. */
  table?: string;
  /** `<TableHeader>` element. */
  tableHeader?: string;
  /** Header `<TableRow>`. */
  headerRow?: string;
  /** Each `<TableHeaderCell>`. */
  headerCell?: string;
  /** Frozen header cell. */
  headerCellFrozen?: string;
  /** Body `<TableRow>`. */
  row?: string;
  /** Each body `<TableCell>`. */
  cell?: string;
  /** Frozen body `<TableCell>`. */
  cellFrozen?: string;
  /** Empty-state container. */
  emptyState?: string;
  /** Filter panel drawer container. */
  filterPanel?: string;
  /** Common-filter inline drawer container. */
  commonFilterPanel?: string;
}

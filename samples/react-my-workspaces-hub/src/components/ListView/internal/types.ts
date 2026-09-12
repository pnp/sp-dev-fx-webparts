/** A single data row inside the virtualized body. */
export interface TFlatRow<TItem> {
  item: TItem;
  rowId: string;
  rowIndex: number;
}

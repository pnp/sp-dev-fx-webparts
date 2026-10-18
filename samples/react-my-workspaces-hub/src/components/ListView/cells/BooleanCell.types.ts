import type { IColumnFormat } from '../interfaces/IListView';

export interface IBooleanCellProps {
  value: boolean;
  format?: IColumnFormat<unknown>['boolean'];
  /** Default truthy label when `format.trueLabel` is omitted. */
  defaultTrueLabel?: string;
  /** Default falsy label when `format.falseLabel` is omitted. */
  defaultFalseLabel?: string;
}

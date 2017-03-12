
import ListDefinition from "./model/ListDefinition";
import ColumnDefinition from "./model/ColumnDefinition";
export interface ISpfxReactGridWebPartProps {
  description: string;
  lists: ListDefinition[];
  columns: ColumnDefinition[];
}

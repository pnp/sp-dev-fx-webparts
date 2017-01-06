
import ListDefinition from "./model/ListDefinition";
import column from "./model/ColumnDefinition";
export interface ISpfxReactGridWebPartProps {
  description: string;
  lists: ListDefinition[];
  columns: column[];
}

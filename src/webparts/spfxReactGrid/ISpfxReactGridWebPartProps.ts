
import ListDefinition from "./model/ListRef";
import column from "./model/column";
export interface ISpfxReactGridWebPartProps {
  description: string;
  lists: ListDefinition[];
  columns: column[];
}

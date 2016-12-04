
import ListRef from "./model/ListRef";
import column from "./model/column";
export interface ISpfxReactGridWebPartProps {
  description: string;
  lists: ListRef[];
  columns: column[];
}

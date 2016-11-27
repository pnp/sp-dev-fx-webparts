
import list from './model/list';
import column from './model/column';
export interface ISpfxReactGridWebPartProps {
  description: string;
  lists: list[];
  columns: column[];
}

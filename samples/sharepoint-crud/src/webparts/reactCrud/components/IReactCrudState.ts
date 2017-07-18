import { IListItem } from './IListItem';

export interface IReactCrudState {
  status: string;
  items: IListItem[];
}
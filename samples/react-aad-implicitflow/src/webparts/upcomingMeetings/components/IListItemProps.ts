import { IListItem } from './IListItem';
import { IListItemAction } from './IListItemAction';

export interface IListItemProps {
  item: IListItem;
  actions?: IListItemAction[];
}
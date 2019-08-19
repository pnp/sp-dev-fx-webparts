import { IList } from './IList';
import { IListItem } from './IListItem';

export interface IListService {
  getLists: () => Promise<IList[]>;
  getList: (listName: string) => Promise<IListItem[]>;
}
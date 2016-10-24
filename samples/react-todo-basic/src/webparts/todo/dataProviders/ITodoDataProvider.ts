import { IWebPartContext } from '@microsoft/sp-client-preview';
import ITodoItem from '../models/ITodoItem';
import ITodoTaskList from '../models/ITodoTaskList';

interface ITodoDataProvider {

  selectedList: ITodoTaskList;

  webPartContext: IWebPartContext;

  createTaskList(): Promise<{}>;

  getTaskLists(): Promise<ITodoTaskList[]>;

  getItems(): Promise<ITodoItem[]>;

  createItem(title: string): Promise<ITodoItem[]>;

  updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]>;

  deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]>;
}

export default ITodoDataProvider;
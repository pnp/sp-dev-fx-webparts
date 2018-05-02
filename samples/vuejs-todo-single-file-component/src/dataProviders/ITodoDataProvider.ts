import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ITodoItem, ITaskList } from '../models/ICommonObjects';

interface ITodoDataProvider {

    selectedList: ITaskList;

    webPartContext: IWebPartContext;

    getTaskLists(): Promise<ITaskList[]>;

    getItems(): Promise<ITodoItem[]>;

    createItem(title: string): Promise<ITodoItem[]>;

    updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]>;

    deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]>;
}

export default ITodoDataProvider;
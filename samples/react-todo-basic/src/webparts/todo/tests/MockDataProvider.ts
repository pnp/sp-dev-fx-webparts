import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as lodash from '@microsoft/sp-lodash-subset';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import ITodoItem from '../models/ITodoItem';
import ITodoTaskList from '../models/ITodoTaskList';

export default class MockDataProvider implements ITodoDataProvider {

  private _idCounter: number;
  private _taskLists: ITodoTaskList[];
  private _items: { [listName: string]: ITodoItem[] };
  private _selectedList: ITodoTaskList;
  private _webPartContext: IWebPartContext;

  constructor() {
    this._idCounter = 0;

    this._taskLists = [
      this._createMockTaskList('1','List One'),
      this._createMockTaskList('2', 'List Two'),
      this._createMockTaskList('3', 'List Three')
    ];

    this._items = {
      'List One': [
        this._createMockTodoItem('Sunt filet mignon ut ut porchetta', true),
        this._createMockTodoItem('Laborum flank brisket esse chuck t-bone', false),
        this._createMockTodoItem('consectetur ex meatloaf boudin beef laborum pastrami', false)
      ],
      'List Two': [
        this._createMockTodoItem('Striga! Ut custodiant te sermonem dicens', false),
        this._createMockTodoItem('Dixi sunt implicatae', false),
        this._createMockTodoItem('Est, ante me factus singulis decem gradibus', true),
        this._createMockTodoItem('Tu omne quod ille voluit', false)
      ],
      'List Three': [
        this._createMockTodoItem('Integer massa lectus ultricies at lacinia et', false),
        this._createMockTodoItem('Phasellus sodales diam at interdum vulputate', false),
        this._createMockTodoItem('finibus porttitor dolor', false),
        this._createMockTodoItem('Vestibulum at rutrum nisi', false)
      ]
    };

  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public set selectedList(value: ITodoTaskList) {
    this._selectedList = value;
  }

  public get selectedList(): ITodoTaskList {
    return this._selectedList;
  }

  public getTaskLists(): Promise<ITodoTaskList[]> {
    const taskLists: ITodoTaskList[] = this._taskLists;

    return new Promise<ITodoTaskList[]>((resolve) => {
      setTimeout(() => resolve(taskLists), 500);
    });
  }

  public getItems(): Promise<ITodoItem[]> {
    const items: ITodoItem[] = lodash.clone(this._items[this.selectedList.Title]);

    return new Promise<ITodoItem[]>((resolve) => {
      setTimeout(() => resolve(items), 500);
    });
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    const newItem = this._createMockTodoItem(title, false);

    this._items[this.selectedList.Title]=this._items[this.selectedList.Title].concat(newItem);

    return this.getItems();
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const index: number =
      lodash.findIndex(
        this._items[this._selectedList.Title],
        (item: ITodoItem) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      this._items[this._selectedList.Title][index] = itemUpdated;
      return this.getItems();
    }
    else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    this._items[this.selectedList.Title] = this._items[this.selectedList.Title].filter((item: ITodoItem) => item.Id !== itemDeleted.Id);

    return this.getItems();
  }

  private _createMockTodoItem(title: string, isCompleted: boolean): ITodoItem {
    const mockTodoItem: ITodoItem = {
      Id: this._idCounter++,
      Title: title,
      PercentComplete: isCompleted ? 1 : 0
    };
    return mockTodoItem;
  }

  private _createMockTaskList(id: string, title: string): ITodoTaskList {
    const mockTaskList: ITodoTaskList = {
      Id: id,
      Title: title
    };
    return mockTaskList;
  }
}

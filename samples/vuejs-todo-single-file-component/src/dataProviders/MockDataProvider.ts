import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as lodash from '@microsoft/sp-lodash-subset';
import ITodoDataProvider from './ITodoDataProvider';
import { ITodoItem, ITaskList } from '../models/ICommonObjects';

export default class MockDataProvider implements ITodoDataProvider {

  private _idCounter: number;
  private _taskLists: ITaskList[];
  private _items: { [listId: string]: ITodoItem[] };
  private _selectedList: ITaskList;
  private _webPartContext: IWebPartContext;

  constructor() {
    this._idCounter = 0;

    this._taskLists = [
      this._createMockTaskList('1', 'List One', "SP.Data.OneListItem"),
      this._createMockTaskList('2', 'List Two', 'SP.Data.TwoListItem'),
      this._createMockTaskList('3', 'List Three', 'SP.Data.ThreetListItem')
    ];

    let listOneItems = [
      this._createMockTodoItem('Sunt filet mignon', true),
      this._createMockTodoItem('Laborum flank ', false),
      this._createMockTodoItem('consectetur ex', false)
    ];
    for (let i = 0; i < 2000; i++) {
      listOneItems.push(this._createMockTodoItem(this._getRandomString(i % 5), i % 2 == 0));
    }

    this._items = {
      '1': listOneItems,
      '2': [
        this._createMockTodoItem('Ut custodiant te sermonem', false),
        this._createMockTodoItem('Dixi sunt implicatae', false),
        this._createMockTodoItem('Est, ante me factus singulis', true),
        this._createMockTodoItem('Tu omne quod ille voluit', false)
      ],
      '3': [
        this._createMockTodoItem('Integer massa lectus ', true),
        this._createMockTodoItem('Phasellus sodales ', false),
        this._createMockTodoItem('finibus porttitor dolor', false),
        this._createMockTodoItem('Vestibulum at rutrum nisi', true)
      ]
    };

  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public set selectedList(value: ITaskList) {
    this._selectedList = value;
  }

  public get selectedList(): ITaskList {
    return this._selectedList;
  }

  public getTaskLists(): Promise<ITaskList[]> {
    const taskLists: ITaskList[] = this._taskLists;

    return new Promise<ITaskList[]>((resolve) => {
      setTimeout(() => resolve(taskLists), 500);
    });
  }

  public getItems(): Promise<ITodoItem[]> {

    const items: ITodoItem[] = lodash.clone(this._items[this._selectedList.Id]);

    return new Promise<ITodoItem[]>((resolve) => {
      setTimeout(() => resolve(items), 500);
    });
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    const newItem = this._createMockTodoItem(title, false);

    this._items[this._selectedList.Id] = this._items[this._selectedList.Id].concat(newItem);

    return this.getItems();
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const index: number =
      lodash.findIndex(
        this._items[this._selectedList.Id],
        (item: ITodoItem) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      this._items[this._selectedList.Id][index] = itemUpdated;
      return this.getItems();
    }
    else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    this._items[this._selectedList.Id] = this._items[this._selectedList.Id].filter((item: ITodoItem) => item.Id !== itemDeleted.Id);

    return this.getItems();
  }

  private _createMockTodoItem(title: string, isCompleted: boolean): ITodoItem {
    const mockTodoItem: ITodoItem = {
      Id: this._idCounter++,
      Title: title,
      PercentComplete: this._getRandomNumber() * 0.1

    };
    return mockTodoItem;
  }

  private _createMockTaskList(id: string, title: string, listItemEntityType: string): ITaskList {
    const mockTaskList: ITaskList = {
      Id: id,
      Title: title,
      ListItemEntityTypeFullName: listItemEntityType,
    };
    return mockTaskList;
  }

  private _getRandomString(wordCount: number): string {
    if (wordCount == 0) {
      wordCount = 2;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var j = 0; j < wordCount; j++) {
      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      text += " ";
    }

    return text;
  }

  private _getRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }
}

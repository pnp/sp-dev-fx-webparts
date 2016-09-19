/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file MockTodoDataProvider.ts
 */

import * as lodash from '@microsoft/sp-lodash-subset';

import { ITodoDataProvider } from './ITodoDataProvider';
import {
  ITodoWebPartProps,
  ITodoTask,
  ITodoPerson,
  ITodoTaskList
} from '../ITodoWebPartProps';

/**
 * MockTodoDataProvider is used for testing page and unit test page.
 */
export default class MockTodoDataProvider implements ITodoDataProvider {
  private _lists: ITodoTaskList[];
  private _selectedList: ITodoTaskList;

  private _maxNumberOfTasks: number;

  private _itemsStore: { [listTitle: string]: ITodoTask[] };
  private _idCounter: number;

  public get selectedList(): ITodoTaskList { return this._selectedList; }
  public set selectedList(value: ITodoTaskList) { this._selectedList = value; }

  public get maxNumberOfTasks(): number { return this._maxNumberOfTasks; }
  public set maxNumberOfTasks(value: number) { this._maxNumberOfTasks = value; }

  constructor(webPartProps: ITodoWebPartProps) {
    this._maxNumberOfTasks = webPartProps.maxNumberOfTasks;
    this.selectedList = webPartProps.selectedList;

    this._idCounter = 0;

    this._lists = [
      {
        Title: 'DefaultTodoList',
        ListItemEntityTypeFullName: '#SP.Data.DefaultTodoListListItem',
        Id: 'f3c61a58-44a8-4f87-bf5b-03668af148a6'
      },
      {
        Title: 'ListOne',
        ListItemEntityTypeFullName: '#SP.Data.ListOneListItem',
        Id: '01c78e45-06c2-4384-be9e-caa23912ebda'
      },
      {
        Title: 'ListTwo',
        ListItemEntityTypeFullName: '#SP.Data.ListTwoListItem',
        Id: '90c704fe-ab47-4d88-8b26-56f9a71e09e6'
      }
    ];

    this._itemsStore = {
      'DefaultTodoList': [
        this._generateItem('Finish Sample Todo web part before dev kitchen', false),
        this._generateItem('Finish All the work in Todo web part before dev kitchen', false),
        this._generateItem('Sharepoint API investigation for Todo web part', true),
        this._generateItem('Bug fixing of Pivot Control', true)
      ],
      'ListOne': [
        this._generateItem('Item one in ListOne', false),
        this._generateItem('Item two in ListOne', false),
        this._generateItem('Item three in ListOne', true),
        this._generateItem('Item four in ListOne', true)
      ],
      'ListTwo': [
        this._generateItem('Item one in ListTwo', false),
        this._generateItem('Item two in ListTwo', false),
        this._generateItem('Item three in ListTwo', true),
        this._generateItem('Item four in ListTwo', true)
      ]
    };
  }

/**
 * Read the mock task lists.
 */
  public readLists(): Promise<ITodoTaskList[]> {
    const lists: ITodoTaskList[] = this._lists;

    return new Promise<ITodoTaskList[]>((resolve) => {
      // Using setTimeout to mimic the real server response experience.
      // It's for debugging, testing and styles development of loading component.
      setTimeout(() => resolve(lists), 1000);
    });
  }

/**
 * Create a mock task item using the title.
 */
  public createItem(title: string): Promise<ITodoTask[]> {
    const newItem: ITodoTask = {
      Id: this._idCounter++,
      Title: title,
      Author: {
        Id: 3,
        Title: 'Lisa Andrews',
        Picture: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
        EMail: ''
      },
      PercentComplete: 0
    };

    this._itemsStore[this._selectedList.Title] =
      this._itemsStore[this._selectedList.Title].concat(newItem);

    return this.readItems();
  }

/**
 * Read task items from selected list.
 */
  public readItems(): Promise<ITodoTask[]> {
    const items: ITodoTask[] =
      this._itemsStore[this._selectedList.Title].slice(0, this._maxNumberOfTasks);

    return new Promise<ITodoTask[]>((resolve) => {
      // Using setTimeout to mimic the real server response experience.
      // It's for debugging, testing and styles development of loading component.
      setTimeout(() => resolve(items), 500);
    });
  }

/**
 * Update the task item.
 */
  public updateItem(itemUpdated: ITodoTask): Promise<ITodoTask[]> {
    const index: number =
      lodash.findIndex(
        this._itemsStore[this._selectedList.Title],
        (item: ITodoTask) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      const editor: ITodoPerson = itemUpdated.PercentComplete >= 1
        ? {
          Id: 3,
          Title: 'Chris Meyer',
          Picture: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
          EMail: ''
        }
        : undefined;

      this._itemsStore[this._selectedList.Title][index] = itemUpdated;
      this._itemsStore[this._selectedList.Title][index].Editor = editor;

      return this.readItems();
    } else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

/**
 * Delete the task item.
 */
  public deleteItem(itemDeleted: ITodoTask): Promise<ITodoTask[]> {
    this._itemsStore[this._selectedList.Title] =
      this._itemsStore[this._selectedList.Title].filter((item: ITodoTask) => item.Id !== itemDeleted.Id);

    return this.readItems();
  }

  private _generateItem(title: string, isCompleted: boolean): ITodoTask {
    return {
      Id: this._idCounter++,
      Title: title,
      Author: {
        Id: 1,
        Title: 'Misty Shock',
        Picture: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
        EMail: ''
      },
      Editor: !isCompleted ? undefined : {
        Id: 2,
        Title: 'Burton Guido',
        Picture: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
        EMail: ''
      },
      PercentComplete: !isCompleted ? 0 : 1
    };
  }
}

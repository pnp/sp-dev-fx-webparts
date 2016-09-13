/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file ITodoDataProvider.ts
 */

import {
  ITodoTask,
  ITodoTaskList
} from '../ITodoWebPartProps';

/**
 * The data provider interface implemented by MockTodoDataProvider and TodoDataProvider.
 */
export interface ITodoDataProvider {
  /**
   * The current selected list.
   *
   * It should be always the same with the list in web part properties.
   */
  selectedList: ITodoTaskList;

  /**
   * The max number of tasks show in the Todo list.
   *
   * It should be always the sam with the maxNumberOfTasks in web part properties.
   */
  maxNumberOfTasks: number;

  /**
   * readLists will fetch the information of all the lists in current site.
   */
  readLists(): Promise<ITodoTaskList[]>;

  /**
   * createItem will send REST call to add an item in the current .
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {string} title is the title of item that will be created in current list.
   */
  createItem(title: string): Promise<ITodoTask[]>;

  /**
   * readItems will send REST call to fetch the a number up to maxNumberOfTasks of items
   * in the current.
   */
  readItems(): Promise<ITodoTask[]>;

  /**
   * updateItem will send REST call to update(merge) an item in the current list.
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {ITodoTask} itemUpdated is the item which will be merged to current list.
   */
  updateItem(itemUpdated: ITodoTask): Promise<ITodoTask[]>;

  /**
   * deleteItem will send REST call to remove an item in the current list.
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {ITodoTask} itemDeleted is the item which will be deleted in current list.
   */
  deleteItem(itemDeleted: ITodoTask): Promise<ITodoTask[]>;
}

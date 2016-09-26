/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoWebPart.tsx
 */

import * as lodash from '@microsoft/sp-lodash-subset';
import update = require('react-addons-update');

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BaseClientSideWebPart,
  IWebPartContext
} from '@microsoft/sp-client-preview';

import { ITodoDataProvider } from './dataProviders/ITodoDataProvider';
import MockTodoDataProvider from './dataProviders/MockTodoDataProvider';

import {
  ITodoWebPartProps,
  ITodoComponentData,
  ITodoTaskList,
  ITodoTask,
  LoadingStatus
} from './ITodoWebPartProps';

import Todo, { ITodoProps } from './components/Todo';

/**
 * This is the client-side todo sample web part built using the SharePoint Framework.
 * It could interact with tasks lists in SharePoint site.
 *
 * Find out more docs and tutorials at:
 * https://github.com/SharePoint/sp-dev-docs/wiki
 */
export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {
  private _dataProvider: ITodoDataProvider;

  private _shouldGetLists: boolean;
  private _listTitleToList: { [title: string]: ITodoTaskList };

  private _todoComponentData: ITodoComponentData;

  constructor(context: IWebPartContext) {
    super(context);

    this._shouldGetLists = true;

    this._todoComponentData = {
      selectedListItems: [],
      loadingStatus: LoadingStatus.None
    };

    this._renderTodoComponent = this._renderTodoComponent.bind(this);
    this._readLists = this._readLists.bind(this);
    this._ensureSelectedList = this._ensureSelectedList.bind(this);
    this._createItem = this._createItem.bind(this);
    this._readItems = this._readItems.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._toggleComplete = this._toggleComplete.bind(this);
  }

  /**
   * Override the base onInit() implementation to get the persisted properties to initialize data provider.
   */
  public onInit(): Promise<void> {
    this._dataProvider = new MockTodoDataProvider(this.properties);

    return Promise.resolve(undefined);
  }

  /**
   * Override the base render() implementation to render the todo sample web part.
   */
  public render(): void {
    this._renderTodoComponent();

    this._ensureSelectedList();
  }

  protected dispose(): void {
    ReactDOM.unmountComponentAtNode(this.domElement);

    super.dispose();
  }

  private _renderTodoComponent(partialData?: ITodoComponentData): void {
    lodash.extend(this._todoComponentData, partialData);

    ReactDOM.render(
      <Todo
        { ...this.properties }
        { ...this._todoComponentData }
        onCreateItem={ this._createItem }
        onDeleteItem={ this._deleteItem }
        onToggleComplete={ this._toggleComplete }
      /> as React.ReactElement<ITodoProps>,
      this.domElement
    );
  }

  /**
   * Read the information of all the task lists stored in the current site through data provider.
   */
  private _readLists(): Promise<void> {
    return this._dataProvider.readLists()
      .then((lists: ITodoTaskList[]) => {
        // Create map from list title to the list
        this._listTitleToList = {};
        lists.forEach((list: ITodoTaskList) => {
          this._listTitleToList[list.Title] = list;
        });
      });
  }

  /**
   * If there is no GUID for the selected task list in properties, we will read all task lists on the
   * site and retrieve the GUID. Usually it will happen at the first time we add todo web part, since
   * in manifest we could not predict the GUID for the default list added by SharePoint feature XML.
   * Finally we will read task items of the selected list.
   */
  private _ensureSelectedList(): Promise<void> {
    if (!this.properties.selectedList.Id) {
      this.clearError();
      this._renderTodoComponent({ loadingStatus: LoadingStatus.FetchingTasks });

      return this._dataProvider.readLists()
        .then((lists: ITodoTaskList[]) => {
          const selectedLists: ITodoTaskList[] = lists.filter((list: ITodoTaskList) => {
            return list.Title === this.properties.selectedList.Title;
          });

          this.properties.selectedList = selectedLists[0] || lists[0];
          this._dataProvider.selectedList = this.properties.selectedList;
        })
        .then(this._readItems, (error: Error) => {
          this._renderTodoComponent({ loadingStatus: LoadingStatus.None });
          this.renderError(error);
        });
    } else if (!this.renderedOnce) {
      return this._readItems();
    } else {
      // The list id exists and items have been fetched, do nothing.
      return Promise.resolve(undefined);
    }
  }

  /**
   * Create a new item and add it to the list through data provider.
   */
  private _createItem(item: ITodoTask): Promise<void> {
    this.clearError();
    this._renderTodoComponent({ loadingStatus: LoadingStatus.UpdatingTasks });

    return this._dataProvider.createItem(item.Title)
      .then(
        (items: ITodoTask[]) => items && this._renderTodoComponent({
          selectedListItems: items,
          loadingStatus: LoadingStatus.None
        }),
        (error: Error) => {
          this._renderTodoComponent({ loadingStatus: LoadingStatus.None });
          this.renderError(error);
        }
      );
  }

  /**
   * Read the list items from the data provider.
   */
  private _readItems(): Promise<void> {
    this.clearError();
    this._renderTodoComponent({ loadingStatus: LoadingStatus.FetchingTasks });

    return this._dataProvider.readItems()
      .then(
        (items: ITodoTask[]) => items && this._renderTodoComponent({
          selectedListItems: items,
          loadingStatus: LoadingStatus.None
        }),
        (error: Error) => {
          this._renderTodoComponent({ loadingStatus: LoadingStatus.None });
          this.renderError(error);
        }
      );
  }

  /**
   * Update a item in the list through data provider.
   */
  private _updateItem(newItem: ITodoTask): Promise<void> {
    this.clearError();

    const updatingIndex: number = lodash.findIndex(this._todoComponentData.selectedListItems,
      (item: ITodoTask) => item.Id === newItem.Id
    );
    this._renderTodoComponent({
      selectedListItems: update(this._todoComponentData.selectedListItems, { [updatingIndex]: { $set: newItem } })
    });

    return this._dataProvider.updateItem(newItem)
      .then(
        (items: ITodoTask[]) => items && this._renderTodoComponent({ selectedListItems: items }),
        this.renderError
      );
  }

  /**
   * Delete a item from the list through data provider.
   */
  private _deleteItem(item: ITodoTask): Promise<void> {
    this.clearError();

    this._renderTodoComponent({
      selectedListItems: this._todoComponentData.selectedListItems.filter((task: ITodoTask) => task.Id !== item.Id)
    });

    return this._dataProvider.deleteItem(item)
      .then(
        (items: ITodoTask[]) => items && this._renderTodoComponent({ selectedListItems: items }),
        this.renderError
      );
  }

  /**
   * Toggle the complete state of an item by.
   *
   * Will call updateItem function to update complete state of this item.
   */
  private _toggleComplete(item: ITodoTask): Promise<void> {
    // Create a new Item in which the PercentComplete value has been changed.
    const newItem: ITodoTask = update(item, {
      PercentComplete: { $set: item.PercentComplete >= 1 ? 0 : 1 }
    });

    return this._updateItem(newItem);
  }
}

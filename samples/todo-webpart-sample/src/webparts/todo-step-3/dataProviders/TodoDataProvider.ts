/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoDataProvider.ts
 */

import { HttpClient, ODataBatch } from '@microsoft/sp-client-base';
import { IWebPartContext } from '@microsoft/sp-client-preview';

import { ITodoDataProvider } from './ITodoDataProvider';
import {
  ITodoWebPartProps,
  ITodoTask,
  ITodoTaskList
} from '../ITodoWebPartProps';

import * as strings from 'todoStrings';

/**
 * TodoDataProvider interact with current sharepoint site to accomplish
 * item operations and data fetching interaction with backend.
 */
export default class TodoDataProvider implements ITodoDataProvider {
  private _httpClient: HttpClient;
  private _webAbsoluteUrl: string;

  private _lists: ITodoTaskList[];

  private _selectedList: ITodoTaskList;
  private _maxNumberOfTasks: number;
  private _operationId: number;

  private _listsUrl: string;
  private _listItemsUrl: string;

  public get selectedList(): ITodoTaskList { return this._selectedList; }
  public set selectedList(value: ITodoTaskList) {
    this._selectedList = value;
    this._listItemsUrl = `${this._listsUrl}(guid'${value.Id}')/items`;
  }

  public get maxNumberOfTasks(): number { return this._maxNumberOfTasks; }
  public set maxNumberOfTasks(value: number) { this._maxNumberOfTasks = value; }

  constructor(webPartProps: ITodoWebPartProps, webPartContext: IWebPartContext) {
    this._httpClient = webPartContext.httpClient as any; // tslint:disable-line:no-any
    this._webAbsoluteUrl = webPartContext.pageContext.web.absoluteUrl;

    this._operationId = 0;
    this._maxNumberOfTasks = webPartProps.maxNumberOfTasks;

    this._listsUrl = `${this._webAbsoluteUrl}/_api/web/lists`;
    if (webPartProps.selectedList.Id) {
      this.selectedList = webPartProps.selectedList;
    }
  }

  /**
   * Read all the Tasks lists in the site.
   */
  public readLists(): Promise<ITodoTaskList[]> {
    // It is TasksWithTimelineAndHierarchy.
    const listTemplateId: string = '171';
    const queryString: string = `?$filter=BaseTemplate eq ${listTemplateId}`;

    return this._httpClient.get(this._listsUrl + queryString)
      .then(this._checkStatus)
      .then((response: Response) => {
        return response.json();
      })
      .then((json: { value: ITodoTaskList[] }) => {
        if (json.value.length === 0) {
          throw new Error(strings.DropdownErrorMessageNoListAvailable);
        } else {
          return this._lists = json.value;
        }
      });
  }

  /**
   * Batch request to create item and sync the latest list.
   */
  public createItem(title: string): Promise<ITodoTask[]> {
    const batch: ODataBatch = this._httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._createItem(batch, title),
      this._readItems(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public readItems(): Promise<ITodoTask[]> {
    return this._readItems(this._httpClient);
  }

  /**
   * Batch request to update item and sync the latest list.
   */
  public updateItem(itemUpdated: ITodoTask): Promise<ITodoTask[]> {
    const batch: ODataBatch = this._httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._updateItem(batch, itemUpdated),
      this._readItems(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  /**
   * Batch request to delete item and sync the latest list.
   */
  public deleteItem(itemDeleted: ITodoTask): Promise<ITodoTask[]> {
    const batch: ODataBatch = this._httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._deleteItem(batch, itemDeleted),
      this._readItems(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  private _checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(JSON.stringify(response)));
    }
  }

  private _getPictureUrl(eMail: string): string {
    return `${this._webAbsoluteUrl}/_layouts/15/userphoto.aspx?size=L&username=${eMail}`;
  }

  /**
   * Batch the request to create item in the SharePoint list.
   */
  private _createItem(batch: ODataBatch, title: string): Promise<Response> {
    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'Title': title
    };

    return batch.post(this._listItemsUrl, { body: JSON.stringify(body) }).then(this._checkStatus);
  }

  /**
   * Read the items from SharePoint list using HttpClient or ODataBatch.
   *
   * @param {HTTPClient | ODataBatch} requester is the type of the object which send request to the server.
   * If it is HttpClient, the request will be sent immediately.
   * If it is ODataBatch, the request will be batched until it is executed.
   */
  private _readItems(requester: HttpClient | ODataBatch): Promise<ITodoTask[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete,` +
      `Author/Id,Author/Title,Author/EMail,Editor/Id,Editor/Title,Editor/EMail&` +
      `$expand=Author,Editor&$top=${this._maxNumberOfTasks}`;
    const currentId: number = ++this._operationId;

    return requester.get(this._listItemsUrl + queryString)
      .then(this._checkStatus)
      .then((response: Response) => {
        return response.json();
      })
      .then((json: { value: ITodoTask[] }) => {
        return json.value.map((task: ITodoTask) => {
          task.Author.Picture = this._getPictureUrl(task.Author.EMail);
          task.Editor.Picture = this._getPictureUrl(task.Editor.EMail);
          return task;
        });
      })
      .then((tasks: ITodoTask[]) => currentId === this._operationId ? tasks : undefined);
  }

  /**
   * Batch the request to update the item in the list.
   */
  private _updateItem(batch: ODataBatch, item: ITodoTask): Promise<Response> {

    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'PercentComplete': item.PercentComplete
    };

    return batch.fetch(itemUpdatedUrl, {
      body: JSON.stringify(body),
      headers,
      method: 'PATCH' // Use PATCH http method to perform update operation.
    }).then(this._checkStatus);
  }

  /**
   * Batch the request to delete the item in the list.
   */
  private _deleteItem(batch: ODataBatch, item: ITodoTask): Promise<Response> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return batch.fetch(itemDeletedUrl, {
      headers,
      method: 'DELETE' // Use DELETE http method to perform delete operation.
    }).then(this._checkStatus);
  }

  /**
   * Execute the batch request and return the promise of the last request.
   */
  private _resolveBatch(batch: ODataBatch, promises: Promise<{}>[]): Promise<ITodoTask[]> {
    return batch.execute()
      .then(() => Promise.all(promises).then(values => values[values.length - 1]));
  }
}

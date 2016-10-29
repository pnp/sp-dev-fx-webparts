import { HttpClient, ODataBatch } from '@microsoft/sp-client-base';
import { IWebPartContext } from '@microsoft/sp-client-preview';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import ITodoItem from '../models/ITodoItem';
import ITodoTaskList from '../models/ITodoTaskList';
import IList from '../models/IList';

export default class SharePointDataProvider implements ITodoDataProvider {

  private _selectedList: ITodoTaskList;
  private _taskLists: ITodoTaskList[];
  private _listsUrl: string;
  private _listItemsUrl: string;
  private _webPartContext: IWebPartContext;

  public set selectedList(value: ITodoTaskList) {
    this._selectedList = value;
    this._listItemsUrl = `${this._listsUrl}(guid'${value.Id}')/items`;
  }

  public get selectedList(): ITodoTaskList {
    return this._selectedList;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
    this._listsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists`;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public createTaskList(): Promise<{}> {
    const listTemplateId: number = 171;
    const postBody: IList = {
        // __metadata: { type: 'SP.List' },
        Title: 'Todo',
        BaseTemplate: listTemplateId,
        Description: 'Todo List Webpart list'
    };

    return this._webPartContext.httpClient.post(this._listsUrl,{
        body: JSON.stringify(postBody)
      })
      .then((response: Response) => {
        return response.json();
      });
  }

  public getTaskLists(): Promise<ITodoTaskList[]> {
    const listTemplateId: string = '171';
    const queryString: string = `?$filter=BaseTemplate eq ${listTemplateId}`;
    const queryUrl: string = this._listsUrl + queryString;

    return this._webPartContext.httpClient.get(queryUrl)
      .then((response: Response) => {
        return response.json();
      })
      .then((json: { value: ITodoTaskList[] }) => {
        return this._taskLists = json.value;
      });
  }

  public getItems(): Promise<ITodoItem[]> {
    return this._getItems(this.webPartContext.httpClient);
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    const batch: ODataBatch = this.webPartContext.httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._createItem(batch, title),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    const batch: ODataBatch = this.webPartContext.httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._deleteItem(batch, itemDeleted),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const batch: ODataBatch = this.webPartContext.httpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._updateItem(batch, itemUpdated),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  private _getItems(requester: HttpClient): Promise<ITodoItem[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl)
      .then((response: Response) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }

  private _getItemsBatched(requester: ODataBatch): Promise<ITodoItem[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl)
      .then((response: Response) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }


  private _createItem(batch: ODataBatch, title: string): Promise<Response> {
    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'Title': title
    };

    return batch.post(this._listItemsUrl, { body: JSON.stringify(body) });
  }

  private _deleteItem(batch: ODataBatch, item: ITodoItem): Promise<Response> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return batch.fetch(itemDeletedUrl, {
      headers,
      method: 'DELETE'
    });
  }

  private _updateItem(batch: ODataBatch, item: ITodoItem): Promise<Response> {

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
      method: 'PATCH'
    });
  }

  private _resolveBatch(batch: ODataBatch, promises: Promise<{}>[]): Promise<ITodoItem[]> {
    return batch.execute()
      .then(() => Promise.all(promises).then(values => values[values.length - 1]));
  }

}
import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import ITodoItem from '../models/ITodoItem';
import ITodoTaskList from '../models/ITodoTaskList';

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

  public getTaskLists(): Promise<ITodoTaskList[]> {
    const listTemplateId: string = '171';
    const queryString: string = `?$filter=BaseTemplate eq ${listTemplateId}`;
    const queryUrl: string = this._listsUrl + queryString;

    return this._webPartContext.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoTaskList[] }) => {
        return this._taskLists = json.value;
      });
  }

  public getItems(): Promise<ITodoItem[]> {
    return this._getItems(this.webPartContext.spHttpClient);
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._createItem(batch, title),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._deleteItem(batch, itemDeleted),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._updateItem(batch, itemUpdated),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  private _getItems(requester: SPHttpClient): Promise<ITodoItem[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }

  private _getItemsBatched(requester: SPHttpClientBatch): Promise<ITodoItem[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }


  private _createItem(batch: SPHttpClientBatch, title: string): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'Title': title
    };

    return batch.post(
      this._listItemsUrl,
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }

  private _deleteItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return batch.fetch(itemDeletedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        headers,
        method: 'DELETE'
      }
    );
  }

  private _updateItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'PercentComplete': item.PercentComplete
    };

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }

  private _resolveBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<ITodoItem[]> {
    return batch.execute()
      .then(() => Promise.all(promises).then(values => values[values.length - 1]));
  }

}
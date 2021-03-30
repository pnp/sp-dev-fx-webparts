import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import { ITodoItem, ITaskList } from '../models/ICommonObjects';

export default class SharePointDataProvider implements ITodoDataProvider {

  private _selectedList: ITaskList;
  private _webPartContext: IWebPartContext;


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

    const listTemplateId: string = '171';
    const queryUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists?$filter=BaseTemplate eq ${listTemplateId}`;

    return this._webPartContext.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITaskList[] }) => {
        return json.value;
      });
  }

  public getItems(): Promise<ITodoItem[]> {
    const queryUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}` +
      `/_api/web/lists(guid'${this._selectedList.Id}')/items?$select=Id,Title,PercentComplete`;

    return this.webPartContext.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: any) => {
        return json.value.map((item: any) => {
          let newItem: ITodoItem = {
            Id: item.Id,
            Title: item.Title,
            PercentComplete: item.PercentComplete
          };
          return newItem;
        });
      });
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    const body: {} = {
      '@data.type': this._selectedList.ListItemEntityTypeFullName,
      'Title': title
    };

    return this._webPartContext.spHttpClient.post(`${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items`, SPHttpClient.configurations.v1, {
      body: JSON.stringify(body)
    })
      .then(() => {
        return this.getItems();
      });
  }

  public deleteItem(itemToBeDeleted: ITodoItem): Promise<ITodoItem[]> {
    const itemDeletedUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items(${itemToBeDeleted.Id})`;
    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return this.webPartContext.spHttpClient.fetch(itemDeletedUrl,
      SPHttpClient.configurations.v1,
      {
        headers,
        method: 'DELETE'
      }
    ).then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        return Promise.reject(new Error(JSON.stringify(response)));
      }
    }).then(() => {
      return this.getItems();
    });
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const itemUpdatedUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items(${itemUpdated.Id})`;
    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': this._selectedList.ListItemEntityTypeFullName,
      'PercentComplete': itemUpdated.PercentComplete
    };

    return this._webPartContext.spHttpClient.fetch(itemUpdatedUrl, SPHttpClient.configurations.v1, {
      body: JSON.stringify(body),
      headers,
      method: 'PATCH'
    }).then(() => {
      return this.getItems();
    });
  }
}

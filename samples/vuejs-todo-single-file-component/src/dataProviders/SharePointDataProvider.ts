import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import { ITodoItem, ITaskList } from '../models/ICommonObjects';
import { debounce } from '@microsoft/sp-lodash-subset';

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

  public deleteItem(itemToBeDeleted: ITodoItem): Promise<ITodoItem[]> {
    //Approach 1: it is not working here with DELETE
    // const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();
    // const batchPromises: Promise<{}>[] = [
    //   this._deleteItem(batch, itemToBeDeleted),
    //   this._getItemsBatched(batch)
    // ];
    // return this._resolveBatch(batch, batchPromises);


    //Approach 2:
    return this._deleteItem2(this.webPartContext.spHttpClient, itemToBeDeleted);
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
    const queryUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}` +
      `/_api/web/lists(guid'${this._selectedList.Id}')/items?$select=Id,Title,PercentComplete`;

    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      //Approach 1: Of the property names of ITodoItem are equal to the internal names of the list, this will work
      // .then((json: { value: ITodoItem[] }) => {
      //   debugger;
      //   return json.value;
      //   // .map((task: ITodoItem) => { debugger; return task; });
      // });
      //Approach 2: manually create the ITodoItem object; useful when the properties are different form the internal names of the list
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

  private _getItemsBatched(requester: SPHttpClientBatch): Promise<ITodoItem[]> {
    const queryUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}` +
      `/_api/web/lists(guid'${this._selectedList.Id}')/items?$select=Id,Title,PercentComplete`;

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
      '@data.type': this._selectedList.ListItemEntityTypeFullName,
      'Title': title
    };

    return batch.post(
      `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items`,
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }

  private _deleteItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {
    const itemDeletedUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items(${item.Id})`;

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

  private _deleteItem2(requester: SPHttpClient, item: ITodoItem): Promise<ITodoItem[]> {
    const itemDeletedUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items(${item.Id})`;
    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return requester.fetch(itemDeletedUrl,
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
      return this._getItems(requester);
    });
  }

  private _updateItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this._selectedList.Id}')/items(${item.Id})`;
    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': this._selectedList.ListItemEntityTypeFullName,
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
      .then(() => {
        return Promise.all(promises);
      }).then((values: any) => {
        return Promise.resolve(values[values.length - 1]);
        // return values[values.length - 1];
      }).catch((ex) => {
        throw ex;
      });

  }
}

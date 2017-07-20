import { IListService, IList, IListItem } from '../services';
import {
  SPHttpClient,
  ISPHttpClientOptions,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

export class ListService implements IListService {

  constructor(private context: IWebPartContext) {
  }

  public getLists(): Promise<IList[]> {
    var httpClientOptions : ISPHttpClientOptions = {};

    httpClientOptions.headers = {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
    };

    return new Promise<IList[]>((resolve: (results: IList[]) => void, reject: (error: any) => void): void => {
      this.context.spHttpClient.get(this.context.pageContext.web.serverRelativeUrl + `/_api/web/lists?$select=id,title`,
        SPHttpClient.configurations.v1,
        httpClientOptions
        )
        .then((response: SPHttpClientResponse): Promise<{ value: IList[] }> => {
          return response.json();
        })
        .then((lists: { value: IList[] }): void => {
          resolve(lists.value);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  public getList(listName: string): Promise<IListItem[]> {
    var httpClientOptions : ISPHttpClientOptions = {};

    httpClientOptions.headers = {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
    };

    return new Promise<IListItem[]>((resolve: (results: IListItem[]) => void, reject: (error: any) => void): void => {
      this.context.spHttpClient.get(this.context.pageContext.web.serverRelativeUrl + `/_api/web/lists('${listName}')/items?$select=Id,Title`,
        SPHttpClient.configurations.v1,
        httpClientOptions
        )
        .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
          return response.json();
        })
        .then((listItems: { value: IListItem[] }): void => {
          resolve(listItems.value);
        }, (error: any): void => {
          reject(error);
        });
    });
  }
}
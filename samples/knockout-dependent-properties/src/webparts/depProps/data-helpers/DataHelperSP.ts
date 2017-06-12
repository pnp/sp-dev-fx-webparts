import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { ISPList, ISPView, ISPLists, ISPViews } from '../common/SPEntities';
import { IDataHelper } from './DataHelperBase';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

/**
 * List with views interface
 */
interface ISPListWithViews extends ISPList {
  /**
   * List Views
   */
  Views: ISPView[];
}

/**
 * SharePoint Data Helper class.
 * Gets information from current web
 */
export class DataHelperSP implements IDataHelper {
  /**
   * Web part context
   */
  public context: IWebPartContext;

  /**
   * Loaded lists
   */
  private _lists: ISPListWithViews[];

  /**
   * ctor
   */
  public constructor(_context: IWebPartContext) {
    this.context = _context;
  }

  /**
   * API to get lists from the source
   */
  public getLists(): Promise<ISPList[]> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1) // sending the request to SharePoint REST API
      .then((response: SPHttpClientResponse) => { // httpClient.get method returns a response object where json method creates a Promise of getting result
        return response.json();
      }).then((response: ISPLists) => { // response is an ISPLists object
        return response.value;
      });
  }

  /**
   * API to get views from the source
   */
  public getViews(listId: string): Promise<ISPView[]> {
    if (listId && listId == '-1' || listId == '0')
      return new Promise<ISPView[]>((resolve) => {
      resolve(new Array<ISPView>());
    });

    //
    // trying to get views from cache
    //
    const lists: ISPListWithViews[] = this._lists && this._lists.length && this._lists.filter((value, index, array) => { return value.Id === listId; });

    if (lists && lists.length) {
      return new Promise<ISPView[]>((resolve) => {
        resolve(lists[0].Views);
      });
    }
    else {
      return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists(\'' + listId + '\')/views', SPHttpClient.configurations.v1) // requesting views from SharePoint REST API
        .then((response: SPHttpClientResponse) => { // httpClient.get method returns a response object where json method creates a Promise of getting result
          return response.json();
        }).then((response: ISPViews) => { // response is an ISPViews object
          var views = response.value;
          if (!this._lists || !this._lists.length)
            this._lists = new Array<ISPListWithViews>();
          this._lists.push({ Id: listId, Title: '', Views: views });
          return views;
        });
    }
  }
}
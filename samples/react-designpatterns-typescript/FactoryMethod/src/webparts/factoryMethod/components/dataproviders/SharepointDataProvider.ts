import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse
  } from "@microsoft/sp-http";
  import { IWebPartContext } from "@microsoft/sp-webpart-base";
  import List from "../models/List";
  import IDataProvider from "./IDataProvider";
  
  export default class SharePointDataProvider implements IDataProvider {
      private _selectedList: List;
      private _lists: List[];
      private _listsUrl: string;
      private _listItemsUrl: string;
      private _webPartContext: IWebPartContext;
  
      public set selectedList(value: List) {
        this._selectedList = value;
        this._listItemsUrl = `${this._listsUrl}(guid'${value.Id}')/items`;
      }
  
      public get selectedList(): List {
        return this._selectedList;
      }
  
      public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
        this._listsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists`;
      }
  
      public get webPartContext(): IWebPartContext {
        return this._webPartContext;
      }
  
      // get all lists, not only tasks lists
      public getLists(): Promise<List[]> {
        // const listTemplateId: string = '171';
        // const queryString: string = `?$filter=BaseTemplate eq ${listTemplateId}`;
        // const queryUrl: string = this._listsUrl + queryString;
        return this._webPartContext.spHttpClient.get(this._listsUrl, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => {
            return response.json();
          })
          .then((json: { value: List[] }) => {
            return this._lists = json.value;
          });
      }
    }
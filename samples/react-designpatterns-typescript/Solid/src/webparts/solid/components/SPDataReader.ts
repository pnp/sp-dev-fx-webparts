import { IWebPartContext } from '@microsoft/sp-webpart-base';

import {
    SPHttpClient,
    SPHttpClientResponse   
} from '@microsoft/sp-http';

import { IDataReader } from './DataReader';
import { IQuotes } from './QuoteContracts';

export class SPDataReader implements IDataReader {
    constructor(context: IWebPartContext, listName: string) {
        this._context = context;
        this._listName = listName;
    }

    public getData(): Promise<IQuotes> {
        return this._context.spHttpClient
            .get(
                this._context.pageContext.web.absoluteUrl + + `/_api/web/lists/GetByTitle('${this._listName}')/Items`,
                SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });
    }

    private _listName: string;
    private _context: IWebPartContext;
}

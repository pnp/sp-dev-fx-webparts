import { 
    ServiceKey, 
    ServiceScope,
    Text 
} from '@microsoft/sp-core-library';
import { 
    SPHttpClient, 
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';

import { ListItem } from "./ListItem";
import { IListService } from "./IListService";

export class ListSharePoint implements IListService {

    public static readonly serviceKey: ServiceKey<IListService> = ServiceKey.create<IListService>('vrd:IListService', ListSharePoint);
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
                this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                
                this._pageContext = serviceScope.consume(PageContext.serviceKey);

                this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
    }

    public getAll(listName:string): Promise<ListItem[]> {
        const url: string = Text.format("{0}/_api/Lists/getByTitle('{1}')/items?$select=Title,Description,ImageUrl", this._currentWebUrl, listName);

        console.log(url);
     
        return this._spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json()
                .then(data => {
                    console.log(data.value);
                    return data.value;
                });
            });
    }
}

import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { IDemoTimeListItem } from './IDemoTimeListItem';

export default class DemoTimeService {

    private _httpClient: SPHttpClient;
    private _siteUrl: string;
    private _pageName: string;
    private _listTitle: string = 'demoTime';

    constructor(
        httpClient: SPHttpClient, 
        siteUrl: string,
        pageName: string) {
        this._siteUrl = siteUrl;
        this._httpClient = httpClient;
        this._pageName = pageName;
    }

    public async getDemoData(): Promise<IDemoTimeListItem[]> {
        let output: IDemoTimeListItem[] = [];

        const endpoint = `${this._siteUrl}/_api/web/lists/getbytitle('${this._listTitle}')/items?$filter=Page eq '${this._pageName}'&$orderby=Section asc`;
        output = await this._httpClient.get(endpoint, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((data: any) => {
                const output = data.value.map((item: IDemoTimeListItem) => {
                    return {
                        Id: item.Id,
                        Section: item.Section,
                        Page: item.Page,
                        Comment: item.Comment
                    };
                });
                return output;
            })
            .catch((error) => {
                console.error(error);
            });
        return output;
    }
}
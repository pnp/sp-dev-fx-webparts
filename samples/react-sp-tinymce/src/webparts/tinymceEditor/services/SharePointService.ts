import { Text } from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

import { endsWith } from '../utils/StringUtils';
import { LogHelper } from '../helpers/LogHelper';

class SharePointService {

    /***************************************************************************
     * The spHttpClient object used for performing REST calls to SharePoint
     ***************************************************************************/
    private static spHttpClient: SPHttpClient;


    /**************************************************************************************************
     * Init
     * @param httpClient : The spHttpClient required to perform REST calls against SharePoint
     **************************************************************************************************/

    public static Init(spHttpClient: SPHttpClient): void {
        this.spHttpClient = spHttpClient;
        LogHelper.info('SharePointService', 'Init', 'spHttpClient initialised');
    }


    /**************************************************************************************************
     * Performs a CAML query against the specified list and returns the resulting items
     * @param webUrl : The url of the web which contains the specified list
     * @param listId : The id of the list which contains the elements to query
     * @param camlQuery : The CAML query to perform on the specified list
     **************************************************************************************************/
    public static getListItemsByQuery(webUrl: string, listId: string, camlQuery: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/GetItems?$expand=FieldValuesAsText,FieldValuesAsHtml", webUrl, listId);

            let data: any = {
                query: {
                    __metadata: { type: "SP.CamlQuery" },
                    ViewXml: camlQuery
                }
            };
            let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };

            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
                .then((postResponse: SPHttpClientResponse) => {
                    if (postResponse.ok) {
                        resolve(postResponse.json());
                    }
                    else {
                        reject(postResponse);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**************************************************************************************************
     * Performs a CAML query against the specified list and returns the resulting items
     * @param webUrl : The url of the web which contains the specified list
     * @param listId : The id of the list which contains the elements to query
     * @param camlQuery : The CAML query to perform on the specified list
     **************************************************************************************************/
    public static getListItemsByQueryStream(webUrl: string, listId: string, camlQuery: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            console.log(camlQuery);
            let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/RenderListDataAsStream", webUrl, listId);
            const searchFilter = `<View><Query><Where><Contains><FieldRef Name="Title" /><Value Type="Text">VPN</Value></Contains></Where></Query></View>`;

            const data = {
                parameters: {
                    ViewXml: camlQuery,
                    OverrideViewXml: searchFilter,
                    RenderOptions: 2,
                    DatesInUtc: true,
                    ReplaceGroup: true
                }
            };
            let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };

            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
                .then((postResponse: SPHttpClientResponse) => {
                    if (postResponse.ok) {
                        resolve(postResponse.json());
                    }
                    else {
                        reject(postResponse);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public static postData(endpoint: string, payload: any): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(payload) };

            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
                .then((postResponse: SPHttpClientResponse) => {
                    if (postResponse.ok) {
                        resolve(postResponse.json());
                    }
                    else {
                        reject(postResponse);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    /**************************************************************************************************
     * Returns a sorted array of all available list titles for the specified web
     * @param webUrl : The web URL from which the list titles must be taken from
     **************************************************************************************************/
    public static getListTitlesFromWeb(webUrl: string): Promise<IListTitle[]> {
        return new Promise<IListTitle[]>((resolve, reject) => {
            let endpoint = Text.format("{0}/_api/web/lists?$select=Id,Title&$filter=(IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)", webUrl);
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                if (response.ok) {
                    response.json().then((data: any) => {
                        let listTitles: IListTitle[] = data.value.map((list: any) => { return { id: list.Id, title: list.Title }; });
                        resolve(listTitles.sort((a, b) => { return Number(a.title > b.title); }));
                    })
                        .catch((error) => { reject(error); });
                }
                else {
                    reject(response);
                }
            })
                .catch((error) => { reject(error); });
        });
    }


    public static getListUrl(siteUrl: string, listId: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/DefaultView?$select=ServerRelativePath", siteUrl, listId);
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                if (response.ok) {
                    response.json().then((data: any) => {
                        if (data.ServerRelativePath) {
                            resolve(data.ServerRelativePath.DecodedUrl)
                        }
                        else {
                            reject("");
                        }

                    })
                        .catch((error) => { reject(error); });
                }
                else {
                    reject(response);
                }
            })
                .catch((error) => { reject(error); });
        });
    }




    /**************************************************************************************************
     * Returns the available fields for the specified list id
     * @param webUrl : The web URL from which the specified list is located
     * @param listId : The id of the list from which to load the fields
     * @param selectProperties : Optionnaly, the select properties to narrow down the query size
     * @param orderBy : Optionnaly, the by which the results needs to be ordered
     **************************************************************************************************/
    public static getListFields(webUrl: string, listId: string, selectProperties?: string[], orderBy?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let selectProps = selectProperties ? selectProperties.join(',') : '';
            let order = orderBy ? orderBy : 'InternalName';
            let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/Fields?$select={2}&$orderby={3}", webUrl, listId, selectProps, order);
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                if (response.ok) {
                    resolve(response.json());
                }
                else {
                    reject(response);
                }
            })
                .catch((error) => { reject(error); });
        });
    }
    public static getListFieldsAsDataStream(siteRelativeUrl: string, listRelativeUrl: string, selectProperties?: string[], orderBy?: string): Promise<any> {

        //clean the slash if we are in the root site
        siteRelativeUrl = siteRelativeUrl === '/' ? '' : siteRelativeUrl;
        siteRelativeUrl = endsWith(siteRelativeUrl, "/") ? siteRelativeUrl : siteRelativeUrl + '/';

        return new Promise<any>((resolve, reject) => {
            let endpoint = `${siteRelativeUrl}_api/web/getlist('${siteRelativeUrl}${listRelativeUrl}')/RenderListDataAsStream`;

            const data = {
                parameters: {
                    ViewXml: '<View><ViewFields><FieldRef Name="ID"/></ViewFields></View>',
                    RenderOptions: 64,
                    DatesInUtc: true,
                    ReplaceGroup: true
                }
            };

            let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };

            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
                .then((postResponse: SPHttpClientResponse) => {
                    return postResponse.json();
                })
                .then((data) => {
                    const form = data.ClientForms.Edit;
                    resolve(form[Object.keys(form)[0]]);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }

}

export default SharePointService;

export interface IListTitle {
    id: string;
    title: string;
}
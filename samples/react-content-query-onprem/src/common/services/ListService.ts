import { Text }                                                 	from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

export class ListService {

	/***************************************************************************
     * The spHttpClient object used for performing REST calls to SharePoint
     ***************************************************************************/
    private spHttpClient: SPHttpClient;


	/**************************************************************************************************
     * Constructor
     * @param httpClient : The spHttpClient required to perform REST calls against SharePoint
     **************************************************************************************************/
    constructor(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }


	/**************************************************************************************************
	 * Performs a CAML query against the specified list and returns the resulting items
	 * @param webUrl : The url of the web which contains the specified list
	 * @param listId : The id of the list which contains the elements to query
	 * @param camlQuery : The CAML query to perform on the specified list
	 **************************************************************************************************/
	public getListItemsByQuery(webUrl: string, listId: string, camlQuery: string): Promise<any> {
		return new Promise<any>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/GetItems?$expand=FieldValuesAsText,FieldValuesAsHtml", webUrl, listId);
			let data:any = { 
				query : { 
					__metadata: { type: "SP.CamlQuery" }, 
					ViewXml: camlQuery
				}
			};
			let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };

			this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
				.then((postResponse: SPHttpClientResponse) => {
					if(postResponse.ok) {
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
	public getListTitlesFromWeb(webUrl: string): Promise<IListTitle[]> {
		return new Promise<IListTitle[]>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/web/lists?$select=Id,Title&$filter=(IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)", webUrl);
			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					response.json().then((data: any) => {
						let listTitles:IListTitle[] = data.value.map((list) => { return { id: list.Id, title: list.Title }; });
						resolve(listTitles.sort((a,b) => { return Number(a.title > b.title); }));
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
	public getListFields(webUrl: string, listId: string, selectProperties?: string[], orderBy?: string): Promise<any> {
		return new Promise<any>((resolve,reject) => {
			let selectProps = selectProperties ? selectProperties.join(',') : '';
			let order = orderBy ? orderBy : 'InternalName';
			let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/Fields?$select={2}&$orderby={3}", webUrl, listId, selectProps, order);
			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					resolve(response.json());
				}
				else {
					reject(response);
				}
			})
			.catch((error) => { reject(error); }); 
        });
	}

}


export interface IListTitle {
	id: string;
	title: string;
}
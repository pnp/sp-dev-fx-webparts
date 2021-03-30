import { Text }                                                 	from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

export class PeoplePickerService {

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
	 * @param webUrl : The url of the current web
	 * @param query : The query on which the user suggestions must be based on
	 * @param principalSource : The source to search (15=All, 4=Membership Provider, 8=Role Provider, 1=User Info List, 2=Windows)
	 * @param principalType : The type of entities returned (15=All, 2=Distribution Lists, 4=Security Groups,8=SharePoint Groups, 1=Users)
	 * @param maximumEntitySuggestion : Limit the amount of returned results
	 **************************************************************************************************/
	public getUserSuggestions(webUrl: string, query: string, principalSource: number, principalType: number, maximumEntitySuggestion?: number): Promise<any> {
		return new Promise<any>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser", webUrl);
			let data:any = {
                queryParams:{
                    __metadata:{
                        'type':'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                    },
					QueryString: query,
                    PrincipalSource: principalSource,
					PrincipalType: principalType,
					MaximumEntitySuggestions: maximumEntitySuggestion || 50
                }
            };
			let options: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };

			this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
				.then((response: SPHttpClientResponse) => {
					if(response.ok) {
						resolve(response.json());
					}
					else {
						reject(response.statusText);
					}
				})
				.catch((error) => {
					reject(error);
				}
			); 
        });
	}

}
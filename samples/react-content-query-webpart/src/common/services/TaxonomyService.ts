import { Text } 								from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } 	from '@microsoft/sp-http';
import { isEmpty }                              from '@microsoft/sp-lodash-subset';

export class TaxonomyService {

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
	 * Gets the taxonomy terms associated with the specified taxonomy field's termset
	 * @param webUrl : The url of the web which contains the specified list
	 * @param listId : The id of the list which contains the specified taxonomy field
	 * @param fieldInternalName : The internal name of the taxonomy field on which to extract the termset
	 **************************************************************************************************/
	public getSiteTaxonomyTermsByTermSet(webUrl: string, listId: string, fieldInternalName: string, lcid?: number): Promise<any> {
		return new Promise<any>((resolve,reject) => {
			
			// Gets the termset ID associated with the list field
			this.getListFieldTermSetId(webUrl, listId, fieldInternalName).then((termsetId: string) => {
				
				// Queries the Taxonomy Hidden list to retreive all terms with their wssIds
				let endpoint = Text.format("{0}/_api/web/lists/GetByTitle('TaxonomyHiddenList')/Items?$select=Term{1},ID&$filter=IdForTermSet eq '{2}'", webUrl, (lcid ? lcid : 1033), termsetId);
				this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
					if(response.ok) {
						resolve(response.json());
					}
					else {
						reject(response);
					}
				})
				.catch((error) => { reject(error); }); 
			})
			.catch((error) => { reject(error); });

        });
	}


	/**************************************************************************************************
	 * Gets the termset id out of the specified taxonomy field
	 * @param webUrl : The url of the web which contains the specified list
	 * @param listId : The id of the list which contains the sepcified field
	 * @param fieldInternalName : The internal name of the field on which to extract its termset id
	 **************************************************************************************************/
	public getListFieldTermSetId(webUrl: string, listId: string, fieldInternalName: string): Promise<string> {
		return new Promise<string>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/Fields?$select=IsTermSetValid,TermSetId&$filter=InternalName eq '{2}'", webUrl, listId, fieldInternalName);
			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					response.json().then((data:any) => {
						let fields:any[] = data.value;
						let fieldTermSetId = null;

						if(fields.length > 0) {
							let field = fields[0];

							if(field.IsTermSetValid && !isEmpty(field.TermSetId)) {
								fieldTermSetId = field.TermSetId;
							}
						}
						resolve(fieldTermSetId);
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

}
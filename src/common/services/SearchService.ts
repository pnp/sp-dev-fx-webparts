import { Text } 								from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } 	from '@microsoft/sp-http';

export class SearchService {

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
	 * Returns the web urls starting with the specified domain to which the current user has access
	 * @param domainUrl : The url of the web which contains the specified list
	 **************************************************************************************************/
	public getWebUrlsForDomain(domainUrl: string): Promise<string[]> {
		return new Promise<string[]>((resolve,reject) => {
			let endpoint = Text.format("{0}/_api/search/query?querytext='Path:{0}/* AND (contentclass:STS_Site OR contentclass:STS_Web)'&selectproperties='Path'&trimduplicates=false", domainUrl);

			// Gets the available webs for the current domain with a search query
			this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
				if(response.ok) {
					response.json().then((data:any) => {
						try {
							let urls:string[] = [];
							let pathIndex = null;

							for(let result of  data.PrimaryQueryResult.RelevantResults.Table.Rows) {
								// Stores the index of the "Path" cell on the first loop in order to avoid finding the cell on every loop
								if(!pathIndex) {
									let pathCell = result.Cells.filter((cell) => { return cell.Key == "Path"; })[0];
									pathIndex = result.Cells.indexOf(pathCell);
								}
								urls.push(result.Cells[pathIndex].Value);
							}
							resolve(urls);
						}
						catch(error) {
							reject(error);
						}
					})
					.catch((error) => { reject(error); });
				}
				else {
					reject(response.statusText);
				}
			})
			.catch((error) => { reject(error); }); 
        });
	}

}
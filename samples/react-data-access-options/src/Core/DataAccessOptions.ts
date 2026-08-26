import { ISPHttpClientOptions, MSGraphClientFactory, MSGraphClientV3, SPHttpClient } from '@microsoft/sp-http';
import { spfi } from '@pnp/sp';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class DataAccessOptions {
    private readonly absoluteURL: string;
    private readonly SITEID: string = "";
    private readonly SOURCELIBRARY: string = ""; // default value - Documents
    private readonly SOURCELIBRARYID: string = "";
    private readonly graphClientPromise: Promise<MSGraphClientV3>;
    private readonly spHTTPClient: SPHttpClient;
  
    constructor(msGraphClientFactory: MSGraphClientFactory, spHttpClient: SPHttpClient, absoluteURL: string) {
      this.absoluteURL = absoluteURL;
      this.graphClientPromise = msGraphClientFactory.getClient('3');
      this.spHTTPClient = spHttpClient;
    }

    /* Use FETCH API */
    public async GetWithFetch(): Promise<any[]> {
        const listUrl = `${this.absoluteURL}/_api/web/lists/getbytitle('${this.SOURCELIBRARY}')/items?$select=id&$top=1`;      
        const response = await fetch(listUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies for authentication
        });
        const data = await response.json();
        return data; 
    }

    /* Use SPHttpClient API */
    public async GetWithSPHttpClient(): Promise<any[]> {
        const listUrl = `${this.absoluteURL}/_api/web/lists/getbytitle('${this.SOURCELIBRARY}')/items?$select=id&$top=1`;
        const options: ISPHttpClientOptions = {
            headers: {
                'odata-version':'3.0',
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json'          
            }               
        };
        const response = await this.spHTTPClient.get(
            listUrl,
            SPHttpClient.configurations.v1,
            options
        );
        const data = await response.json();
        return data; 
    }    

    /* Use Graph API */
    public async GetWithGraphClient(): Promise<any[]> {
        const client = await this.graphClientPromise;
        const listUrl = `/sites/${this.SITEID}/lists/${this.SOURCELIBRARYID}/items`;
        
        const response = await client
        .api(listUrl)
        .version('v1.0')
        .select('id,lastModifiedDateTime,createdDateTime')
        .top(1)
        .get();
        return response.value; 
    }  

    /* Use PnPjs */
    public async GetWithPnPjs(context: WebPartContext): Promise<any[]> {
        const sp = spfi().using(SPFx(context));
        const items = await sp.web.lists.getByTitle(this.SOURCELIBRARY).items.select('Id').top(1)();
        return items;
    }
}
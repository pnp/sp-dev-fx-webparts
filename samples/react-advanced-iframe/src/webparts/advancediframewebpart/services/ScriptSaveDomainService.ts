import { Log, ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import { PageContext } from "@microsoft/sp-page-context";

const LOG_SOURCE: string = "'advanced-iframe-webpart:ScriptSaveDomainService";

/**
 * A service that tells us if a given domain is save to display in an IFrame
 */
export interface IScriptSaveDomainService {
    /**
    * Returns true if the given url is a safe url
    * @param url 
    * @returns 
    */
    isInSaveDomain: (url: string) => Promise<boolean>;
}


/**
 * A service that tells us if a given domain is save to display in an IFrame
 */
export class ScriptSaveDomainService implements IScriptSaveDomainService {

    /**
     * Stores the downloaded script save domains
     */
    private _scriptSaveDomains: string[] = null;
    /**
     * The pnpjs spfi object
     */
    private _spfi: SPFI;

    //Create a ServiceKey which will be used to consume the service.
    public static readonly serviceKey: ServiceKey<IScriptSaveDomainService> =
        ServiceKey.create<IScriptSaveDomainService>(LOG_SOURCE, ScriptSaveDomainService);

    /**
     * Constructor 
     * @param serviceScope the servicescipe
     */
    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            Log.info(LOG_SOURCE, "Begin constructing ScriptSaveDomainService");
            const pageContext = serviceScope.consume(PageContext.serviceKey);
            this._spfi = spfi().using(spSPFx({ pageContext }));
            Log.info(LOG_SOURCE, "Constructed ScriptSaveDomainService");
        });
    }

    /**
     * Fetches an array of all script save domains
     * @returns 
     */
    private async fetchScriptSaveDomains() {

        // If we don't have already downloaded the domains
        if (this._scriptSaveDomains == null) {
            Log.info(LOG_SOURCE, "Downloading Property Bag");
            // get the Script Save Domains from the site's property bag
            const props = await this._spfi.web.allProperties();
            //parse and split them  into an array
            this._scriptSaveDomains = `${props["OData__x005f__x005f_ScriptSafeDomains"]}`
                .split(";")
                .filter((d: string) => d != null && d.length > 0)
                ;
            // Always allow IFrames from the current domain
            this._scriptSaveDomains.push(window.location.host);
            Log.info(LOG_SOURCE, "Created script safe domains array");
        }

        return this._scriptSaveDomains;

    }

    /**
     * Returns true if the given url is a safe url
     * @param url 
     * @returns 
     */
    public async isInSaveDomain(url: string) {
        const result = (await this.fetchScriptSaveDomains()).reduce((value, domain) => {
            if (url.indexOf(domain) != -1) {
                return true;
            }
            return value;
        }, false)
        Log.info(LOG_SOURCE, `Domain ${url} is a save domain? ${result}`);
        return result;
    }
}


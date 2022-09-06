import "@pnp/sp/search";
import "@pnp/sp/webs";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { RequestDigest, spfi, SPFI, SPFx } from "@pnp/sp";
import { ISearchQuery } from "@pnp/sp/search";
import { Web } from "@pnp/sp/webs";
import { CacheBust } from "./CacheBust";
import { ISite } from "../interfaces";

export interface ISitesService {
    get: (url: string) => Promise<ISite>;
    search: (searchTerm: string, resultSourceId?: string) => Promise<ISite[]>;
}

export class SitesService implements ISitesService {

    public static readonly serviceKey: ServiceKey<ISitesService> =
        ServiceKey.create<ISitesService>('SPFx:SitesService', SitesService);

    private _sp: SPFI;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            const pageContext = serviceScope.consume(PageContext.serviceKey);

            /* 
             * About RequestDigest():
             * Include RequestDigest() to ensure a correct X-RequestDigest header value is present. 
             * This is necessary because of a bug in SPFx, where an old pageContext can be consumed after refreshing the page.
             * 
             * About CacheBust():
             * This ensures that every call has a unique URL, to override browser caching.
             */
            this._sp = spfi().using(RequestDigest(), SPFx({ pageContext }), CacheBust());
        });
    }

    public async get(url: string): Promise<ISite> {
        const web = Web([this._sp.web, url]);

        const webInfo = await web.select("Title")();

        return {
            title: webInfo.Title,
            url: url
        }
    }

    public async search(searchTerm: string, resultSourceId?: string): Promise<ISite[]> {
        const searchQuery = {
            Querytext: `"${searchTerm}*" contentclass:STS_Site`,
            RowLimit: 500,
            SourceId: resultSourceId,
            TrimDuplicates: false,
            SelectProperties: ["Title", "Path"]
        } as ISearchQuery;

        const results = await this._sp.search(searchQuery);

        return results.PrimarySearchResults.map(r => { return { title: r.Title, url: r.Path } as ISite; });
    }
}
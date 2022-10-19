import "@pnp/sp/lists";
import "@pnp/sp/search";
import "@pnp/sp/webs";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { RequestDigest, spfi, SPFI, SPFx } from "@pnp/sp";
import { ISearchQuery, SortDirection } from "@pnp/sp/search";
import { Web } from "@pnp/sp/webs";
import { startsWith } from "lodash";
import { BaseType } from "../enums";
import { CacheBust } from "./CacheBust";
import { IList, IListSearchResult } from "../interfaces";

export interface IListsService {
    get: (siteUrl: string) => Promise<IList[]>;
    search: (baseType: BaseType, searchTerm?: string, resultSourceId?: string) => Promise<IList[]>;
}

export class ListsService implements IListsService {

    public static readonly serviceKey: ServiceKey<IListsService> =
        ServiceKey.create<IListsService>('SPFx:ListsService', ListsService);

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

    public async get(siteUrl: string): Promise<IList[]> {

        const web = Web([this._sp.web, siteUrl])

        const filterConditions = [
            "IsApplicationList eq false", // Don't get application lists
            "Hidden eq false", // Don't get hidden lists
            "BaseTemplate le 101", // Only get libraries and lists based on the regular templates
            "EntityTypeName ne 'Style_x0020_Library'", // Exclude the Style library
            "EntityTypeName ne 'FormServerTemplates'" // Exclude the Form Templates library
        ];

        const lists = await web.lists.expand("RootFolder").select("Id", "Title", "BaseType", "RootFolder/ServerRelativeUrl").filter(filterConditions.join(" and "))();

        return lists
            .filter(l => l.BaseType === 1 || l.BaseType === 0)
            .map(l => { return { title: l.Title, id: l.Id, type: l.BaseType as BaseType, siteUrl, listUrl: l.RootFolder.ServerRelativeUrl } as IList; });
    }

    public async search(baseType: BaseType, searchTerm?: string, resultSourceId?: string): Promise<IList[]> {

        const queryConditions = [
            `ContentClass:${baseType === BaseType.DocumentLibrary ? 'STS_List_DocumentLibrary' : 'STS_List_GenericList'}`,            
            `-ListUrl:FormServerTemplates`,
            `-ListUrl:/SiteAssets/`,
            `-ListUrl:"Style Library"`,
            `-ListUrl:"SitePages"`
        ];

        if (searchTerm) {
            queryConditions.push(`${searchTerm}*`);
        }

        const searchQuery = {
            Querytext: queryConditions.join(' '),
            RowLimit: 500,
            SourceId: resultSourceId && resultSourceId !== "" ? resultSourceId : undefined,
            TrimDuplicates: false,
            EnableSorting: true,
            SortList: [{ Property: 'SPSiteURL', Direction: SortDirection.Ascending }],
            SelectProperties: ["ListId", "Title", "ListUrl", "SPSiteURL", "SiteId", "SiteTitle", "BaseType"]
        } as ISearchQuery;

        const results = await this._sp.search(searchQuery);

        const mappedResults: IList[] = [];

        results.PrimarySearchResults.forEach(r => {
            const result = r as IListSearchResult;
            
            // Some libraries have the same listId across site collections, therefore we combine siteId and listid for a uniqueId
            const uniqueKey = result.SiteId + "_" + result.ListId;            

            if (mappedResults.every(r => r.uniqueKey !== uniqueKey)) {
                mappedResults.push({
                    id: result.ListId,
                    uniqueKey: uniqueKey,
                    title: startsWith(result.Title, `${result.SiteTitle} - `, 0) ? result.Title : `${result.SiteTitle} - ${result.Title}`,
                    type: this._getTypeFromString(result.BaseType),
                    listUrl: result.ListUrl,
                    siteUrl: result.SPSiteURL,
                    siteTitle: result.SiteTitle
                } as IList);
            }
        });

        return mappedResults.sort((a, b) => {
            if (a.siteUrl < b.siteUrl) { return -1; } else if (a.siteUrl > b.siteUrl) { return 1; } else { return 0; }
        });
    }

    private _getTypeFromString(baseTypeString: string): BaseType {
        switch (baseTypeString) {
            case "GenericList":
                return BaseType.GenericList;
            case "DocumentLibrary":
                return BaseType.DocumentLibrary;
        }
    }
}
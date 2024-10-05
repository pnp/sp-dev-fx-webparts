import { WebPartContext } from "@microsoft/sp-webpart-base";

import { getGraph } from "../webparts/treeOrgChart/components/pnpjsConfig";
import { ISPFXContext, spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";

import { Caching } from "@pnp/queryable";

export interface IGraphUser {
    mail?: string;
    displayName?: string;
    jobTitle?: string;
    userPrincipalName?: string;
}

const graphUserSelect: string[] = ['displayName', 'mail', 'jobTitle', 'userPrincipalName'];

export default class GraphService {

    private graph: GraphFI;

    constructor(private context: WebPartContext) {
       this.graph=getGraph(this.context);
    }

    public async getUser(upn: string): Promise<IGraphUser> {
        const graphCache = graphSPFx(this.context).using(Caching({ store: "session"}));
        return await graphCache.get().users.getById(upn).select(...graphUserSelect).get() as IGraphUser;;
    }

    public async getUserManger(upn: string): Promise<IGraphUser> {
        const graphCache = graphSPFx(this.context).using(Caching({ store: "session"}));
        
        return await graphCache.get().users.getById(upn).manager.select(...graphUserSelect).get() as IGraphUser;
    }
    public async getUserDirectReports(upn: string, excludefilter?: boolean, filter?: string) {

        /*
        odata filter 
         "code": "Request_UnsupportedQuery",
        "message": "The specified filter to the reference property query is currently not supported.",
        */
        const graphCache = graphSPFx(this.context).using();
        graphCache.get().users.getById(upn).directReports.select(...graphUserSelect).get() as IGraphUser[];
        const directReports = await graphCache.get().users.getById(upn).directReports.select(...graphUserSelect).get() as IGraphUser[];
        if (filter && filter.length > 0) {
            if (excludefilter) {
                return directReports.filter((user) => 
                    user.userPrincipalName?.toLowerCase().indexOf(filter.toLowerCase()) === -1
                );

            } else {
                return directReports.filter((user) => 
                    user.userPrincipalName?.toLowerCase().indexOf(filter.toLowerCase()) !== -1
                );

            }

        }
        return directReports;

    }

}



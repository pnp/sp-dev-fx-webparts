import { WebPartContext } from "@microsoft/sp-webpart-base";

import { getGraph } from "../webparts/treeOrgChart/components/pnpjsConfig";

import { graphfi, GraphFI } from "@pnp/graph";

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
        this.graph = getGraph(this.context);
    }

    public async getUser(upn: string): Promise<IGraphUser> {
        const graphCache = graphfi(this.graph).using(Caching({ store: "session" }));
        return await graphCache.users.getById(upn).select(...graphUserSelect)() as IGraphUser;
    }

    public async getUserManger(upn: string): Promise<IGraphUser> {
        const graphCache = graphfi(this.graph).using(Caching({ store: "session" }));

        return await graphCache.users.getById(upn).manager.select(...graphUserSelect) as IGraphUser;
    }
    public async getUserDirectReports(upn: string, excludefilter?: boolean, filter?: string): Promise<IGraphUser[]> {

         const graphCache = graphfi(this.graph).using(Caching({ store: "session" }));
        const directReports = await graphCache.users.getById(upn).directReports.select(...graphUserSelect)();
       if (filter && filter.length > 0) {
            if (excludefilter) {
                   return directReports.filter((person) => 
                        
                        person.userPrincipalName?.toLowerCase().indexOf(filter.toLowerCase()) === -1
                    ) as IGraphUser[]; 

            } else {
             return directReports.filter((user) => 
                      user.userPrincipalName?.toLowerCase().indexOf(filter.toLowerCase()) !== -1
                  )as IGraphUser[];
  
            }
        }
        return directReports as IGraphUser[];
    }
}



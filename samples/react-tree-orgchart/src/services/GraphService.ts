import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";

export interface IGraphUser {
    mail?: string;
    displayName?: string;
    jobTitle?: string;
    userPrincipalName?: string;
}

const graphUserSelect: string[] = ['displayName', 'mail', 'jobTitle', 'userPrincipalName'];

export default class GraphService {


    constructor(private context: WebPartContext) {
        graph.setup({
            spfxContext: this.context
        });
    }

    public async getUser(upn: string): Promise<IGraphUser> {

        return await graph.users.getById(upn).select(...graphUserSelect).get() as IGraphUser;
    }

    public async getUserManger(upn: string): Promise<IGraphUser> {

        return await graph.users.getById(upn).manager.select(...graphUserSelect).get() as IGraphUser;
    }
    public async getUserDirectReports(upn: string, excludefilter?: boolean, filter?: string) {

        /*
        odata filter 
         "code": "Request_UnsupportedQuery",
        "message": "The specified filter to the reference property query is currently not supported.",
        */
        const directReports = await graph.users.getById(upn).directReports.select(...graphUserSelect).get() as IGraphUser[];
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


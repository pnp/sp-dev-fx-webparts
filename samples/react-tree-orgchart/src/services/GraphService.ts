import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";

export interface IGraphUser {
    mail?: string;
    displayName?: string;
    jobTitle?: string;
    userPrincipalName?:string;
}

const graphUserSelect: string[] = ['displayName', 'mail', 'jobTitle','userPrincipalName'];

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
    public async getUserDirectReports(upn: string) {

        return await graph.users.getById(upn).directReports.select(...graphUserSelect).get() as IGraphUser[];
    }

}


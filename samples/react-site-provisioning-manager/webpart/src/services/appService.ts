import { AadHttpClient, IHttpClientOptions, HttpClientResponse } from "@microsoft/sp-http";
import httpHeaders from "./headers";
import { graph } from "@pnp/graph";
import { sp } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class AppService {
    private ADMIN_ROLETEMPLATE_ID = "62e90394-69f5-4237-9190-012177145e10"; // Global Admin TemplateRoleId
    
    private requestOptions: IHttpClientOptions = {
        headers: httpHeaders,
    };

    constructor(private spfxContext: WebPartContext, 
                private httpClient: AadHttpClient,
                private getProvisioningTemplateUrl,
                private applyProvisioningTemplateUrl) {
        // Setuo Context to PnPjs and MSGraph
        sp.setup({
            spfxContext: this.spfxContext
        });

        graph.setup({
            spfxContext: this.spfxContext
        });

    }
    // Check if user is Global Admin
    public async checkUserIsGlobalAdmin(): Promise<boolean> {
        return graph.me.memberOf.get().then(roles =>{
            for (const myDirRolesAndGroup of roles) {
                if (myDirRolesAndGroup.id && myDirRolesAndGroup.id === this.ADMIN_ROLETEMPLATE_ID) { // roleTemplateId for glabal Admin
                    return true;
                }
            }
            return false;

        }).catch( e => {return false;});
    }

    /**
    * Check if the current user is a site admin
    */
    public async IsSiteOwner(): Promise<boolean> {
        return sp.web.currentUser.get().then(user => {
            return user.IsSiteAdmin;
        }).catch((error: any) => {
            return false;
        });
    }

    public async GetProvisioningTemplate(url: string, handlers: string): Promise<HttpClientResponse> {
        this.requestOptions.body = `{ WebUrl: '${url}', Handlers: '${handlers}' }`;
        return this.httpClient.post(
            this.getProvisioningTemplateUrl,
            AadHttpClient.configurations.v1,
            this.requestOptions,
        );
    }

    public async ApplyProvisioningTemplate(url: string, template: string): Promise<HttpClientResponse> {
        this.requestOptions.body = `{ WebUrl: '${url}', Template: '${template}' }`;
        return this.httpClient.post(
            this.applyProvisioningTemplateUrl,
            AadHttpClient.configurations.v1,
            this.requestOptions,
        );
    }


}
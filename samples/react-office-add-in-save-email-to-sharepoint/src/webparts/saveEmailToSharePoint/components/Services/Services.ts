import { sp } from '../SPPreset';
import { Web } from '@pnp/sp/webs';
import { SearchResults } from '@pnp/sp/search';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClient } from "@microsoft/sp-http";

export default class Services {
    public async getSiteNames(): Promise<SearchResults> {
        const allSiteResults: SearchResults = await sp.search({
            Querytext: "contentclass:STS_Site contentclass:STS_Web",
            EnableInterleaving: true,
            RowLimit: 100
        });
        return allSiteResults;
    }
    public getRootSiteURL(): Promise<string> {
        return sp.web.get().then((data) => {
            return data.ResourcePath.DecodedUrl;
        });
    }
    public saveFileToSP(SiteURL: string, serverRelativeURL: string, filename: string, file): Promise<any> {
        let web = Web(SiteURL);
        return web.getFolderByServerRelativeUrl(serverRelativeURL).files.add(filename, file, true).then((result) => {
            return result;
        });
    }
    public getEmailContent(context: WebPartContext, id: string): Promise<any> {
        return context.msGraphClientFactory.getClient().then((client: MSGraphClient): Promise< void> => {
            return client.api('/me/messages/' + id + '/$value').version('v1.0').responseType('blob').get().then((response: any) => {
                return response;
            });
        });
    }
    public getAllDocumentLibary(absoluteURL: string): Promise<any[]> {
        return sp.site.getDocumentLibraries(absoluteURL).then((libraries: any[]) => {
            return libraries;
        });

    }
}
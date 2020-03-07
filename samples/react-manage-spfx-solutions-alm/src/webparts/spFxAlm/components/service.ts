import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

export default class HttpService {
    private static spHttpClient: SPHttpClient;
    public static Init(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }

    public static async Get(url: string): Promise<any> {
        var response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
        return await response.json();
    }

    public static async GetTenantAppcatalogUrl(url): Promise<any> {
        let requestUrl = url.concat("/_api/SP_TenantSettings_Current");
        const response: SPHttpClientResponse = await this.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
        return await response.json();
    }

    public static async GetAllSites(url, rootSiteUrl): Promise<any> {
        let requestUrl = url.concat("/_api/search/query?querytext='contentclass:sts_site path:" + rootSiteUrl + "/sites/*'&selectproperties='SiteId,Path,Title'&trimduplicates=true&rowlimit=5000");
        const response: SPHttpClientResponse = await this.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
        return await response.json();
    }

    public static async GetApps(url: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps");
        const response: SPHttpClientResponse = await this.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
        return await response.json();
    }


    public static async RetractApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Retract")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Retract");
        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();
    }

    public static async DeployApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Deploy")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Deploy");
        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();
    }



    public static async InstallApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Install")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Install");
        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();
    }


    public static async UpgradeApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Upgrade")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Upgrade");

        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();

    }

    public static async UninstallApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Uninstall")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Uninstall");

        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();

    }

    public static async AddanApp(file: File[], url: string, isSiteAppCatalog: boolean): Promise<any> {
        const spOpts: ISPHttpClientOptions = {
            body: new Blob(file)
        };

        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/Add(overwrite=true, url='" + file[0]["name"] + "')") : url.concat("/_api/web/tenantappcatalog/Add(overwrite=true, url='" + file[0]["name"] + "')");
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();
    }


    public static async RemoveApp(url: string, appid: string, isSiteAppCatalog: boolean): Promise<any> {
        const requestUrl = isSiteAppCatalog ? url.concat("/_api/web/sitecollectionappcatalog/AvailableApps/GetById('" + appid + "')/Remove")
            : url.concat("/_api/web/tenantappcatalog/AvailableApps/GetById('" + appid + "')/Remove");
        const spOpts: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        };
        const response: SPHttpClientResponse = await this.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
        return await response.json();

    }
}
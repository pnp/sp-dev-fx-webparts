import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClientV3, AadHttpClientFactory, AadHttpClient, HttpClient, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IListItem } from '../models/IListItem';
import { IDataFetcherService } from './IDataFetcherService'

export class DataFetcherService implements IDataFetcherService {

    public static readonly serviceKey: ServiceKey<IDataFetcherService> = ServiceKey.create<IDataFetcherService>('mpd:IDataFetcherService', DataFetcherService);
    private static _appDataFolderName: string = 'Personal Dashboard';
    private static _appDataFileName: string = 'selected-widgets.json';
    private _msGraphClientFactory: MSGraphClientFactory;
    private _aadHttpClientFactory: AadHttpClientFactory;
    private _httpClient: HttpClient;
    private _spHttpClient: SPHttpClient;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
            this._aadHttpClientFactory = serviceScope.consume(AadHttpClientFactory.serviceKey);
            this._httpClient = serviceScope.consume(HttpClient.serviceKey);
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _getAppDataFolder(): Promise<any> {

        const client: MSGraphClientV3 = await this._msGraphClientFactory.getClient('3');
        let appDataFolder = await client
            .api(`/me/drive/special/approot/children?$filter=name eq '${DataFetcherService._appDataFolderName}'`)
            .get();

        if (appDataFolder.value.length === 0) {
            appDataFolder = await client
                .api(`/me/drive/special/approot/children`)
                .post({
                    name: DataFetcherService._appDataFolderName,
                    folder: {},
                    '@microsoft.graph.conflictBehavior': 'fail'
                });
        }
        return appDataFolder;

    }

    public async getMySelectedWidgets(): Promise<string | undefined> {
        try {
            const appDataFolder = await this._getAppDataFolder();
            if (appDataFolder && appDataFolder.value && appDataFolder.value.length > 0) {
                const client: MSGraphClientV3 = await this._msGraphClientFactory.getClient('3');
                const appDataFiles = await client
                    .api(`/me/drive/special/approot:/${appDataFolder.value[0].name}:/children?$filter=name eq '${DataFetcherService._appDataFileName}'`)
                    .version('v1.0')
                    .get();

                if (appDataFiles.value.length > 0) {
                    const downloadUrl = appDataFiles.value[0]['@microsoft.graph.downloadUrl'];
                    const response = await this._httpClient.get(downloadUrl, HttpClient.configurations.v1);
                    const selectedWidgets = await response.json();
                    return selectedWidgets;
                }
            }

            return undefined;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async setMySelectedWidgets(ids: string[]): Promise<void> {
        try {
            const appFolder = await this._getAppDataFolder();
            if (appFolder.value.length > 0) {
                const client: MSGraphClientV3 = await this._msGraphClientFactory.getClient('3');
                await client
                    .api(`/me/drive/items/${appFolder.value[0].id}:/${DataFetcherService._appDataFileName}:/content`)
                    .version("v1.0")
                    .put(JSON.stringify(ids.join(',')));
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getOrgWidgets(baseUrl: string): Promise<IListItem[]> {
        const widgets: IListItem[] = [];
        try {
            const tenantAppCatalogUrl = await this._getTenantAppcatalogUrl(baseUrl);
            const response: SPHttpClientResponse = await this._spHttpClient.get(
                tenantAppCatalogUrl +
                `/_api/web/lists/GetByTitle('Dashobard Widgets')/Items?$select=Id,SC_WidgetTitle,SC_IconName,SC_AADClientId,SC_DisplayTemplate,SC_ErrorTemplate,SC_ResourceEndpoint,SC_HelpURL,SC_ViewDetails`,
                SPHttpClient.configurations.v1
            );

            if (response.ok) {
                const data = await response.json();
                data.value.forEach((item) => {
                    widgets.push({
                        id: item.Id,
                        title: item.SC_WidgetTitle,
                        icon: item.SC_IconName,
                        clientId: item.SC_AADClientId,
                        display: item.SC_DisplayTemplate,
                        error: item.SC_ErrorTemplate,
                        api: item.SC_ResourceEndpoint,
                        selected: false,
                        help: item.SC_HelpURL,
                        details: item.SC_ViewDetails
                    });
                });
            } else {
                throw new Error(`Failed to fetch org widgets. Status: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        return widgets;
    }

    private async _getTenantAppcatalogUrl(url): Promise<string> {
        const requestUrl = url.concat("/_api/SP_TenantSettings_Current");
        const result: SPHttpClientResponse = await this._spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
        const response = await result.json();
        return response?.CorporateCatalogUrl;
    }

    public async executeMSGraphAPIRequest(api: string): Promise<JSON> {
        try {
            const client: MSGraphClientV3 = await this._msGraphClientFactory.getClient('3');
            const response = await client.api(api).get();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async executeADSecureAPIRequest(api: string, clientId: string): Promise<JSON> {
        try {
            const client = await this._aadHttpClientFactory.getClient(clientId);
            const response = await client.get(api, AadHttpClient.configurations.v1);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async executePublicAPIRequest(api: string): Promise<JSON> {
        try {
            const response = await this._httpClient.get(api, HttpClient.configurations.v1);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
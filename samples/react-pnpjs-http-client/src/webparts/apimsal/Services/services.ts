import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';

export interface ICustomPartyService {
    getWebDetails(): Promise<JSON>;
}

export class CustomSPService implements ICustomPartyService {

    public static readonly serviceKey: ServiceKey<ICustomPartyService> =
        ServiceKey.create<CustomSPService>('my-custom-app:ICustomSPService', CustomSPService);

    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

            this._pageContext = serviceScope.consume(PageContext.serviceKey);
            this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
    }

    public getWebDetails(): Promise<JSON> {
        return this._spHttpClient.get(`${this._currentWebUrl}/_api/web`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
            return response.json();
        });
    }
}
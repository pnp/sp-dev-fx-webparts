import { IWebPartContext} from "@microsoft/sp-webpart-base";
import { CommunicationServiceConfiguration, Constants, ICommunicationConfigurationService } from "./";

export class CommunicationConfigurationService implements ICommunicationConfigurationService {
    private _currentConfiguration: CommunicationServiceConfiguration;
    private _webPartContext: IWebPartContext;
    public constructor(WebPartContext: IWebPartContext) {
        this._webPartContext = WebPartContext;
    }
    public async getCurrentConfiguration(): Promise<CommunicationServiceConfiguration> {
        if (!this._currentConfiguration) {
            this._currentConfiguration = new CommunicationServiceConfiguration();
            this._currentConfiguration.ClientId = Constants.ApplicationIdKey;
            this._currentConfiguration.RedirectUri =
            `${this._webPartContext.pageContext.web.absoluteUrl}${Constants.ApplicationRedirectUrl}`;
            return this._currentConfiguration;
        } else {
            return Promise.resolve(this._currentConfiguration);
        }
    }
}

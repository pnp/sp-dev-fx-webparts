import { IConfiguration } from './IConfiguration';

/**
 * Webpart production configuration.
 */
export class ProdConfiguration implements IConfiguration {
    public readonly clientId: string = "<YOUR_YAMMER_APP_CLIENT_ID>";
    public readonly redirectUri: string = "<YOUR_YAMMER_APP_REDIRECT_URI>";
}
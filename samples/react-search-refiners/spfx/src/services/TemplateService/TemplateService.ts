import BaseTemplateService from                    './BaseTemplateService';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

class TemplateService extends BaseTemplateService {

    private _spHttpClient: SPHttpClient;

    constructor(spHttpClient: SPHttpClient, locale: string) {

        super();
        this._spHttpClient = spHttpClient;
        this.CurrentLocale = locale;
    }

    /**
     * Gets the external file content from the specified URL
     * @param fileUrl the file URL
     */
    public async getFileContent(fileUrl: string): Promise<string> {

        try {
            const response: SPHttpClientResponse = await this._spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);
            if(response.ok) {
                return await response.text();              
            }
            else {
                throw response.statusText;
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ensures the file is accessible trough the specified URL
     * @param filePath the file URL
     */
    public async ensureFileResolves(fileUrl: string): Promise<void> {

        try {
            const response: SPHttpClientResponse = await this._spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);
            if(response.ok) {

                if(response.url.indexOf('AccessDenied.aspx') > -1){
                    throw 'Access Denied';
                } 
                
                return;
            }
            else {
                throw response.statusText;
            }

        } catch (error) {
            throw error;
        }
    }
}

export default TemplateService;
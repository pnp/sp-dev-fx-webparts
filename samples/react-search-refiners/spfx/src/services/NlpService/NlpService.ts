import { HttpClient } from "@microsoft/sp-http";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { ConsoleListener, LogLevel, Logger } from '@pnp/logging';
import INlpService from "./INlpService";
import { INlpResponse } from "../../models/INlpResponse";
import INlpRequest from "../../models/INlpRequest";

class NlpService implements INlpService {

    private _serviceUrl: string;
    private _spfxContext: IWebPartContext;

    constructor(context: IWebPartContext, serviceUrl: string) {
        this._serviceUrl = serviceUrl;
        this._spfxContext = context;

        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);
    }

    /**
     * Interprets the user search query intents and return the optimized SharePoint query counterpart
     * @param rawQuery the user raw query input
     */
    public async enhanceSearchQuery(rawQuery: string, isStaging: boolean): Promise<INlpResponse> {

        const postData: string = JSON.stringify({
            rawQuery: rawQuery,
            uiLanguage: this._spfxContext.pageContext.cultureInfo.currentUICultureName.split("-")[0],
            isStaging: isStaging
        } as INlpRequest);

        // Make the call to the optimizer service
        const url = this._serviceUrl;

        const requestHeaders = new Headers();
        requestHeaders.append('Accept','application/json;');
        requestHeaders.append('Content-Type','application/json; charset=utf-8');
        requestHeaders.append('Cache-Control','no-cache');

        try {

            const results = await this._spfxContext.httpClient.post(url, HttpClient.configurations.v1, {
                headers: requestHeaders,
                body: postData
            });

            const response: INlpResponse = await results.json();        

            if (results.status === 200) {
                return response;
            } else {
                const error = JSON.stringify(response);
                Logger.write(`[NlpService.enhanceSearchQuery()]: Error: '${error}' for url '${url}'`, LogLevel.Error);
                throw new Error(error);
            }
        } catch (error) {
            const errorMessage = error ? error.message : `Failed to fetch URL '${url}'`;
            Logger.write(`[NlpService.enhanceSearchQuery()]: Error: '${errorMessage}' for url '${url}'`, LogLevel.Error);
            throw new Error(errorMessage);
        }
    }
}

export default NlpService;
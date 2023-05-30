import { AadHttpClient, AadHttpClientFactory } from "@microsoft/sp-http";

export class AzureFunctions {
    private static _aadHttpClient: AadHttpClient;

    public static async Init(aadHttpClientFactory: AadHttpClientFactory, appId: string) {
        this._aadHttpClient = await aadHttpClientFactory.getClient(appId);
    }

    public static async CallAzureFunction(functionName: string, request: any, method: 'get' | 'post' = 'post') {
        try {
            if (!this._aadHttpClient) return;

            let requestHeaders: any = {};
            requestHeaders['Content-Type'] = 'application/json';

            let requestParams = '';
            if (method === 'get' && request) {
                // Add request params to URL query string
                const params = new URLSearchParams(request).toString();
                functionName += `?${params}`;
            } else if (method === 'post') {
                requestParams = JSON.stringify(request);
            }

            const response = await this._aadHttpClient[method](
                functionName,
                AadHttpClient.configurations.v1,
                {
                    headers: requestHeaders,
                    body: requestParams
                });

            console.log("response", response);
            const result = await response.text();
            console.log("Azure function result - ", result);
            return result;
        } catch (error) {
            if (!DEBUG) {
                console.error("Error:", error);
            }
            return undefined;
        }
    }
}
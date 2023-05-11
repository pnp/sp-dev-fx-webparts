import * as React from 'react';
import { AadHttpClient, AadHttpClientFactory } from "@microsoft/sp-http";
import { APP_ID, AZURE_FUNCTION_SUMMARISE, AZURE_FUNCTION_UPDATE_PAGE } from '../constants/constants';

export const useAzureFunctions = (aadHttpClientFactory: AadHttpClientFactory) => {
    const clientRef = React.useRef<AadHttpClient>();

    const getClient = React.useCallback(async () => {
        if (!aadHttpClientFactory) {
            return undefined;
        }
        const client = await aadHttpClientFactory.getClient(APP_ID);
        clientRef.current = client;
    }, [aadHttpClientFactory]);

    const callAzureFunction = React.useCallback(
        async (functionName: string, request: any, method: 'get' | 'post' = 'post') => {
            try {
                if (!clientRef.current) {
                    await getClient();
                }

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

                const response = await (await clientRef.current)[method](
                    functionName,
                    AadHttpClient.configurations.v1,
                    {
                        headers: requestHeaders,
                        body: requestParams
                    }
                );

                console.log('response', response);
                const result = await response.text();
                console.log('Azure function result - ', result);
                return result;
            } catch (error) {
                if (!DEBUG) {
                    console.error('Error:', error);
                }
                return undefined;
            }
        },
        [getClient]
    );

    const getSummaryUsingOpenAI = React.useCallback(
        async (content: string) => {
            return await callAzureFunction(AZURE_FUNCTION_SUMMARISE, { content });
        },
        [callAzureFunction]
    );

    const updatePagePnPPowerShell = React.useCallback(
        async (siteUrl: string, pageItemId: number, columnName: string, columnValue: string) => {
            return await callAzureFunction(AZURE_FUNCTION_UPDATE_PAGE, { siteUrl, pageItemId, columnName, columnValue });
        },
        [callAzureFunction]
    );

    return { getSummaryUsingOpenAI, updatePagePnPPowerShell };
};
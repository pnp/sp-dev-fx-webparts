import * as React from 'react';
import { MSGraphClientV3, MSGraphClientFactory } from '@microsoft/sp-http';

export const useMicrosoftGraph = (msGraphClientFactory: MSGraphClientFactory) => {

    const clientRef = React.useRef<MSGraphClientV3>();

    const getClient = React.useCallback(async (): Promise<any> => {
        if (!msGraphClientFactory) {
            return undefined;
        }
        const client = await msGraphClientFactory.getClient('3');
        clientRef.current = client;

    }, [msGraphClientFactory]);

    const callMicrosoftGraphAPI = React.useCallback(
        async (
            method: "get" | "post" | "patch" | "delete",
            apiUrl: string,
            version: "v1.0" | "beta",
            content?: any,
            selectProperties?: string[],
            expandProperties?: string[],
            filter?: string,
            count?: boolean
        ): Promise<any> => {
            if (!clientRef.current) {
                await getClient();
            }

            const query = clientRef.current.api(apiUrl).version(version);
            typeof content === 'object' && (content = JSON.stringify(content));
            selectProperties && selectProperties.length > 0 && (query.select(selectProperties));
            filter && filter.length > 0 && (query.filter(filter));
            expandProperties && expandProperties.length > 0 && (query.expand(expandProperties));
            count && (query.count(count));

            try {
                return await new Promise((resolve, reject) => {
                    let callback = (error: any, response: any, rawResponse?: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(response);
                        }
                    };

                    if (method === 'post' || method === 'patch') {
                        query[method](content, callback);
                    } else {
                        query[method](callback);
                    }
                });
            } catch (error) {
                console.error(`Error calling Microsoft Graph API: ${error.message}`);
                throw error;
            }
        },
        [getClient]
    );

    return { callMicrosoftGraphAPI };
};

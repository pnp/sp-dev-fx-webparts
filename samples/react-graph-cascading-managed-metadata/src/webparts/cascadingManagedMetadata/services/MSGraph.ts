//* Thank you Mikael Svenson

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { GraphError } from '@microsoft/microsoft-graph-client';
import { MSGraphClient } from '@microsoft/sp-http';

export class MSGraph {
    private static _graphClient: MSGraphClient;
    public static async Init(context: WebPartContext) {
        this._graphClient = await context.msGraphClientFactory.getClient();
    }

    public static async Get(apiUrl: string, version: string = "v1.0", selectProperties?: string[], expandProperties?: string[], filter?: string): Promise<any> {
        var p = new Promise<string>(async (resolve, reject) => {
            let query = this._graphClient.api(apiUrl).version(version);
            if (selectProperties && selectProperties.length > 0) {
                query = query.select(selectProperties);
            }
            if (filter && filter.length > 0) {
                query = query.filter(filter);
            }
            if (expandProperties && expandProperties.length > 0) {
                query = query.expand(expandProperties);
            }

            let callback = (error: GraphError, response: any, rawResponse?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            };
            await query.get(callback);
        });
        return p;
    }

    public static async Patch(apiUrl: string, version: string = "v1.0", content: any): Promise<any> {
        var p = new Promise<string>(async (resolve, reject) => {
            if (typeof (content) === "object") {
                content = JSON.stringify(content);
            }

            let query = this._graphClient.api(apiUrl).version(version);
            let callback = (error: GraphError, _response: any, rawResponse?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            };
            await query.update(content, callback);
        });
        return p;
    }

    public static async Post(apiUrl: string, version: string = "v1.0", content: any): Promise<any> {
        var p = new Promise<string>(async (resolve, reject) => {
            if (typeof (content) === "object") {
                content = JSON.stringify(content);
            }

            let query = this._graphClient.api(apiUrl).version(version);
            let callback = (error: GraphError, response: any, rawResponse?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            };
            await query.post(content, callback);
        });
        return p;
    }

    public static async Delete(apiUrl: string, version: string = "v1.0"): Promise<any> {
        var p = new Promise<string>(async (resolve, reject) => {
            let query = this._graphClient.api(apiUrl).version(version);
            let callback = (error: GraphError, response: any, rawResponse?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            };
            await query.delete(callback);
        });
        return p;
    }
}

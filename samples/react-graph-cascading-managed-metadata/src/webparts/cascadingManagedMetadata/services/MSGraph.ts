//* Helper wrapper for calling Graph
//* based on https://gist.github.com/wobba/37416d3107b85675d896105554b3df28
//* Thank you Mikael Svenson

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { GraphError } from '@microsoft/microsoft-graph-client';
import { MSGraphClient } from '@microsoft/sp-http';

export class MSGraph {
    private static _graphClient: MSGraphClient;

    public static async Init(context: WebPartContext) {
        this._graphClient = await context.msGraphClientFactory.getClient();
    }

    public static async Call(
        method: "get" | "post" | "patch" | "delete",
        apiUrl: string,
        version: "v1.0" | "beta",
        content?: any,
        selectProperties?: string[],
        expandProperties?: string[],
        filter?: string,
        count?: boolean
    ): Promise<any> {
        
        var p = new Promise<string>(async (resolve, reject) => {
            let query = this._graphClient.api(apiUrl).version(version);
            // tslint:disable-next-line: no-unused-expression
            typeof(content) === "object" && (content = JSON.stringify(content));
            // tslint:disable-next-line: no-unused-expression
            selectProperties && selectProperties.length > 0 && (query = query.select(selectProperties));
            // tslint:disable-next-line: no-unused-expression
            filter && filter.length > 0 && (query = query.filter(filter));
            // tslint:disable-next-line: no-unused-expression
            expandProperties && expandProperties.length > 0 && (query = query.expand(expandProperties));
            // tslint:disable-next-line: no-unused-expression
            count && (query = query.count(count));
            let callback = (error: GraphError, response: any, rawResponse?: any) => error ? reject(error) : resolve(response);
            //* ES2016
            ["post", "patch"].includes(method) ? await query[method](content, callback) : await query[method](callback);
        });
        return p;
    }
}
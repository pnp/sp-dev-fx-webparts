import { MSGraphClientV3, MSGraphClientFactory } from '@microsoft/sp-http';

export class MicrosoftGraph {
    private static _graphClient: MSGraphClientV3;

    public static async Init(msGraphClientFactory: MSGraphClientFactory): Promise<void> {
        this._graphClient = await msGraphClientFactory.getClient('3');
    }

    public static async CallMicrosoftGraph (
        method: "get" | "post" | "patch" | "delete",
        apiUrl: string,
        version: "v1.0" | "beta",
        content?: any,
        selectProperties?: string[],
        expandProperties?: string[],
        filter?: string,
        count?: boolean
    ): Promise<any> {
        const p = new Promise<string>(async (resolve, reject) => {
            let query = this._graphClient.api(apiUrl).version(version);
            typeof(content) === "object" && (content = JSON.stringify(content));
            selectProperties && selectProperties.length > 0 && (query = query.select(selectProperties));
            filter && filter.length > 0 && (query = query.filter(filter));
            expandProperties && expandProperties.length > 0 && (query = query.expand(expandProperties));
            count && (query = query.count(count));
            let callback = (error: any, response: any, rawResponse?: any) => error ? reject(error) : resolve(response);
            //* ES2016
            ["post", "patch"].includes(method) ? await query[method](content, callback) : await query[method](callback);
        });
        return p;
    }
}
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import {
    Logger,
    ConsoleListener,
    LogLevel
} from "@pnp/logging";

import { IPODataService } from ".";
import { IPOTask } from "./../interfaces";

export class PODataService implements IPODataService {

    private _webPartContext: IWebPartContext;

    constructor(logLevel: LogLevel, webPartContext: IWebPartContext) {
        // setup logger
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = logLevel;
        // set web part context
        this._webPartContext = webPartContext;
    }

    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }

    public get webPartContext(): IWebPartContext {
        return this._webPartContext;
    }

    public async GetProjectTasks(webUrl: string, projectId: string, selectFields: string[], filter: string, orderBy: string, top: number): Promise<IPOTask[]> {
        return this._getProjectTasks(webUrl, projectId, selectFields, filter, orderBy, top);
    }

    private async _getProjectTasks(webUrl: string, projectId: string, selectFields: string[], filter: string, orderBy: string, top: number): Promise<IPOTask[]> {

        let data: IPOTask[] = [];
        const select = selectFields.join(',');

        try {
            const response: SPHttpClientResponse = await this._webPartContext.spHttpClient.get(webUrl + `/_api/ProjectServer/Projects('${projectId}')/Tasks()?$select=${select}`, SPHttpClient.configurations.v1);
            if (response) {
                const jsonData: any = await response.json();
                if (jsonData.value) {
                    data = jsonData.value;
                }
            }

        } catch (error) {
            Logger.write('Error loading project tasks: ' + error, LogLevel.Error);
        }
        return data;
    }
}

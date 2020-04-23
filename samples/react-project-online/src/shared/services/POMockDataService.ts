import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";

import { IPODataService } from ".";
import { IPOTask } from "./../interfaces";

export class POMockDataService implements IPODataService {

    constructor(logLevel: LogLevel) {

        // setup logger
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = logLevel;
    }

    public async GetProjectTasks(webUrl: string, projectId: string, selectFields: string[], filter: string, orderBy: string, top: number): Promise<IPOTask[]> {
        return this._getListItems(webUrl, projectId, selectFields, filter, orderBy, top);
    }

    private async _getListItems(webUrl: string, projectId: string, selectFields: string[], filter: string, orderBy: string, top: number): Promise<IPOTask[]> {
        return null;
    }
}

import {
    Logger,
    ConsoleListener,
    LogLevel
} from "@pnp/logging";

import { ISPDataService } from ".";

export class SPMockDataService implements ISPDataService {

    constructor(logLevel: LogLevel) {

        // setup logger
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = logLevel;
    }

    public async GetWebProperties(webUrl: string, selectFields: string[]): Promise<any> {
        return this._getWebProperties(webUrl, selectFields);
    }

    private async _getWebProperties(webUrl: string, selectFields: string[]): Promise<any> {
        return null;
    }
}

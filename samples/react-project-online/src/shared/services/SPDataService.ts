import {
    Logger,
    ConsoleListener,
    LogLevel,
    sp,
    SearchQuery,
    SearchResults,
    Web,
    ItemAddResult
} from 'sp-pnp-js';

import { ISPDataService } from ".";

export class SPDataService implements ISPDataService {

    constructor(logLevel: LogLevel) {

        // setup logger
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = logLevel;
    }

    public async GetWebProperties(webUrl: string, selectFields: string[]): Promise<any> {
        return this._getWebProperties(webUrl, selectFields);
    }

    private async _getWebProperties(webUrl: string, selectFields: string[]): Promise<any> {
        let web = new Web(webUrl);
        let data: any = null;
        // prefix all properties with the expanded field
        selectFields.forEach((value, index, array) => {
            array[index] = "AllProperties/" + value;
        });
        const select = selectFields.join(',');

        try {
            data = await web
                .select(select)
                .expand('AllProperties')
                .usingCaching()
                .get();

        } catch (error) {
            Logger.write('Error loading web properties: ' + error, LogLevel.Error);
        }
        return data.AllProperties;
    }
}
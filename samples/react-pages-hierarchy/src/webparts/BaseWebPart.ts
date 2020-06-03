import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";
import { CustomFetchClient } from '@src/mocks/customfetchclient';

export default class BaseWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {

    protected async onInit(): Promise<void> {
        let isUsingSharePoint = true;

        if (Environment.type === EnvironmentType.Local || Environment.type === EnvironmentType.Test) {
            isUsingSharePoint = false;
        }

        return super.onInit().then(_ => {

            sp.setup({
              spfxContext: this.context,
              sp: {
                fetchClientFactory: () => {
                    return new CustomFetchClient(isUsingSharePoint);
                },
            }
            });
            // subscribe a listener
            Logger.subscribe(new ConsoleListener());

            // set the active log level -- eventually make this a web part property
            Logger.activeLogLevel = LogLevel.Verbose;

        });
    }

    public render(): void {
    }
}

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";

export default class BaseWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {

    protected async onInit(): Promise<void> {
        return super.onInit().then(_ => {
            sp.setup({
                ie11: true,
                spfxContext: this.context,
            });
        
            // subscribe a listener
            Logger.subscribe(new ConsoleListener());

            // set the active log level -- eventually make this a web part property
            Logger.activeLogLevel = LogLevel.Error;

        });
    }

    public render(): void {
    }
}

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";

export default class BaseWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {

    protected async onInit(): Promise<void> {
        return super.onInit().then(_ => {
            // subscribe a listener
            Logger.subscribe(new ConsoleListener());

            // set the active log level -- eventually make this a web part property
            Logger.activeLogLevel = LogLevel.Verbose;

        });
    }

    public render(): void {
        Logger.write("Render");
    }
}

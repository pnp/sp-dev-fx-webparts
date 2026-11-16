import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";
import { getSP } from "../pnpjsConfig";
import { initGraph } from "../graphConfig";

export default class BaseWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {

    protected async onInit(): Promise<void> {
        await super.onInit();
        getSP(this.context);
        initGraph(this.context);
        Logger.subscribe(ConsoleListener());
        Logger.activeLogLevel = LogLevel.Error;
    }

    public render(): void {
    }
}

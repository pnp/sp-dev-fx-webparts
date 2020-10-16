import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";
import { CustomFetchClient } from 'services/customfetchclient';

export default class BaseWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {

    protected async onInit(): Promise<void> {
        let url = this.context.pageContext.web.absoluteUrl;
        let isUsingSharePoint = true;

        if (url === 'https://wwww.contoso.com/sites/workbench') {
            isUsingSharePoint = false;
        }

        return super.onInit().then(_ => {
            
            // configure pnp
            /*
            pnpSetup({
                spfxContext: this.context
              });
            */
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

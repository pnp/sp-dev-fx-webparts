import { Configuration, LogLevel } from "@azure/msal-browser";
import { ConnectionSettings } from "@microsoft/agents-copilotstudio-client";


const getMsalConfig = (settings: ConnectionSettings): Configuration => {
    return {
        auth: {
            clientId: settings.appClientId,
            redirectUri: window.location.origin,
            authority: settings.authority,
        },
        cache: {
            cacheLocation: "localStorage",
        },
        system: {
            loggerOptions: {
                loggerCallback(logLevel: LogLevel, message: string, containsPii: boolean) {
                    if (containsPii) return;
                    switch (logLevel) {
                        case LogLevel.Error:
                            console.error(message);
                            break;
                        case LogLevel.Warning:
                            console.warn(message);
                            break;
                        case LogLevel.Info:
                            console.info(message);
                            break;
                        case LogLevel.Verbose:
                            console.debug(message);
                            break;
                        default:
                            console.log(message);
                            break;
                    }
                }
            }
        }
    };
};
export default getMsalConfig;

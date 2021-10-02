import { SeverityLevel } from '@microsoft/applicationinsights-web';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

import {
    ILogEntry,
    ILogListener,
    LogLevel
} from "@pnp/logging";

class CustomListener implements ILogListener {
    private appInsights: ApplicationInsights;
    private instrumentationKey: string;
    constructor(instrumentationKey: string) {
        this.instrumentationKey = instrumentationKey;
        this.appInsights = this.getApplicationInsights();
    }

    public log(entry: ILogEntry): void {
   
        if (entry.level == LogLevel.Error)
            this.appInsights.trackException({
                error: new Error(entry.message),
                severityLevel: SeverityLevel.Error
            });
        else if (entry.level == LogLevel.Warning)
            this.appInsights.trackException({
                error: new Error(entry.message),
                severityLevel: SeverityLevel.Warning
            });
        else if (entry.level == LogLevel.Info)
            this.appInsights.trackException({
                error: new Error(entry.message),
                severityLevel: SeverityLevel.Information
            });
        else
            this.appInsights.trackException({
                error: new Error(entry.message),
                severityLevel: SeverityLevel.Verbose
            });
        this.appInsights.trackTrace({ message: entry.message });
    }

    private getApplicationInsights(): ApplicationInsights {
        debugger;
        const reactPlugin = new ReactPlugin();
        const applicationInsights = new ApplicationInsights({
            config: {
                instrumentationKey: this.instrumentationKey,
                extensions: [reactPlugin]

            }
        });
        applicationInsights.loadAppInsights();
        return applicationInsights;
    }
}

export default CustomListener;
import { ApplicationInsights, SeverityLevel } from "@microsoft/applicationinsights-web";
import { ILogEntry, ILogListener, LogLevel } from "@pnp/logging";

export class AppInsightListener implements ILogListener {
    private appInsights: ApplicationInsights;
    constructor(appInsights: ApplicationInsights) {
        this.appInsights = appInsights;
    }

    log(entry: ILogEntry): void {
        if (entry.level === LogLevel.Error)
            this.appInsights.trackException({ error: new Error(entry.message), severityLevel: SeverityLevel.Error });
        else if (entry.level === LogLevel.Warning)
            this.appInsights.trackException({ error: new Error(entry.message), severityLevel: SeverityLevel.Warning });
        else if (entry.level === LogLevel.Info)
            this.appInsights.trackException({ error: new Error(entry.message), severityLevel: SeverityLevel.Information });
        else
            this.appInsights.trackException({ error: new Error(entry.message), severityLevel: SeverityLevel.Verbose });
    }


}

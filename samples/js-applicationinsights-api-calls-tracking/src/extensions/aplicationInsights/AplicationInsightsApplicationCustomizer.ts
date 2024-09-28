import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";
import { ApplicationInsights, ITelemetryItem } from "@microsoft/applicationinsights-web";
import { merge, uniq } from "@microsoft/sp-lodash-subset";

export type AplicationInsightsApplicationCustomizerProps = {
	connectionString: string;
	whitelist: string;
	enabled: boolean;
};
const excludedDependencyTargets: string[] = [
	"browser.pipe.aria.microsoft.com",
	"business.bing.com",
	"measure.office.com",
	"officeapps.live.com",
	"outlook.office365.com",
	"outlook.office.com",
	"nleditor.osi.office.net",
	"js.monitor.azure.com",
	"thor.aesir.office.com",
];

export default class AplicationInsightsApplicationCustomizer extends BaseApplicationCustomizer<AplicationInsightsApplicationCustomizerProps> {
	private _excludedDependencies: string[] = [];

	private _appInsightsInitializer = (telemetryItem: ITelemetryItem): boolean | void => {
		//client guid "00000003-0000-0ff1-ce00-000000000000"
		if (telemetryItem) {
			if (telemetryItem.baseType === "RemoteDependencyData" && telemetryItem.baseData && telemetryItem.baseData.target) {
				const isExcluded = this._excludedDependencies.some((target) => telemetryItem.baseData?.target.toLowerCase().indexOf(target.toLowerCase()) !== -1);
				if (isExcluded) return false; // don't track
			}

			if (telemetryItem.baseData?.properties?.HttpMethod === "POST") {
				console.log("POST");
			}
		}
	};
	public onInit(): Promise<void> {
		console.log("AplicationInsightsApplicationCustomizer");
		this._excludedDependencies = excludedDependencyTargets;

		if (this.properties.enabled === true && this.properties.connectionString !== null && this.properties.connectionString !== "") {
			if (this.properties.whitelist !== "") {
				const whiteList = this.properties.whitelist.split(";").map((val) => val.trim());
				this._excludedDependencies = uniq(merge(excludedDependencyTargets, whiteList));
			}
			const appInsights = new ApplicationInsights({
				config: {
					connectionString: this.properties.connectionString,
					//Client IP is used to infer geographic location, but by default IP data is no longer stored
					//Standard configuration doesn't capture the user ID from SharePoint (anonymised)
					enableCorsCorrelation: true,
					enableRequestHeaderTracking: true,
					enableResponseHeaderTracking: true,
					disableExceptionTracking: true,
					disablePageShowEvents: ["visibilitychange"],
					disablePageUnloadEvents: ["beforeunload", "unload", "visibilitychange", "pagehide"],
				},
			});
			appInsights.loadAppInsights();
			appInsights.addTelemetryInitializer(this._appInsightsInitializer);
		}

		return Promise.resolve();
	}
}

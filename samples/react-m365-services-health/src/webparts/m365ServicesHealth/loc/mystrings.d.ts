declare interface IM365ServicesHealthWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	TitleFieldLabel: string;
	AppLocalEnvironmentSharePoint: string;
	AppLocalEnvironmentTeams: string;
	AppLocalEnvironmentOffice: string;
	AppLocalEnvironmentOutlook: string;
	AppSharePointEnvironment: string;
	AppTeamsTabEnvironment: string;
	AppOfficeEnvironment: string;
	AppOutlookEnvironment: string;
}

declare module "M365ServicesHealthWebPartStrings" {
	const strings: IM365ServicesHealthWebPartStrings;
	export = strings;
}

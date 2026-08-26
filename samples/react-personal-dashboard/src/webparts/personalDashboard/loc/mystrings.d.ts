declare interface IPersonalDashboardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  WidgetsSiteUrlURLFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module 'PersonalDashboardWebPartStrings' {
  const strings: IPersonalDashboardWebPartStrings;
  export = strings;
}

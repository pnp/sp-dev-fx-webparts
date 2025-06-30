declare interface ISmartDevOpsWebPartStrings {
  PropertyPaneDescription: string;
  DevOpsSettingsGroupName: string;
  OpenAPISettingsGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
}

declare module "SmartDevOpsWebPartStrings" {
  const strings: ISmartDevOpsWebPartStrings;
  export = strings;
}

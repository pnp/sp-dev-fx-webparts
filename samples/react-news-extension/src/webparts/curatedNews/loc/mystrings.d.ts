declare interface ICuratedNewsWebPartStrings {
  PropertyPaneDescription: string;
  ExtensionNameFieldLabel: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module "CuratedNewsWebPartStrings" {
  const strings: ICuratedNewsWebPartStrings;
  export = strings;
}

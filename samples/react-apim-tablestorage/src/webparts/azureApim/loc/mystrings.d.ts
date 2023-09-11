declare interface IAzureApimWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SubscriptionKeyFieldLabel: string;
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

declare module "AzureApimWebPartStrings" {
  const strings: IAzureApimWebPartStrings;
  export = strings;
}

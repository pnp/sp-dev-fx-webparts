declare interface IListItemsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
  ItemNameFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  ListErrorLabel: string;
  UnknownEnvironment: string;
}

declare module 'ListItemsWebPartStrings' {
  const strings: IListItemsWebPartStrings;
  export = strings;
}

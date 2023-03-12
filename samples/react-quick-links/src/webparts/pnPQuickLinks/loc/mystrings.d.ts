declare interface IPnPQuickLinksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'PnPQuickLinksWebPartStrings' {
  const strings: IPnPQuickLinksWebPartStrings;
  export = strings;
}

declare interface IMyAwardsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'MyAwardsWebPartStrings' {
  const strings: IMyAwardsWebPartStrings;
  export = strings;
}

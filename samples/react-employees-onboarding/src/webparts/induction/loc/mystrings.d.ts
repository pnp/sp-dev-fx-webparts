declare interface IInductionWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListUrlFieldLabel: string;
  AzureFunctionUrlFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'InductionWebPartStrings' {
  const strings: IInductionWebPartStrings;
  export = strings;
}

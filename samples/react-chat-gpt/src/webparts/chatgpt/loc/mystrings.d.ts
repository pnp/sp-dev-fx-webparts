declare interface IChatgptWebPartStrings {
  ApiKeyFieldLabel: string;
  ModelFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module 'ChatgptWebPartStrings' {
  const strings: IChatgptWebPartStrings;
  export = strings;
}

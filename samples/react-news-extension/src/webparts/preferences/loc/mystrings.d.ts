declare interface IPreferencesWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ExtensionNameFieldLabel: string;
  TermSetIdFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module "PreferencesWebPartStrings" {
  const strings: IPreferencesWebPartStrings;
  export = strings;
}

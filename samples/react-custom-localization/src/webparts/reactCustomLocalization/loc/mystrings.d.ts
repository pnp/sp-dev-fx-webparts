declare interface IReactCustomLocalizationWebPartStrings {
  PropertyPaneDescription: string;
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
  UnknownEnvironment: string;
  Hello: string;
  SomeString: string;
}

declare module 'ReactCustomLocalizationWebPartStrings' {
  const strings: IReactCustomLocalizationWebPartStrings;
  export = strings;
}

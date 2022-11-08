declare interface ICsvImporterWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneTextFieldTitleLabel: string;
  PropertyFieldListPickerLabel: string;
  PropertyPaneToggleShowListText: string;
  PropertyPaneToggleHideListText: string;
  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  MessageBarOverflowButtonAriaLabel: string;
  MessageBarDismissButtonAriaLabel: string;
  MessageBarDescription: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CsvImporterWebPartStrings' {
  const strings: ICsvImporterWebPartStrings;
  export = strings;
}

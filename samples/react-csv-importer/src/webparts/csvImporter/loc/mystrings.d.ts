declare interface ICsvImporterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  AdvancedGroupName: string;
  PropertyPaneTextFieldTitleLabel: string;
  PropertyFieldListPickerLabel: string;
  PropertyPaneToggleLabel: string;
  PropertyPaneToggleShowListText: string;
  PropertyPaneToggleHideListText: string;
  PropertyPaneChunkSizeLabel: string;
  PropertyPaneChunkSizeDescription: string;
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

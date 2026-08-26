declare interface ICustomActionManagerWebPartStrings {
  PropertyPaneDescription: string;
  GeneralGroupName: string;
  DisplayGroupName: string;
  FunctionalityGroupName: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  DefaultScopeFieldLabel: string;
  PageSizeFieldLabel: string;
  EnableSearchFieldLabel: string;
  EnableFilteringFieldLabel: string;
  EnableCRUDFieldLabel: string;
  ShowAdvancedPropertiesFieldLabel: string;
  ColumnConfigurationGroupName: string;
  ColumnConfigurationFieldLabel: string;
  ColumnConfigurationFieldDescription: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CustomActionManagerWebPartStrings' {
  const strings: ICustomActionManagerWebPartStrings;
  export = strings;
}

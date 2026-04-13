declare interface ISPPermissionManagerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  FeatureVisibilityGroupName: string;
  FeatureVisibilityGroupDescription: string;
  DescriptionFieldLabel: string;
  TitleFieldLabel: string;
  TitleFieldPlaceholder: string;
  AllowEditGroupLabel: string;
  AllowCreateGroupLabel: string;
  AllowDeleteGroupLabel: string;
  AllowExportUsersCsvLabel: string;
  AllowExportUsersExcelLabel: string;
  AllowPermissionLevelsLabel: string;
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

declare module 'SPPermissionManagerWebPartStrings' {
  const strings: ISPPermissionManagerWebPartStrings;
  export = strings;
}

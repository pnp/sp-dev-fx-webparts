declare interface ISpupsProperySyncWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListCreationText: string;
  PropTemplateLibLabel: string;
  PropAzFuncLabel: string;
  PropAzFuncDesc: string;
  PropUseCertLabel: string;
  PropUseCertCallout: string;
  PropDateFormatLabel: string;
  PropInfoDateFormat: string;
  PropInfoUseCert: string;
  PropInfoTemplateLib: string;
  PropInfoNormalUser: string;
  PropAllowedUserInfo: string;

  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  DefaultAppTitle: string;
  JobResultsDialogTitle: string;
  JobsListSearchPH: string;
  TemplateListSearchPH: string;
  TemplateStructureDialogTitle: string;
  BulkSyncDataDialogTitle: string;
  BulkSyncFileDataLoaderDesc: string;

  GenerateTemplateLoader: string;
  UploadDataToSyncLoader: string;
  PropsLoader: string;
  PropsUpdateLoader: string;
  JobsListLoaderDesc: string;
  JobResultsLoaderDesc: string;
  TemplateListLoaderDesc: string;  
  TemplatePropsLoaderDesc: string;
  BulkSyncListLoaderDesc: string;
  AccessCheckDesc: string;
  SitePrivilegeCheckLabel: string;

  BtnGenerateJSON: string;
  BtnGenerateCSV: string;
  BtnSaveForManual: string;
  BtnPropertyMapping: string;
  BtnUploadDataForSync: string;
  BtnUpdateUserProps: string;
  BtnManualProps: string;
  BtnAzureProps: string;

  PnlHeaderText: string;
  TblColHeadAzProperty: string;
  TblColHeadSPProperty: string;
  TblColHeadEnableDisable: string;
  PPLPickerTitleText: string;

  EmptyPropertyMappings: string;
  TemplateDownloaded: string;
  EmptyDataText: string;
  EmptyDataWarningMsg: string;
  EmptyTable: string;
  EmptyFile: string;
  EmptySearchResults: string;
  UserListChanges: string;
  UserListEmpty: string;
  JobIntializedSuccess: string;
  AdminConfigHelp: string;
  AccessDenied: string;
  SyncFailedErrorMessage: string;

  TabMenu1: string;
  TabMenu2: string;
  TabMenu3: string;
  TabMenu4: string;
  TabMenu5: string;  
}

declare module 'SpupsProperySyncWebPartStrings' {
  const strings: ISpupsProperySyncWebPartStrings;
  export = strings;
}

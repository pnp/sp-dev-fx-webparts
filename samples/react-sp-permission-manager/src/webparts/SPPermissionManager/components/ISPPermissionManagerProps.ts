import { type WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISPPermissionManagerFeatureOptions {
  allowEditGroup: boolean;
  allowCreateGroup: boolean;
  allowDeleteGroup: boolean;
  allowExportUsersCsv: boolean;
  allowExportUsersExcel: boolean;
  allowPermissionLevels: boolean;
}

export interface ISPPermissionManagerProps {
  title: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  featureOptions: ISPPermissionManagerFeatureOptions;
}

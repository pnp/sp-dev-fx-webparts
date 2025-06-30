import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPreferencesProps {
  title: string;
  extensionName: string;
  termsetGuid: string;
  enableCaching: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  loginName: string;
  context: WebPartContext;
}

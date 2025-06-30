import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICuratedNewsProps {
  title: string;
  extensionName: string;
  managedPropertyName: string;
  newsPageLink: string;
  enableCaching: boolean;
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  loginName: string;
}

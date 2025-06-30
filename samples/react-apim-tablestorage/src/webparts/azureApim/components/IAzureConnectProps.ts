import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAzureConnectProps {
  subscriptionKey: string;
  scopeUrl: string;
  tableEndpoint: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}

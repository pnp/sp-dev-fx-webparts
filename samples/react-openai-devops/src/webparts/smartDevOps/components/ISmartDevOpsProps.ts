import { HttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISmartDevOpsProps {
  context: WebPartContext;
  organizationName: string;
  openAPIKey: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  httpClient: HttpClient;
  configureWebPart: () => void;
}

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IChatgptProps {
  apiKey: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  context: WebPartContext;
}

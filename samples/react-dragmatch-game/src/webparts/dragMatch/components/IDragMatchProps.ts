import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDragMatchProps {
  context: WebPartContext;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
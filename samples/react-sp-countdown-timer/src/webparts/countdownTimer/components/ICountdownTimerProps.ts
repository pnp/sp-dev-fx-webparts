import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICountdownTimerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext; // PnPjs SP instance
  listName: string; // SharePoint list name for events
}

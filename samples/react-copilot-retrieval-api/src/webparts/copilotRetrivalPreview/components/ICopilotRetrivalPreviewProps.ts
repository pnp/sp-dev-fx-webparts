import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICopilotRetrivalPreviewProps {
  description: string;
  filterQuery?: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  wpcontext: WebPartContext;
}

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDownloadMultipleDocumentsProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext
  listId: string;
}

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICherryPickedContentProps {
  description: string;
  libraryPicker: string;
  libraryItemPicker: string;
  approvedLibraries: any[];
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

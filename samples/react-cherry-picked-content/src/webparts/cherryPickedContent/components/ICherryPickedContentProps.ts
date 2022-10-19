import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICherryPickedContentProps {
  description: string;
  libraryPicker: string;
  libraryItemPicker: string;
  approvedLibraries: any[];
  isolated: boolean;
  width: string;
  height: string;
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

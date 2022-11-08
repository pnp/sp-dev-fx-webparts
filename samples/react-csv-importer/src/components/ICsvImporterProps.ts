import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICsvImporterProps {
  title: string;
  listId: string;
  showListTitle: boolean;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

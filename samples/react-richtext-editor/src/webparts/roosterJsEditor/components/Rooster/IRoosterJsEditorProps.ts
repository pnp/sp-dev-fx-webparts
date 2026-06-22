import { DisplayMode } from "@microsoft/sp-core-library";

export interface IRoosterJsEditorProps {
  description: string;
  editorContent: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  onSave: (html: string) => void;
  displayMode: DisplayMode;
}

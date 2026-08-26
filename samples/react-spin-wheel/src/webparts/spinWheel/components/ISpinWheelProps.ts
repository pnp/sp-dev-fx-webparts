import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpinWheelProps {
  context: WebPartContext;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

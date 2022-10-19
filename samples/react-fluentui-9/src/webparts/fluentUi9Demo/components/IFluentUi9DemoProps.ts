import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFluentUi9DemoProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}

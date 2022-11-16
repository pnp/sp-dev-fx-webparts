import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFluentUi9DemoProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}

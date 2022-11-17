import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AppMode } from "../FluentUi9DemoWebPart";

export interface IFluentUi9DemoProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  appMode: AppMode
}

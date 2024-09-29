import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IInductionProps {
  title: string;
  description: string;
  listUrl: string;
  azureFunctionUrl: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext
}

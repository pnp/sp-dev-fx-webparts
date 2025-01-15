import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHRAssistantProps {
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;  
  webPartDisplayMode: DisplayMode;
  title: string;
  description: string;  
  botURL: string;
  greet?: boolean;
  clientId: string;
  tenantName: string;
  scope: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userEmail: string;  
  botAvatarImage?: string;
  botAvatarInitials?: string;
}

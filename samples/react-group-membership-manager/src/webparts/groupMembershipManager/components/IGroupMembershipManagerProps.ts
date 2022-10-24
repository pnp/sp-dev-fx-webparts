import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IGroupMembershipManagerProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  context: WebPartContext;
}

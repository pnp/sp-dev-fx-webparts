import { IMicrosoftTeams, WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamsNotificationSenderProps {
  teamsContext?: IMicrosoftTeams;
  groupId: string;
  webpartContext: WebPartContext;
}

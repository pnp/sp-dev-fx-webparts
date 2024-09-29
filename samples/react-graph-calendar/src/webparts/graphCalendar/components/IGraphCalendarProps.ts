import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as microsoftTeams from '@microsoft/teams-js';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls";

export interface IGraphCalendarProps {
  limit: number;
  showRecurrence: boolean;
  group: IPropertyFieldGroupOrPerson[];
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  teamsContext: microsoftTeams.app.Context;
}

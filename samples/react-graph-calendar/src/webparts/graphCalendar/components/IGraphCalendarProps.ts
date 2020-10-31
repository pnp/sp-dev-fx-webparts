import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as microsoftTeams from '@microsoft/teams-js';

export interface IGraphCalendarProps {
  limit: number;
  showRecurrence: boolean;
  context: WebPartContext;
  teamsContext: microsoftTeams.Context;
}

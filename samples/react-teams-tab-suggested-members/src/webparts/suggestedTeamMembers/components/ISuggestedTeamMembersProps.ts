import { GraphHttpClient } from "@microsoft/sp-http";
import { Guid } from "@microsoft/sp-core-library";

export interface ISuggestedTeamMembersProps {
  teamsContext: microsoftTeams.Context;
  graphHttpClient: GraphHttpClient;
  groupId: string;
}

export interface ISuggestedTeamMembersState {
  people: IPerson[];
  userIsGroupOwner: boolean;
  loading: boolean;
}

export interface IPerson {
  displayName: string;
  id: Guid;
  jobTitle: string;
  officeLocation: string;
  userPrincipalName: string;
}


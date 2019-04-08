import { ITenant, ITeam, IChannel } from "../interfaces";

export interface ITeamsService {
  GetTenantInfo(): Promise<ITenant>;
  GetTeams(): Promise<ITeam[]>;
  GetTeamChannels(teamId): Promise<IChannel[]>;
}

import { ITeam, IChannel } from "../interfaces";

export interface ITeamsService {
  GetTeams(): Promise<ITeam[]>;
  GetTeamChannels(teamId): Promise<IChannel[]>;
}

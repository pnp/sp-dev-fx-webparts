import { ITeamInfo } from "./ITeamsTaggingProps";

export interface ITeamsTaggingState {
  selectedTags: string[];
  savedTags: string[];
  similarTeams: ITeamInfo[];
}

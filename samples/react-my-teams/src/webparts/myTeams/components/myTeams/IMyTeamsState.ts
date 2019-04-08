import { ITeam, ITenant } from "../../../../shared/interfaces";

export interface IMyTeamsState {
  items: ITeam[];
  tenantInfo: ITenant;
}

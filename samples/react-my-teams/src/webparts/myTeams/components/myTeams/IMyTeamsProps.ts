import { ITeamsService } from "../../../../shared/services";
import { ITenant } from "../../../../shared/interfaces";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyTeamsProps {
  teamsService: ITeamsService;
  tenantInfo: ITenant;
  updateTenantInfo: (value: ITenant) => void;
  openInClientApp: boolean;
}

import { IMatter, IBilledTime } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxBilledTimeProps {
    context: IWebPartContext;
    matter: IMatter;
    bills: IBilledTime[];
}

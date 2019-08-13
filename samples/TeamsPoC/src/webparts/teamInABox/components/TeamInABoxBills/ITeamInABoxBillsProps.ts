import { IMatter, IBill } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxBillsProps {
    context: IWebPartContext;
    matter: IMatter;
    allbills: IBill[];
}

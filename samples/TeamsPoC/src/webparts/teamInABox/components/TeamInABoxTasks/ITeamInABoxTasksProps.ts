import { IMatter } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxTasksProps {
    context: IWebPartContext;
    matter: IMatter;
}

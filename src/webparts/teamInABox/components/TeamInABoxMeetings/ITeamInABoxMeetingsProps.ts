import { IMatter } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxMeetingsProps {
    context: IWebPartContext;
    matter: IMatter;
}

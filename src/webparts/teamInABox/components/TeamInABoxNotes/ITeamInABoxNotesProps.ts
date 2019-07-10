import { IMatter, INote } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxNotesProps {
    context: IWebPartContext;
    matter: IMatter;
    notes: INote[];
}

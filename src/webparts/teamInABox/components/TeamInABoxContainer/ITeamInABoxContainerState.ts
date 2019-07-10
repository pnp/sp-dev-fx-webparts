import { IMatter, INote, IBilledTime, IBill, IEmployee } from "../../../../models/index";

export interface ITeamInABoxContainerState {
    selectedMatter: IMatter;
    notes: INote[];
    bills: IBilledTime[];
    allbills: IBill[];
    employees: IEmployee[];
}
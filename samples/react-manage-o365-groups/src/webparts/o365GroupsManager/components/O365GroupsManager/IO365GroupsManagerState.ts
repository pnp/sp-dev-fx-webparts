import { IGroup, IGroupCollection } from "../../../../models/IGroup";

export interface IO365GroupsManagerState {
    isLoading: boolean;
    groups: IGroup[];
    ownerGroups: string[];
    memberGroups: string[];
    showNewGroupScreen: boolean;
    loadCount: number;
}
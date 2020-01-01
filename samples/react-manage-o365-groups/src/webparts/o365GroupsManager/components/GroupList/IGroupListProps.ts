import { IGroup } from "../../../../models/IGroup";

export interface IGroupListProps {
    flowUrl?: string;
    items?: IGroup[];
    ownerGroups?: string[];
    memberGroups?: string[];
}
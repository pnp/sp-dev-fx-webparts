import { IGroup } from "../../../../models/IGroup";

export interface IGroupListState {
    filterText?: string;
    isTeachingBubbleVisible?: boolean;
    techingBubbleMessage?: string;
    groups?: IGroup[];
    ownerGroups?: string[];
    memberGroups?: string[];
  }
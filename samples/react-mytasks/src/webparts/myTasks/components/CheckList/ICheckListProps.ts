import { ITaskCheckListItem } from "../../../../services/ITaskCheckListItem";
import { ICheckListItem } from "../../../../services/ICheckListItem";
import spservices from "../../../../services/spservices";
import { ITaskDetails } from "../../../../services/ITaskDetails";

export interface ICheckListProps {
   taskDetails: ITaskDetails;
   onCheckListChanged: (ChangedCheckList: ICheckListItem[]) => void;
   spservice: spservices;
}

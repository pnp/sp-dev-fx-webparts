
import { IContextualMenu, IContextualMenuItem, IDropdownOption, IFacepilePersona } from "office-ui-fabric-react";
import { ITask } from "../../../../services/ITask";
import { ITaskDetails } from "../../../../services/ITaskDetails";

export interface IEditTaskState {
hideDialog: boolean;
hasError: boolean;
errorMessage: string;
progressSelectedKey: string | number;
newCheckListItemTitle: string;
disableSave:boolean;
selectedBucket?: string | number;
buckets: IDropdownOption[];
isLoading: boolean;
addAssigns: boolean;
dueDate?: string;
calloutTarget: HTMLElement;
displayAssigns:boolean;
renderAssigns: IFacepilePersona[];
//renderCheckListItems: JSX.Element[];
task: ITask;
taskDetails: ITaskDetails;
displayAttachments:boolean;
taskChanged:boolean;
isCallOut:boolean;

}

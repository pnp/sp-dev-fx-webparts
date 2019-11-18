
import { IContextualMenu, IContextualMenuItem , IFacepilePersona} from "office-ui-fabric-react";

export interface INewTaskState {
hideDialog: boolean;
hasError: boolean;
errorMessage: string;
planSelectedKey: string | number;
taskName: string;
disableAdd:boolean;
selectedBucket?:IContextualMenuItem;
buckets:IContextualMenuItem[];
isLoading: boolean;
addAssigns: boolean;
dueDate?: string;
calloutTarget: HTMLElement;
assignments: IFacepilePersona[];

}

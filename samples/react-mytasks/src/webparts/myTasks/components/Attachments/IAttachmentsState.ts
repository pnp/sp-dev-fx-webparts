import { IListViewItems } from "./IListViewItems";
import { IColumn } from "office-ui-fabric-react";
import { ITaskDetails } from "../../../../services/ITaskDetails";

export interface IAttachmentsState {
value:string;
displayUploadFromSharePoint: boolean;
displayLinkAttachment:boolean;
editLinkAttachment:boolean;
uploadFile:boolean;
renderReferences: JSX.Element[];
listViewItems: IListViewItems[];
columns: IColumn[];
taskDetails:ITaskDetails;
hasError: boolean;
errorMessage:string;
isLoading:boolean;
percent:number;
showDefaultLinkImage: boolean;
}

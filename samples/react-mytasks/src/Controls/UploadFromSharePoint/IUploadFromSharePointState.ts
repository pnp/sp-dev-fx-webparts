import { IListViewItems } from "./../UploadFromSharePoint/IListViewItems";
import { IColumn } from "office-ui-fabric-react";

export interface IUploadFromSharePointState {
  selectItem: IListViewItems;
  hasError: boolean;
  messageError:string;
  isloading: boolean;
  hideDialog: boolean;
  listViewItems: IListViewItems[];
  hasMoreItems:boolean;
  disableSaveButton:boolean;
  columns: IColumn[];
  messageInfo:string;
}

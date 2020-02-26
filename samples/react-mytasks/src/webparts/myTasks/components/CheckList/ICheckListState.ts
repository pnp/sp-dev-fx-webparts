import { ITaskDetails } from "../../../../services/ITaskDetails";

export  interface ICheckListState {
  renderCheckListItems: JSX.Element[];
  newCheckListItemTitle: string;
  hasError: boolean;
  messageError: string;
  taskDetails: ITaskDetails;
  checklistChanged:boolean;
}

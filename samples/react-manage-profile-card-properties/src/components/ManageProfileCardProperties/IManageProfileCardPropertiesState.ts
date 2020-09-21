import { IColumn } from "office-ui-fabric-react";
import { IListItem } from "../../Entities/IListItem";

export interface IManageProfileCardPropertiesState {
  isLoading: boolean;
  hasError:boolean;
  errorMessage: string;
  listItems: IListItem[];
  listFields: IColumn[];
  selectedItem: IListItem;
  displayNewPanel: boolean;
  displayEditPanel:boolean;
  displayDeletePanel: boolean;
}


import {IListViewItems } from "./IListViewItems";
export interface ITenantPropertyPanelSate {
  showPanel:boolean;
  readOnly: boolean;
  visible: boolean;
  multiline: boolean;
  primaryButtonLabel:string;
  disableButton:boolean;
  tenantProperty: IListViewItems;
  errorMessage:string;
}

import {IListViewItems } from "./IListViewItems";
import { WebPartContext } from '@microsoft/sp-webpart-base';
export enum panelMode {
 "New",
 "edit",
 "Delete"
}

export interface ITenantPropertyPanelProps {
  mode:panelMode;
  showPanel: boolean;
  TenantProperty: IListViewItems ;
  onDismiss(refresh?:boolean) : void;
  context: WebPartContext;
}

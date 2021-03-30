import {IListViewItems } from "./IListViewItems";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SyntheticEvent } from "react";
export enum panelMode {
 "New",
 "edit",
 "Delete"
}

export interface ITenantPropertyPanelProps {
  mode:panelMode;
  showPanel: boolean;
  TenantProperty: IListViewItems ;
  onDismiss(ev?: SyntheticEvent<HTMLElement, Event>, refresh?: boolean) : void;
  context: WebPartContext;
}

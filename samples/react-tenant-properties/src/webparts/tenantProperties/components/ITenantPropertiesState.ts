import { IListViewItems } from '../components/IListViewItems';
import {  panelMode } from './ITenantPropertyPanelProps';

export interface ITenantPropertiesState {
 items:  IListViewItems[];
 isLoading:boolean;
 disableCommandOption:boolean;
 showPanel:boolean;
 selectItem: IListViewItems;
 panelMode: panelMode;
 hasError: boolean;
 errorMessage: string;

}

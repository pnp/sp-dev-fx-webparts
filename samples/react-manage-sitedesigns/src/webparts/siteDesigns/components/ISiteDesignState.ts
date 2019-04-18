import { IListViewItems } from '../components/IListViewItems';
import {  panelMode } from './IEnumPanel';
import { SiteDesignInfo } from '@pnp/sp';
export interface ISiteDesignState{
 items:  IListViewItems[];
 isLoading:boolean;
 disableCommandOption:boolean;
 showPanel:boolean;
 selectItem: IListViewItems;
 panelMode: panelMode;
 hasError: boolean;
 errorMessage: string;
 siteDesignRunning:boolean;
 siteDesignRunningMessage: string[];
}



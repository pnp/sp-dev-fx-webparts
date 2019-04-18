import { IListViewItems } from './IListViewItems';
import {  panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';

export interface ISiteScriptsState{
 items:  IListViewItems[];
 isLoading:boolean;
 disableCommandOption:boolean;
 showPanel:boolean;
 selectItem: IListViewItems[];
 panelMode: panelMode;
 hasError: boolean;
 errorMessage: string;
 showPanelAddScript: boolean;
 showDialogDelete:boolean;
 deleting:boolean;
 disableDeleteButton: boolean;
 showError: boolean;
 showCommmandEdit: string;
}



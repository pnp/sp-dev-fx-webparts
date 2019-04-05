import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { IListViewItems } from '../../webparts/siteDesigns/components/IListViewItems';


import { SiteDesignInfo, SiteScriptInfo } from '@pnp/sp';
export interface  IEditSiteDesignState {
  isLoading: boolean;
  siteDesignInfo?: IListViewItems;
  showPanel: boolean;
  showError: boolean;
  errorMessage: string;
  readOnly: boolean;
  disableSaveButton: boolean;
  saving: boolean;
  selectedItemWebTemplate: string | number;
}


import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { SiteDesignCreationInfo, SiteScriptInfo } from '@pnp/sp';
import { IViewSite } from '../SelectSite/IViewSite';
export interface IApplySiteDesignState {
  isLoading: boolean;
  showPanel: boolean;
  panelMode: panelMode;
  showError: boolean;
  errorMessage: string;
  readOnly: boolean;
  disableSaveButton: boolean;

  selectedItems: IViewSite[];

  saving: boolean;

}



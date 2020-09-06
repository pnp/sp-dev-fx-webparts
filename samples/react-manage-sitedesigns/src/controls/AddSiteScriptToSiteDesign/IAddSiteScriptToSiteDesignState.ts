
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { SiteDesignCreationInfo, SiteScriptInfo } from '@pnp/sp';
import { ISiteScript } from '../../types/ISiteScript';
export interface IAddSiteScriptToSiteDesignState {
  isLoading: boolean;
  showPanel: boolean;
  panelMode: panelMode;
  showError: boolean;
  errorMessage: string;
  readOnly: boolean;
  disableSaveButton: boolean;
  siteScriptsList: { key: string | number | undefined, text: string }[];
  selectedItems: string[];
  showPanelAddScript: boolean;
  saving: boolean;

}



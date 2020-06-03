
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { SiteDesignCreationInfo, SiteScriptInfo } from '@pnp/sp';
import { ISiteScript } from '../../types/ISiteScript';
export interface IAddSiteDesignState {
  isLoading: boolean;
  siteDesignCreationInfo?: SiteDesignCreationInfo;
  showPanel: boolean;
  panelMode: panelMode;
  showError: boolean;
  errorMessage: string;
  readOnly: boolean;
  disableSaveButton: boolean;
  sitescriptslist: { key: string | number | undefined, text: string }[];
  selectedItems: string[];
  showPanelAddScript: boolean;
  saving: boolean;
  selectedItemWebTemplate: string | number;
}



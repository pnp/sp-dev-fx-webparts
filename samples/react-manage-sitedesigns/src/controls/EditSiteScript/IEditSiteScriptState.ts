
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { SiteDesignInfo, SiteScriptInfo } from '@pnp/sp';
import { ISiteScript } from '../../types/ISiteScript';
export interface IEditSiteScriptState {
  title: string;
  description: string;
  showError: boolean;
  errorMessage: string;
  readOnly: boolean;
  disableSaveButton: boolean;
  currentSiteScript: ISiteScript;
  hideDialog: boolean;
  saving: boolean;
  isLoading: boolean;
}



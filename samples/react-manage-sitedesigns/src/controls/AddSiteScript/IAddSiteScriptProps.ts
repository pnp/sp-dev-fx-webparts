import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';

export interface IAddSiteScriptProps {

  context: WebPartContext;
  hideDialog: boolean;
  onDismiss(refresh?: boolean): void;

}





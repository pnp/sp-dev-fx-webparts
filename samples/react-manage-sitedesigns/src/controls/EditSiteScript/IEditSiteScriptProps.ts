import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';

export interface IEditSiteScriptProps {

  context: WebPartContext;
  hideDialog: boolean;
  onDismiss(refresh?: boolean): void;
  siteScriptId:string;
}





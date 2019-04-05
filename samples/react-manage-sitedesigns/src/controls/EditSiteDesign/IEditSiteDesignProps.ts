import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { IListViewItems } from '../../webparts/siteDesigns/components/IListViewItems';

export interface IEditSiteDesignProps {

  context: WebPartContext;
  mode: panelMode;
  onDismiss(refresh?: boolean): void;
  showPanel: boolean;
  siteDesignInfo: IListViewItems;
}

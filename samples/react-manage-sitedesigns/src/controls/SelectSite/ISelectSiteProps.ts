import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { IViewSite } from './IViewSite';

export interface ISelectSiteProps {
  context: WebPartContext;
  onSelectItem: (item:IViewSite[]) => void;
}


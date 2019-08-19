import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';

export interface IAddSiteScriptToSiteDesignProps {
  context: WebPartContext;
  onDismiss(refresh?: boolean): void;
  showPanel: boolean;
  siteDesignInfo: ISiteDesignSelectedItem;
}


interface ISiteDesignSelectedItem {
  key: string;
  Description: string;
  Id: string;
  Title: string;
  WebTemplate:string;
  SiteScriptIds: string;
  numberSiteScripts: number;
  IsDefault: boolean;
  PreviewImageAltText: string;
  PreviewImageUrl: string;
  Version: string;
}

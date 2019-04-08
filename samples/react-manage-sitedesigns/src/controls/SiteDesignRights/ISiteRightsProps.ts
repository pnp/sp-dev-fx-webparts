import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';

export interface ISiteDesignRightsProps {
  SiteDesignSelectedItem: ISiteDesignSelectedItem;
  context: WebPartContext;
  mode: panelMode;
  onDismiss(refresh?: boolean): void;
  showPanel: boolean;
}

interface ISiteDesignSelectedItem {
  key: string;
  Description: string;
  PreviewImageUrl: string;
  SiteScriptIds: string;
  Title: string;
  WebTemplate: string;
  Id: string;
  numberSiteScripts:number;
  IsDefault: boolean;
  PreviewImageAltText:string;
  Version: string;
  runStatus: boolean;
}



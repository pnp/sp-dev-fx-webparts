import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SiteScriptInfo, SiteDesignInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import {  IAddSiteDesignTaskToCurrentWebResult } from './../../services/IAddSiteDesignTaskToCurrentWebResult';

export interface IApplySiteDesignProps {
  context: WebPartContext;
  onDismiss(siteDesignsApplyedInfo?: { addSiteDesignTaskResult: IAddSiteDesignTaskToCurrentWebResult, siteUrl: string }[],refresh?: boolean): void;
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

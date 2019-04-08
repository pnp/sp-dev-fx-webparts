import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import {  SiteDesignPrincipals } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import { IListViewItems } from '../../webparts/siteDesigns/components/IListViewItems';

export interface IAddPrincipalProps {

  context: WebPartContext;

  onDismiss(refresh?: boolean): void;
  showPanel: boolean;
  siteDesignInfo: IListViewItems;
}

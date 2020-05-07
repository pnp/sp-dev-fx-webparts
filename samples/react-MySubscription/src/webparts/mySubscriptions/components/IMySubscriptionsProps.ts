import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IMySubscriptionsProps {
  siteurl: string;
  context: WebPartContext;
  themeVariant: any;
  listname:string;
  displayMode: DisplayMode; 
  strings:any;   
}

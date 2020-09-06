import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
export interface ISiteDesignsProps {
 title: string;
 context: WebPartContext;
 displayMode:DisplayMode;
 updateProperty(value:string):void;
}



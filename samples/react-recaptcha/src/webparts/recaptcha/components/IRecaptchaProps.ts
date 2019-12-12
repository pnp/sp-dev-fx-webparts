import { WebPartContext } from '@microsoft/sp-webpart-base';  
import { DisplayMode } from '@microsoft/sp-core-library';  

export interface IRecaptchaProps {
  sitekey: string;
  displayMode: DisplayMode;  
  context: WebPartContext;
}

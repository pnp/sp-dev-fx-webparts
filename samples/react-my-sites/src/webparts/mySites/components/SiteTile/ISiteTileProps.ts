
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { MSGraphClientV3, AadTokenProvider } from "@microsoft/sp-http";
export interface ISiteTileProps {
  msGraphClient:MSGraphClientV3;
  site:any;
  themeVariant: IReadonlyTheme | undefined;
  locale:string;
}

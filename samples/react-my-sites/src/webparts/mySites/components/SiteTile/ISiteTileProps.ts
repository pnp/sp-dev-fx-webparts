
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { MSGraphClient, AadTokenProvider } from "@microsoft/sp-http";
export interface ISiteTileProps {
  msGraphClient:MSGraphClient;
  site:any;
  themeVariant: IReadonlyTheme | undefined;
}

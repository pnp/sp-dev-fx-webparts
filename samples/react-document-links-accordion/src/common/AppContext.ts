
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient, AadTokenProvider } from "@microsoft/sp-http";
import {   IReadonlyTheme } from '@microsoft/sp-component-base';
import { IRegionalSettingsInfo} from "@pnp/sp/regional-settings";


export interface IAppContextProps {
  currentUser:string;
  msGraphClient:MSGraphClient;
  locale:string;
  themeVariant: IReadonlyTheme | undefined;
}

export const AppContext = React.createContext<IAppContextProps>(undefined);

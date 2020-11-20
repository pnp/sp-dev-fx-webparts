
import React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient, AadTokenProvider } from "@microsoft/sp-http";
import {   IReadonlyTheme } from '@microsoft/sp-component-base';
import { IRegionalSettingsInfo} from "@pnp/sp/regional-settings";
import { Connection } from "jsstore";

export interface IAppContextProps {
  idbConnection: Connection;
  currentUser:string;
  msGraphClient:MSGraphClient;
  locale:string;
  themeVariant: IReadonlyTheme | undefined;
}

export const AppContext = React.createContext<IAppContextProps>(undefined);

import React from "react";
import { IAppContext } from '../common/IAppContext';
export const AppContext = React.createContext<IAppContext>(undefined);
export const currentSiteTheme =  window["__themeState__"];

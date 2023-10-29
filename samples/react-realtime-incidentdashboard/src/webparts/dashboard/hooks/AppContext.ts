import { createContext } from "react";
import { IAppContext } from "../models/IAppContext";

export const AppContext = createContext<{
  appContext: IAppContext;
}>({ appContext: {} as IAppContext });

import { BaseComponentContext } from "@microsoft/sp-component-base";
import * as React from "react";

export interface ISPFxContext {
    context: BaseComponentContext;
}

export const SPFxContext = React.createContext<ISPFxContext>(null);
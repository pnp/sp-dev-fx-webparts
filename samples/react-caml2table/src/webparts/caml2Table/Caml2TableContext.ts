import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPFI } from '@pnp/sp';

export interface ICaml2TableContext {
  SPFxContext: WebPartContext;
  spfi: SPFI;
  themeVariant: IReadonlyTheme;
}

// Create a default empty context with all required properties
const defaultContext: ICaml2TableContext = {
  SPFxContext: null,
  spfi: null,
  themeVariant: null
};

export const Caml2TableContext = React.createContext<ICaml2TableContext>(defaultContext);
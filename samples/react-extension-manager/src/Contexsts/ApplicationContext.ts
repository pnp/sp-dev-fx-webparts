import { createContext } from 'react'
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPFI } from '@pnp/sp/presets/all';
import { IAppCatalogProvider } from '../Providers/AppCatalogProvider';

export interface IApplicationContext {
    context: BaseComponentContext;
    PnPjs: SPFI
    Provider: IAppCatalogProvider;
}

export const ApplicationContext = createContext<IApplicationContext>(null);
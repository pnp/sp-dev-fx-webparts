import * as React from 'react';
import { IHelper } from './helper';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface AppContextProps {
    context: WebPartContext;
    siteurl: string;
    domainName: string;
    helper: IHelper;
    displayMode: DisplayMode;
    openPropertyPane: () => void;
    tempLib: string;
    deleteThumbnails: boolean;
}

export const AppContext = React.createContext<AppContextProps>(undefined);
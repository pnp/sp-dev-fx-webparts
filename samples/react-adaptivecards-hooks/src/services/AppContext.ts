import { createContext, useContext } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISPEventObserver } from '@microsoft/sp-core-library';
import { IAdaptiveCardViewerState, AdaptiveCardViewerStateAction } from '../webparts/adaptiveCardViewer/components/IAdaptiveCardViewerState';

export interface IAppContextProps {
  spContext: WebPartContext;
  spEventObserver: ISPEventObserver;
  acViewerState: IAdaptiveCardViewerState;
  acViewerStateDispatch: React.Dispatch<AdaptiveCardViewerStateAction>;
}

export const AppContext = createContext<IAppContextProps>(undefined);

export const getContentPackManagerState = () => useContext(AppContext);

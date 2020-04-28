import * as React from 'react';

// Used to adapt to changing section background
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

export type AdaptiveCardViewerStateAction =
  | { type: 'status', isLoading: boolean, isError: boolean, status?: { message: string, diagnostics: any } }
  | { type: 'template', payload: any }
  | { type: 'data', payload: any }
  | { type: 'theme', payload: IReadonlyTheme | undefined }
  ;

export interface IAdaptiveCardViewerState {
  themeVariant: IReadonlyTheme | undefined;
  templateJSON: string;
  dataJSON: string;
  useTemplating: boolean;
  isLoading: boolean;
}

export const reducer: React.Reducer<IAdaptiveCardViewerState, AdaptiveCardViewerStateAction> = (state, action): IAdaptiveCardViewerState => {
  console.log(`acViewerStateDispatch: ${action.type}`);

  switch (action.type) {
    case "status":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "template":
      return {
        ...state,
        isLoading: false,
        templateJSON: action.payload
      };
    case "data":
      return {
        ...state,
        isLoading: false,
        dataJSON: action.payload
      };
    case "theme":
      return {
        ...state,
        themeVariant: action.payload
      };
    default:
      break;
  }
};

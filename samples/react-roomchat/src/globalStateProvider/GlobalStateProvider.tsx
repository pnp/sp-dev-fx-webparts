import * as React from 'react';
import {
  createContext,
  useReducer,
} from 'react';

import { EProcessingStatus } from '../constants/EProcessingStatus';
import { EScreens } from '../constants/EScreens';
import { IGlobalStateContext } from './IGlobalStateContext';
import { IState } from './IState';
import { Reducer } from './Reducer';

const initialState: IState = {
  processingStatus: EProcessingStatus.idle,
  context: undefined,
  useIdentity: undefined,
  moderatorInfo: undefined,
  theme: undefined,
  topic : undefined,
  acsConnectString: undefined,
  chatThreadId: undefined,
  showScreen: EScreens.RoomChat,
  errorInfo: undefined,
  startChat: false,
};

const stateInit: IGlobalStateContext = {
  GlobalState: initialState,
  setGlobalState: (() => { return; })
};
// Create Context
export const GlobalStateContext:React.Context<IGlobalStateContext>  = createContext<IGlobalStateContext>(stateInit);
// Global State Provider
export const GlobalStateProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const [GlobalState, setGlobalState] = useReducer(Reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{GlobalState, setGlobalState }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

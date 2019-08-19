import { combineReducers, Reducer } from 'redux';

import webpartReducer, { IWebpartState } from './webpart';

export interface IState {
  webpart: IWebpartState;
}

export const rootReducer: Reducer<IState> = combineReducers<IState>({
  webpart: webpartReducer
});

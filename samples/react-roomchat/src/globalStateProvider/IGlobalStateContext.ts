import { EActionTypes } from './EActionTypes';
import { IState } from './IState';

export interface IGlobalStateContext {
  GlobalState: IState;
  setGlobalState: React.Dispatch<{type:EActionTypes, payload: unknown}>;
}

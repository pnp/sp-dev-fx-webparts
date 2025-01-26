// listReducerTypes.ts

import { ActionTypes } from './actionTypes';

export interface IListState {
  items: any[];
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
}

// Union of all possible actions that our reducer can handle
export type ListAction =
  | { type: typeof ActionTypes.FETCH_START }
  | { type: typeof ActionTypes.FETCH_SUCCESS; payload: any[] }
  | { type: typeof ActionTypes.FETCH_ERROR; payload: string }



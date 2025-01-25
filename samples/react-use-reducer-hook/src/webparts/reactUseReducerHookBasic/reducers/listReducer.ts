// listReducer.ts

import { Logger, LogLevel } from '@pnp/logging';
import { IListState, ListAction } from './listReducerTypes';
import { ActionTypes } from './actionTypes';

// Initial state for the reducer
export const initialState: IListState = {
  items: [],
  loading: false,
  error: null,
  isConfigured: false
};

// Reducer function to handle state changes based on dispatched actions
export const listReducer = (state: IListState, action: ListAction): IListState => {
  // Log the action with a JSON string for better readability
  Logger.write(
    `Action dispatched: ${JSON.stringify(action)}`,
    LogLevel.Info
  );

  // Log the current state (also stringified for clarity)
  Logger.write(
    `Current state: ${JSON.stringify(state)}`,
    LogLevel.Info
  );

  // Handle different action types
  switch (action.type) {
    case ActionTypes.FETCH_START:
      // Set loading to true and clear any previous errors
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionTypes.FETCH_SUCCESS:
      // Set loading to false and update items with the fetched data
      return {
        ...state,
        loading: false,
        items: action.payload, // array of items
      };

    case ActionTypes.FETCH_ERROR:
      // Set loading to false and update the error message
      return {
        ...state,
        loading: false,
        error: action.payload, // string
      };

    case ActionTypes.WEB_PART_NOT_CONFIGURED:
      // Set loading to false and update the error message for configuration issues
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.SET_CONFIGURED:
      // Update the isConfigured state
      return {
        ...state,
        isConfigured: action.payload,
      };

    default:
      // Log an error for unknown actions
      Logger.write(
        `Unknown action type: ${action}`,
        LogLevel.Error
      );
      // Return the current state for unknown actions
      return state;
  }
};
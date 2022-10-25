import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { EProcessingStatus } from '../constants/EProcessingStatus';
import { EScreens } from '../constants/EScreens';
import { IChatModeratorInfo } from '../models/IChatModeratorInfo';
import { IErrorInfo } from '../models/IErrorInfo';
import { IUserIdentity } from '../models/IUserIdentity';
import { EActionTypes } from './EActionTypes';
import { IState } from './IState';

// Reducer
export const Reducer = (state: IState, action: { type: EActionTypes; payload: unknown }): IState => {
  switch (action.type) {
    case EActionTypes.SET_PROCESSING_STATUS:
      return { ...state, processingStatus: action.payload as EProcessingStatus };
    case EActionTypes.SET_CONTEXT:
      return { ...state, context: action.payload as WebPartContext };
    case EActionTypes.SET_USER_INFO:
      return { ...state, useIdentity: action.payload as IUserIdentity };
    case EActionTypes.SET_MODERATOR_INFO:
      return { ...state, moderatorInfo: action.payload as IChatModeratorInfo };
    case EActionTypes.SET_TOPIC:
      return { ...state, topic: action.payload as string };
    case EActionTypes.SET_THEME:
      return { ...state, theme: action.payload as IReadonlyTheme };
    case EActionTypes.SET_ACS_CONNECT_STRING:
      return { ...state, acsConnectString: action.payload as string };
    case EActionTypes.SET_CHAT_THREAD_ID:
      return { ...state, chatThreadId: action.payload as string };
    case EActionTypes.SET_SHOW_SCREEN:
      return { ...state, showScreen: action.payload as EScreens };
    case EActionTypes.SET_ERROR_INFO:
      return { ...state, errorInfo: action.payload as IErrorInfo };
    case EActionTypes.SET_START_CHAT:
      return { ...state, startChat: action.payload as boolean };
    case EActionTypes.SET_UPDATE_STATE:
      return { ...(action.payload as IState) };

    default:
      return state;
  }
};

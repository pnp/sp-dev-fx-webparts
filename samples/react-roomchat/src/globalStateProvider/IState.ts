import {
  IPartialTheme,
  ITheme,
} from 'office-ui-fabric-react';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { EProcessingStatus } from '../constants/EProcessingStatus';
import { EScreens } from '../constants/EScreens';
import { IChatModeratorInfo } from '../models/IChatModeratorInfo';
import { IErrorInfo } from '../models/IErrorInfo';
import { IUserIdentity } from '../models/IUserIdentity';

export interface IState {
  context: WebPartContext;
  processingStatus: EProcessingStatus;
  useIdentity:IUserIdentity;
  moderatorInfo: IChatModeratorInfo;
  theme:  IReadonlyTheme |ITheme | IPartialTheme | undefined;
  topic:string;
  acsConnectString:string;
  chatThreadId:string;
  showScreen:EScreens;
  errorInfo: IErrorInfo;
  startChat:boolean;
}


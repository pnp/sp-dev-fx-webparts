import { ITheme } from '@fluentui/react';
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';

import { IUser } from '../IUser';

export interface IGlobalState {
  title: string;
  numberDays: number;
  noBirthdaysMessage?: string;
  todayBirthdaysMessage?: string;
  users:  IUser[];
  theme?: ITheme | IReadonlyTheme  ;
  isLoading: boolean;
  hasError?: boolean;
  error? : Error;
  pageSize?: number;
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  context: BaseComponentContext;
  adaptiveCard?: object;
  selectedUser?: IUser;


}

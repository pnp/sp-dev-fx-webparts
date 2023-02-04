import { ITheme } from '@fluentui/react';
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';

import { IUser } from '../IUser';

export interface IGlobalState {
  title: string;
  numberDays: number;
  upcomingBirthdaysMessage?: string;
  upcomingBirthdaysBackgroundImage?: string;
  todayBirthdaysMessage?: string;
  noBirthdaysMessage?: string;
  todayBirthdaysBackgroundImage?: string;
  users:  IUser[];
  theme?: ITheme | IReadonlyTheme  ;
  isLoading: boolean;
  hasError?: boolean;
  error? : Error;
  pageSize?: number;
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  containerWidth?: number;
  context: BaseComponentContext;
  todayBirthdaysMessageColor?: string;
  upcomingBirthdaysMessageColor?: string;
  adaptiveCard?: object;
  selectedUser?: IUser;
  showDialog?: boolean;
  currentPageIndex?: number;
  currentShowingItems?:  number;
  gridHeight?: number;
}

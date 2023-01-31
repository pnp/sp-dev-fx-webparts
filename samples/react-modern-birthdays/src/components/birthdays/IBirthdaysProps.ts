import { ITheme } from '@fluentui/react';
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IBirthdaysProps {
  title: string;
  numberDays: number;
  upcomingBirthdaysMessage?: string;
  upcomingBirthdaysBackgroundImage?: string;
  todayBirthdaysMessage?: string;
  todayBirthdaysBackgroundImage?: string;
  theme?:ITheme | IReadonlyTheme;
  pageSize?: number;
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  containerWidth?: number;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: BaseComponentContext;
  onConfigure: () => void;
  todayBirthdaysMessageColor?: string;
  upcomingBirthdaysMessageColor?: string;
  noBirthdaysMessage?: string;
  gridHeight?: number;
}

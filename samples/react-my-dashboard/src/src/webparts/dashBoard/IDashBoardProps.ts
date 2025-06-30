import { Theme } from '@fluentui/react';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { EAppHostName } from '../../models/EAppHostName';

export interface IDashBoardProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  themeString?: string;
  theme?: Theme  | undefined;
  context: BaseComponentContext;
  title: string;
  appHostName: EAppHostName;
}

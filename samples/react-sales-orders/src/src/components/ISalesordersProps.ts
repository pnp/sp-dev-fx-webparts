import { Theme } from '@fluentui/react-components';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { EAppHostName } from '../constants/EAppHostname';

export interface ISalesordersProps {
  title: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  theme: Theme | undefined;
  themeString: string;
  context: BaseComponentContext
  appHostName: EAppHostName;
}

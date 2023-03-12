import { ITheme } from 'office-ui-fabric-react/lib/Styling';

import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';

export interface IChatGptProps {
  title: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  context: BaseComponentContext;
  theme:  ITheme | IReadonlyTheme  ;
  chatId: string;
  teamsId: string;
  channelId: string;
  parentMessageId: string;
}

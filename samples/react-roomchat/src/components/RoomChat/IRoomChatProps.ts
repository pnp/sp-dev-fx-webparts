import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IRoomChatProps {
  topic: string;
  isDarkTheme: boolean;
  theme:  IReadonlyTheme | undefined;
  context: WebPartContext;
  acsConnectString: string;
}

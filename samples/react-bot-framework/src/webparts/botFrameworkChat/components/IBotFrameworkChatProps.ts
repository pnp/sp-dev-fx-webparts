import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IBotFrameworkChatProps {
  description: string;
  message: string;
  directLineSecret: string;
  title: string;
  placeholderText: string;
  titleBarBackgroundColor : string;
  botMessagesBackgroundColor: string;
  botMessagesForegroundColor: string;
  userMessagesBackgroundColor: string;
  userMessagesForegroundColor: string;
  context: IWebPartContext;
}

import { IWebPartContext } from '@microsoft/sp-client-preview';

export interface IBotFrameworkChatWebPartProps {
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

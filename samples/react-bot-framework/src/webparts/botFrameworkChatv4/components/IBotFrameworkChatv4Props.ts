import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IBotFrameworkChatv4Props {
  description: string;
  directLineSecret: string;
  bubbleBackground: string;
  bubbleTextColor: string;
  bubbleFromUserBackground: string;
  bubbleFromUserTextColor: string;
  backgroundColor: string;
  botAvatarImage: string;
  botAvatarInitials: string;
  userAvatarImage: string;
  userAvatarInitials: string;
  hideUploadButton: boolean;
  sendBoxBackground: string;
  sendBoxTextColor: string;
  context: IWebPartContext;
}

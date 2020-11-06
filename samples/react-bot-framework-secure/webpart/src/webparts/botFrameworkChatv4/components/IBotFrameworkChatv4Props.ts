import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IBotFrameworkChatv4Props {
  botEndpoint: string;
  botName: string;
  context: WebPartContext;
}

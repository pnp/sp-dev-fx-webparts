import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IBotFrameworkSSOProps {
  botEndpoint: string;
  botName: string;
  context: WebPartContext;
}

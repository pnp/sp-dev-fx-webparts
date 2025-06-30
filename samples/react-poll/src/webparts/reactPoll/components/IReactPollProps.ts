import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface IReactPollProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userEmail: string;
  context: WebPartContext;
  webServerRelativeUrl:string;
}

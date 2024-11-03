import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IListformattingWebpartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext; // Add this line
}
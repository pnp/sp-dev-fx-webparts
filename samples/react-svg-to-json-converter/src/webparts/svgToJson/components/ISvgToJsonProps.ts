import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISvgToJsonProps {
  siteUrl: string;
  libraryName: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext; 
  
}
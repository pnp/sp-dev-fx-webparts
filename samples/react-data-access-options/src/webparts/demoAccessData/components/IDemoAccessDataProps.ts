import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDemoAccessDataProps {
  description: string;  
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}

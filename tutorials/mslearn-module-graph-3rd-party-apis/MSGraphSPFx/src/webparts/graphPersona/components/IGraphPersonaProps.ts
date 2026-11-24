import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IGraphPersonaProps {
  graphClient: MSGraphClientV3;
  isDarkTheme: boolean;
  environmentMessage: string;
  userDisplayName: string;
}

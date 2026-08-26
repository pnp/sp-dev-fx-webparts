import { AadHttpClient } from '@microsoft/sp-http';

export interface IPersonalSettingsProps {
  aadHttpClient: AadHttpClient | undefined;
  apiUrl: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

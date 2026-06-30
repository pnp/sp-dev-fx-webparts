import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IMigratePersonalSettingsProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  msGraphClient: MSGraphClientV3;
}

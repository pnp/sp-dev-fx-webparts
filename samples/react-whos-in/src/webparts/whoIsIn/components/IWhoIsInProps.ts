export interface IWhoIsInProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  // items loaded from the WhoIsIn SharePoint list (optional)
  items?: any[];
}

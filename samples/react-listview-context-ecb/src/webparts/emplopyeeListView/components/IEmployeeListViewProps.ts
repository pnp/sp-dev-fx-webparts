import { SPHttpClient } from '@microsoft/sp-http';

export interface IEmployeeListViewProps {
  siteUrl: string;
  spHttpClient: SPHttpClient;
  isDarkTheme: boolean;
}

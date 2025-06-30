import {HttpClient} from '@microsoft/sp-http';

export interface IOurHotelsFinderProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  httpClient: HttpClient;
}

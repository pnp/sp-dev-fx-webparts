import { SPHttpClient } from '@microsoft/sp-http';

export interface IBirthdayCalendarViewProps {
  siteUrl: string;
  listName: string;
  dateFieldName: string;
  personFieldName: string;
  startWeekOnMonday: boolean;
  spHttpClient: SPHttpClient;
  isDarkTheme: boolean;
}

import { HttpClient } from '@microsoft/sp-http';

export interface IUpcomingMeetingsProps {
    title: string;
    httpClient: HttpClient;
    webPartId: string;
}

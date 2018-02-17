import { HttpClient } from '@microsoft/sp-http';

export interface IInvitationManagerProps {
    title: string;
    httpClient: HttpClient;
    webPartId: string;
}

import IOpenAiApiOptions from "../models/IOpenApiOptions";
import {HttpClient} from '@microsoft/sp-http';

export interface IChatStreamingProps {
  openApiOptions: IOpenAiApiOptions;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  httpClient: HttpClient;
}

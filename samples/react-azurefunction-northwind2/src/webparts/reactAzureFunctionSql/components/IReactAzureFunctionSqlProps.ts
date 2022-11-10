import { HttpClient } from "@microsoft/sp-http";

export interface IReactAzureFunctionSqlProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  httpclient: HttpClient;

  //Webpart Propreties
  funcurl: string;
}

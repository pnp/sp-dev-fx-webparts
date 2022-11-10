import { IHttpClient } from "mgwdev-m365-helpers";

export interface IReactQuerySampleProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphClient: IHttpClient;
}

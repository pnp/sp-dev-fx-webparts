import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IWebPartReportProps {
  description: string;
  displayOption: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteId: string;
  graphClient: MSGraphClientV3;
}

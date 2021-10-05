import { MSGraphClient } from "@microsoft/sp-http";
export interface ILeadAssistDashboardProps {
  isTeamsContext: boolean;
  siteUrl: string;
  graphClient: MSGraphClient;
}

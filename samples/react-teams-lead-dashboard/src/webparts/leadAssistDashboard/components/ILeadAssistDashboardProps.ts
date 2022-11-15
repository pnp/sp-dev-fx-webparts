import { MSGraphClientV3 } from "@microsoft/sp-http";
export interface ILeadAssistDashboardProps {
  isTeamsContext: boolean;
  siteUrl: string;
  graphClient: MSGraphClientV3;
}

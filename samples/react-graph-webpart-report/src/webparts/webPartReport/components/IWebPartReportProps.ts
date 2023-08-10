import { IGraphService } from "../../GraphService";

export interface IWebPartReportProps {
  description: string;
  displayOption: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteId: string;
  GraphService: IGraphService;
  
}

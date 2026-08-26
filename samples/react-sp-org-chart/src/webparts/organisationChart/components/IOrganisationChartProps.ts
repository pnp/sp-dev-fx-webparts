import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IOrganisationChartProps {
 isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  list: string;  
  gradientStart: string; 
  gradientEnd: string;
  webpartTitle:string
}

import { ServiceScope } from "@microsoft/sp-core-library";

export interface ISampleSiteFunctionProps {
  hasTeamsContext: boolean;
  userDisplayName: string;
  serviceScope: ServiceScope;
  isDarkTheme: boolean; 
}

import { SPService } from "../services/SPService";

export interface IReactSiteContentProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spService: SPService | undefined;
}

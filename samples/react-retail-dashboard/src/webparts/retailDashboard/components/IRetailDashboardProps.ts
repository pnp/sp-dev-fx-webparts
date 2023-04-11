import { IRetailDataService } from "../../../services/IRetailDataService";
import { ISettingsService } from "../../../services/ISettingsService";

export interface IRetailDashboardProps {
  retailDataService: IRetailDataService;
  settingsService: ISettingsService;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

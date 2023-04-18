import { IRetailDataService } from "../../../services/IRetailDataService";
import { ISettingsService } from "../../../services/ISettingsService";

export interface IRetailHomeProps {
  retailDataService: IRetailDataService;
  settingsService: ISettingsService;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

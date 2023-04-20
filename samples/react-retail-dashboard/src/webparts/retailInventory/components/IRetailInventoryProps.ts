import { IRetailDataService } from "../../../services/IRetailDataService";
import { ISettingsService } from "../../../services/ISettingsService";

export interface IRetailInventoryProps {
  retailDataService: IRetailDataService;
  settingsService: ISettingsService;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  productCode?: string;
}

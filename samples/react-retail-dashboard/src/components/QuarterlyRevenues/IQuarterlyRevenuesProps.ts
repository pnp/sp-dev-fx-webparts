import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IQuarterlyRevenuesProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
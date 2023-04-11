import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface ICurrentInventoryProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
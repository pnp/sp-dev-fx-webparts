import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IInventoryListProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
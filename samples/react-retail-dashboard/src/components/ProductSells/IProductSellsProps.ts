import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IProductSellsProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
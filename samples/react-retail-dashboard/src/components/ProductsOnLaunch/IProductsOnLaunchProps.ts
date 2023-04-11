import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IProductsOnLaunchProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
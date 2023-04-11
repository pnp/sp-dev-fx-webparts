import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface ITopSellerProductProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
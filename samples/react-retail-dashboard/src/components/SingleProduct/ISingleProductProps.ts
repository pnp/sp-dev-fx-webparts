import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface ISingleProductProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
    productCode: string;
}
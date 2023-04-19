import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IGlobalCustomerSatisfactionProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
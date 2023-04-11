import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface ICustomerSatisfactionProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
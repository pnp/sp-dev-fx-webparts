import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IReturnReasonsProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
}
import { IRetailDataService } from "../../services/IRetailDataService";
import { ISettingsService } from "../../services/ISettingsService";

export interface IReturnVolumesProps {
    retailDataService: IRetailDataService;
    settingsService: ISettingsService;
    maxMonths?: number;
    showDetails?: boolean;
}
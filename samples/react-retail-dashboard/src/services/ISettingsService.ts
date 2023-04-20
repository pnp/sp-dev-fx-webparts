import { RetailSettings } from "./RetailSettings";

/**
 * Defines the abstract interface for the Settings Service
 */
export interface ISettingsService {

    /**
     * Saves the settings
     */
    Save: (settings: RetailSettings) => Promise<void>;

    /**
     * Loads the settings
     */
    Load: () => Promise<RetailSettings>;

    /**
     * Retrieves the Teams App Id for deep linking
     */
    GetTeamsAppId: () => Promise<string>;
}
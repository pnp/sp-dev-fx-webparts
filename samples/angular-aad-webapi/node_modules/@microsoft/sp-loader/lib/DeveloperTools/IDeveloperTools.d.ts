/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file IDeveloperTools.ts
 */
import { IDeveloperToolsTab } from './IDeveloperToolsTab';
/**
 * Developer Tools interface.
 * It allows to register tabs in the developer tools.
 *
 * @alpha
 */
export interface IDeveloperTools {
    /**
     * Registers a tab in the developer tools.
     *
     * @param developerToolsTab - The tab definition.
     */
    registerDeveloperToolsTab(developerToolsTab: IDeveloperToolsTab): void;
    /**
     * Initializes the developer tools.
     */
    initialize(): void;
}

import { IDeveloperToolsTab } from './IDeveloperToolsTab';
export declare function initialize(): void;
/**
 * Registers a tab in the developer tools. The developer tools are invoked by pressing "CTRL+F12".
 *
 * @param developerToolsTab - The tab definition.
 *
 * @internal
 */
export declare function registerDeveloperToolsTab(developerToolsTab: IDeveloperToolsTab): void;
/**
 * Shows/hides the developer tools panel.
 *
 * @internal
 */
export declare function toggleDeveloperTools(): void;

import { IDeveloperTools } from './IDeveloperTools';
import { IDeveloperToolsTab } from './IDeveloperToolsTab';
export default class DeveloperTools implements IDeveloperTools {
    private static _instance;
    static readonly instance: DeveloperTools;
    initialize(): void;
    toggleDeveloperTools(): void;
    showHideDeveloperTools(show: boolean): void;
    registerDeveloperToolsTab(developerToolsTab: IDeveloperToolsTab): void;
}

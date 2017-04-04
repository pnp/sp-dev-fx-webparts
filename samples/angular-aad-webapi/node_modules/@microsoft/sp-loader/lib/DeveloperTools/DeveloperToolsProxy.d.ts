/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file DeveloperToolsProxy.ts
 */
import { IDeveloperToolsTab } from './IDeveloperToolsTab';
import { IDeveloperTools } from './IDeveloperTools';
/**
 * Developer tools.
 * Allows to register tabs in the developer tools.
 *
 * @alpha
 */
export default class DeveloperToolsProxy {
    private static _instance;
    /**
     * Initializes the developer tools with an implementation.
     * Must be called once before it can be used.
     */
    static initialize(developerToolsLoader: IDeveloperTools): void;
    /**
     * {@inheritdoc  IDeveloperTools.registerDeveloperToolsTab}
     */
    static registerDeveloperToolsTab(developerToolsTab: IDeveloperToolsTab): void;
}

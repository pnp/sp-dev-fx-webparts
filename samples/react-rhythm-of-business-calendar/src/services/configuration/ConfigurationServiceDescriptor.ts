import { IService, IServiceDescriptor, DirectoryService, DeveloperService, TimeZoneService, SharePointService, useServices, LiveUpdateService } from "common/services";
import { Configuration } from 'schema';
import { OnlineConfigurationService } from "./OnlineConfigurationService";

export const ConfigurationService: unique symbol = Symbol("Configuration Service");

export interface IConfigurationService extends IService {
    active: Configuration;

    readonly all: readonly Configuration[];
    getById(id: number): Configuration;

    track(entity: Configuration): void;
    persist(): Promise<void>;
}

export type ConfigurationServiceProp = {
    [ConfigurationService]: IConfigurationService;
};

export const useConfigurationService = () => useServices<ConfigurationServiceProp>()[ConfigurationService];

export const ConfigurationServiceDescriptor: IServiceDescriptor<typeof ConfigurationService, IConfigurationService, ConfigurationServiceProp> = {
    symbol: ConfigurationService,
    dependencies: [DirectoryService, DeveloperService, TimeZoneService, SharePointService, LiveUpdateService],
    online: OnlineConfigurationService
};
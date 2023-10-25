import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineDeveloperService } from "./OnlineDeveloperService";

export const DeveloperService: unique symbol = Symbol("Developer Service");

export interface IDeveloperService extends IService {
    registerScripts(scripts: {}): void;
}

export type DeveloperServiceProp = {
    [DeveloperService]: IDeveloperService;
};

export const useDeveloperService = () => useServices<DeveloperServiceProp>()[DeveloperService];

export const DeveloperServiceDescriptor: IServiceDescriptor<typeof DeveloperService, IDeveloperService, DeveloperServiceProp> = {
    symbol: DeveloperService,
    dependencies: [],
    online: OnlineDeveloperService
};
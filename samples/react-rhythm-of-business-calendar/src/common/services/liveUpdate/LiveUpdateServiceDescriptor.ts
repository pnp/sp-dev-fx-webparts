import { FastLoadFunctions, IListDefinition, IViewDefinition, ListItemCache, ListItemEntity } from "common/sharepoint";
import { DirectoryService } from "../directory";
import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineLiveUpdateService } from "./OnlineLiveUpdateService";

export const LiveUpdateService: unique symbol = Symbol("Live Update Service");

export interface ILiveUpdateService extends IService {
    register(list: IListDefinition, callback: () => void): void;
    begin(): Promise<void>;
    createCache<E extends ListItemEntity<any>>(view: IViewDefinition, functions: FastLoadFunctions<E>): ListItemCache<E>;
    purgeCaches(): Promise<boolean>;
}

export type LiveUpdateServiceProp = {
    [LiveUpdateService]: ILiveUpdateService;
};

export const useLiveUpdateService = () => useServices<LiveUpdateServiceProp>()[LiveUpdateService];

export const LiveUpdateServiceDescriptor: IServiceDescriptor<typeof LiveUpdateService, ILiveUpdateService, LiveUpdateServiceProp> = {
    symbol: LiveUpdateService,
    dependencies: [DirectoryService],
    online: OnlineLiveUpdateService
};

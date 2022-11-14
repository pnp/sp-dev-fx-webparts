import { IItem } from "@pnp/sp/items/types";
import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineDomainIsolationService } from "./OnlineDomainIsolationService";
import { MockDomainIsolationService } from "./MockDomainIsolationService";

export const DomainIsolationService: unique symbol = Symbol("Domain Isolation Service");

export interface IDomainIsolationService extends IService {
    readonly originalUrl: string;
    readonly currentSitePrimaryUrl: string;
    readonly currentPageListItem: IItem;
    readonly currentPageRelativeUrl: string;
    convertToAppDomainUrl(url: string): string;
    convertToPrimaryUrl(url: string): string;
    siteCompositeId(url: string): Promise<string>;
}

export type DomainIsolationServiceProp = {
    [DomainIsolationService]: IDomainIsolationService;
};

export const useDomainIsolationService = () => useServices<DomainIsolationServiceProp>()[DomainIsolationService];

export const DomainIsolationServiceDescriptor: IServiceDescriptor<typeof DomainIsolationService, IDomainIsolationService, DomainIsolationServiceProp> = {
    symbol: DomainIsolationService,
    dependencies: [],
    online: OnlineDomainIsolationService,
    test: MockDomainIsolationService
};
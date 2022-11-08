import { IItem } from "@pnp/sp/items/types";
import { IDomainIsolationService } from "./DomainIsolationServiceDescriptor";

export class MockDomainIsolationService implements IDomainIsolationService {
    public readonly currentSitePrimaryUrl: string;
    public readonly originalUrl: string;

    constructor() {
        this.originalUrl = window.location.href;
    }

    public async initialize(): Promise<void> {
    }

    public get currentPageListItem(): IItem {
        return null;
    }

    public get currentPageRelativeUrl(): string {
        return '/';
    }

    public convertToAppDomainUrl(url: string): string {
        return url;
    }

    public convertToPrimaryUrl(url: string): string {
        return url;
    }

    public async siteCompositeId(url: string): Promise<string> {
        return url;
    }
}
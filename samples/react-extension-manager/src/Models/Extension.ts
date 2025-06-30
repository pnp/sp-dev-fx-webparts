import { ListType } from "./ListType"
import { ExtensionLocation } from "./Location";

export interface IExtension {
    Id: number;
    Title: string;
    TenantWideExtensionComponentId: string;
    TenantWideExtensionComponentProperties: string;
    TenantWideExtensionListTemplate: ListType;
    TenantWideExtensionLocation: ExtensionLocation;
    TenantWideExtensionSequence: number;
    TenantWideExtensionDisabled: boolean;
}

export const CleanExtension: (item: Partial<IExtension>) => IExtension = (item: Partial<IExtension>) => ({
    Id: item.Id,
    Title: item.Title,
    TenantWideExtensionComponentId: item.TenantWideExtensionComponentId,
    TenantWideExtensionComponentProperties: item.TenantWideExtensionComponentProperties,
    TenantWideExtensionListTemplate: item.TenantWideExtensionListTemplate,
    TenantWideExtensionLocation: item.TenantWideExtensionLocation,
    TenantWideExtensionSequence: item.TenantWideExtensionSequence,
    TenantWideExtensionDisabled: item.TenantWideExtensionDisabled
})

export const ExtensionSelects = ["Id", "Title", "TenantWideExtensionComponentId", "TenantWideExtensionComponentProperties", "TenantWideExtensionListTemplate", "TenantWideExtensionLocation", "TenantWideExtensionSequence", "TenantWideExtensionDisabled"]
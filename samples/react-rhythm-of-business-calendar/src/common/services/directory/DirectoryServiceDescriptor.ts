import { SPBatch, PrincipalType } from "@pnp/sp";
import { IBasePermissions } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { RoleType, SharePointGroup } from "../../sharepoint";
import { User } from "../../User";
import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineDirectoryService } from "./OnlineDirectoryService";
import { MockDirectoryService } from "./MockDirectoryService";

export const DirectoryService: unique symbol = Symbol("Directory Service");

export interface IDirectoryService extends IService {
    readonly currentUser: User;
    readonly currentUserIsSiteAdmin: boolean;
    readonly currentUserEffectivePermissions: IBasePermissions;
    resolve(input: string[], web?: IWeb): Promise<User[]>;
    search(input: string, principalType?: PrincipalType): Promise<User[]>;
    ensureUsers(principals: User[], batch?: SPBatch, web?: IWeb): Promise<User[]>;
    roleDefinitionId(type: RoleType): Promise<number>;
    siteAdmins(): Promise<User[]>;
    siteOwnersGroup(web?: IWeb): Promise<SharePointGroup>;
    siteMembersGroup(web?: IWeb): Promise<SharePointGroup>;
    siteVisitorsGroup(web?: IWeb): Promise<SharePointGroup>;
    loadGroup(id: number, web?: IWeb): Promise<SharePointGroup>;
    findGroupByTitle(title: string, web?: IWeb): Promise<SharePointGroup>;
    persistGroup(group: SharePointGroup, web?: IWeb): Promise<void>;
    changeGroupOwner(group: SharePointGroup, owner: SharePointGroup | User): Promise<void>;
}

export type DirectoryServiceProp = {
    [DirectoryService]: IDirectoryService;
};

export const useDirectoryService = () => useServices<DirectoryServiceProp>()[DirectoryService];

export const DirectoryServiceDescriptor: IServiceDescriptor<typeof DirectoryService, IDirectoryService, DirectoryServiceProp> = {
    symbol: DirectoryService,
    dependencies: [],
    online: OnlineDirectoryService,
    test: MockDirectoryService
};
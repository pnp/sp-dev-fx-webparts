import { SPBatch, PrincipalType } from "@pnp/sp";
import { IBasePermissions } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { RoleType, SharePointGroup } from "../../sharepoint";
import { User } from "../../User";
import { IDirectoryService } from "./DirectoryServiceDescriptor";

export class MockDirectoryService implements IDirectoryService {
    private readonly _mockCurrentUser: User = new User(1, "Dev User", "user@dev.local", "dev.user@dev.local");

    public async initialize(): Promise<void> {
    }

    public get currentUser(): User {
        return this._mockCurrentUser;
    }

    public get currentUserIsSiteAdmin(): boolean {
        return true;
    }

    public get currentUserEffectivePermissions(): IBasePermissions {
        return { Low: Number.MAX_VALUE, High: Number.MAX_VALUE };
    }

    public async resolve(input: string[], web?: IWeb): Promise<User[]> {
        return input.map(val => new User(0, val, val, val));
    }

    public async search(input: string, principalType?: PrincipalType): Promise<User[]> {
        return [new User(0, input, input, input)];
    }

    public async ensureUsers(principals: User[], batch?: SPBatch, customWeb?: IWeb): Promise<User[]> {
        return principals;
    }

    public async roleDefinitionId(type: RoleType): Promise<number> {
        return 0;
    }

    public async siteAdmins(): Promise<User[]> {
        return [];
    }

    public async siteOwnersGroup(web?: IWeb): Promise<SharePointGroup> {
        return new SharePointGroup(1000, "Site Owners", [this.currentUser]);
    }

    public async siteMembersGroup(web?: IWeb): Promise<SharePointGroup> {
        return new SharePointGroup(1001, "Site Members", [this.currentUser]);
    }

    public async siteVisitorsGroup(web?: IWeb): Promise<SharePointGroup> {
        return new SharePointGroup(1002, "Site Visitors", [this.currentUser]);
    }

    public async loadGroup(id: number, web?: IWeb): Promise<SharePointGroup> {
        return new SharePointGroup(id, 'Custom Group', [this.currentUser]);
    }

    public async findGroupByTitle(title: string, web?: IWeb): Promise<SharePointGroup> {
        return new SharePointGroup(1002, title, [this.currentUser]);
    }

    public async persistGroup(group: SharePointGroup, web?: IWeb): Promise<void> {
    }

    public async changeGroupOwner(group: SharePointGroup, owner: SharePointGroup | User): Promise<void> {
    }
}
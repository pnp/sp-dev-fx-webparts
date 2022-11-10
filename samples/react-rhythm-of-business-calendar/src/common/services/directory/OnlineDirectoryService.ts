import { flatten } from "lodash";
import { sp, PrincipalType, PrincipalSource, SPBatch } from "@pnp/sp";
import { IBasePermissions } from "@pnp/sp/security/types";
import "@pnp/sp/site-groups";
import { ISiteGroup } from "@pnp/sp/site-groups/types";
import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import { IWeb } from "@pnp/sp/webs/types";
import "@pnp/sp/sputilities";
import { Guid } from "@microsoft/sp-core-library";
import { SPHttpClient, ISPHttpClientOptions } from "@microsoft/sp-http";
import { SPPermission } from "@microsoft/sp-page-context";
import { RoleType, SharePointGroup } from "../../sharepoint";
import { ErrorHandler } from "../../ErrorHandler";
import { User } from "../../User";
import { mapGetOrAdd, sanitizeSharePointGroupName, cloneWeb } from "../../Utils";
import { ServiceContext } from "../IService";
import { SpfxContext } from "../SpfxContext";
import { IDirectoryService } from "./DirectoryServiceDescriptor";

const adminPermissionsCheck = [
    SPPermission.applyThemeAndBorder,
    SPPermission.approveItems,
    SPPermission.createGroups,
    SPPermission.layoutsPage,
    SPPermission.manageLists,
    SPPermission.managePermissions,
    SPPermission.manageWeb
];

export class OnlineDirectoryService implements IDirectoryService {
    private readonly _siteId: Guid;
    private readonly _webAbsoluteUrl: string;
    private readonly _spHttpClient: SPHttpClient;
    private readonly _currentUser: User;
    private readonly _currentUserPermissions: SPPermission;
    private readonly _resolveCache = new Map<string, Promise<User[]>>();
    private readonly _searchCache = new Map<string, Promise<User[]>>();
    private readonly _ensureUserCache = new Map<string, Promise<User>>();
    private readonly _roleDefinitionIdCache = new Map<RoleType, Promise<number>>();

    constructor({
        [SpfxContext]: { pageContext, spHttpClient }
    }: ServiceContext) {
        const { site, web, user } = pageContext;
        this._siteId = site.id;
        this._webAbsoluteUrl = web.absoluteUrl;
        this._spHttpClient = spHttpClient;
        this._currentUser = User.fromSPUser(user);
        this._currentUserPermissions = web.permissions;
    }

    public async initialize(): Promise<void> {
    }

    public get currentUser(): User {
        return this._currentUser;
    }

    public get currentUserIsSiteAdmin(): boolean {
        return this._currentUserPermissions.hasAllPermissions(...adminPermissionsCheck);
    }

    public get currentUserEffectivePermissions(): IBasePermissions {
        return this._currentUserPermissions.value;
    }

    public async resolve(inputs: string[], web?: IWeb): Promise<User[]> {
        web = cloneWeb(web);
        inputs = inputs || [];

        const batch = web.createBatch();
        const principalGroupPromises = Promise.all(inputs.map(input => this._resolveCore(input, batch)));
        await batch.execute();

        return flatten(await principalGroupPromises);
    }

    private readonly _resolveCore = async (input: string, batch?: SPBatch): Promise<User[]> => {
        if (input === null || input.length === 0) {
            return [];
        }

        return mapGetOrAdd(this._resolveCache, input, async () => {
            const batchedUtility = batch ? sp.utility.inBatch(batch) : sp.utility;
            const results = await batchedUtility.expandGroupsToPrincipals([input]);
            return results.map(User.fromPrincipalInfo);
        });
    }

    public search(input: string, principalType: PrincipalType = PrincipalType.All): Promise<User[]> {
        return mapGetOrAdd(this._searchCache, input, async () => {
            const results = await sp.utility.searchPrincipals(input, principalType, PrincipalSource.All, "", 10);
            return results.map(User.fromPrincipalInfo);
        });
    }

    public ensureUsers(users: User[], batch?: SPBatch, web?: IWeb): Promise<User[]> {
        web = cloneWeb(web);
        const batchedWeb = batch ? web.inBatch(batch) : web;

        const ensureUserPromises = users.map(async user => {
            const ensuredUser = await this._ensureUserCore(user, batchedWeb);
            user.updateId(ensuredUser.id);
            return ensuredUser;
        });

        return Promise.all(ensureUserPromises);
    }

    private _ensureUserCore(user: User, web: IWeb): Promise<User> {
        return mapGetOrAdd(this._ensureUserCache, user.email, async () => {
            if (!(user.id && user.id > 0)) {
                const result = await web.ensureUser(user.email);
                user.updateId(result.data.Id);
                user.updateLogin(result.data.LoginName);
            }
            return user;
        });
    }

    public async ensureLogin(users: readonly User[], web?: IWeb): Promise<User[]> {
        web = cloneWeb(web);
        const batch = web.createBatch();
        const ensureLoginPromises = Promise.all(users.map(user => this._ensureLoginCore(user, batch)));
        await batch.execute();
        return ensureLoginPromises;
    }

    private _ensureLoginCore = async (user: User, batch?: SPBatch): Promise<User> => {
        if (user.login) {
            return user;
        } else {
            const resolvedUsers = await this._resolveCore(user.email, batch);
            if (resolvedUsers.length > 1) throw Error(`Login for ${user.title} (${user.email}) cannot be resolved unambiguously`);
            user.updateLogin(resolvedUsers[0].login);
        }
    }

    public async roleDefinitionId(type: RoleType, web?: IWeb): Promise<number> {
        web = cloneWeb(web);

        if (type === RoleType.None) return null;

        return mapGetOrAdd(this._roleDefinitionIdCache, type, async () => {
            const definition = await sp.web.roleDefinitions.getByType(type).get();
            return definition.Id;
        });
    }

    public async siteAdmins(): Promise<User[]> {
        const siteUsers = await sp.web.siteUsers();
        return siteUsers.filter(r => r.IsSiteAdmin && r.PrincipalType === PrincipalType.User).map(User.fromSiteUserInfo);
    }

    public async siteOwnersGroup(web?: IWeb): Promise<SharePointGroup> {
        web = cloneWeb(web);
        const id = (await web.associatedOwnerGroup()).Id;
        return this._loadSiteGroup(web.siteGroups.getById(id), web);
    }

    public async siteMembersGroup(web?: IWeb): Promise<SharePointGroup> {
        web = cloneWeb(web);
        const id = (await web.associatedMemberGroup()).Id;
        return this._loadSiteGroup(web.siteGroups.getById(id), web);
    }

    public async siteVisitorsGroup(web?: IWeb): Promise<SharePointGroup> {
        web = cloneWeb(web);
        const id = (await web.associatedVisitorGroup()).Id;
        return this._loadSiteGroup(web.siteGroups.getById(id), web);
    }

    public async loadGroup(id: number, web?: IWeb): Promise<SharePointGroup> {
        web = cloneWeb(web);
        return this._loadSiteGroup(web.siteGroups.getById(id), web);
    }

    public async findGroupByTitle(title: string, web?: IWeb): Promise<SharePointGroup> {
        try {
            web = cloneWeb(web);
            const sanitizedTitle = sanitizeSharePointGroupName(title);
            return await this._loadSiteGroup(web.siteGroups.getByName(sanitizedTitle), web);
        } catch (e) {
            return null; // group does not exist
        }
    }

    private async _loadSiteGroup(siteGroup: ISiteGroup, web: IWeb): Promise<SharePointGroup> {
        const batch = web.createBatch();

        const results = Promise.all([
            siteGroup.inBatch(batch)(),
            siteGroup.users.inBatch(batch)()
        ]);

        await batch.execute();
        const [groupResult, userResults] = await results;
        const users = userResults.map(User.fromSiteUserInfo);

        return new SharePointGroup(groupResult.Id, groupResult.LoginName, users);
    }

    public async persistGroup(group: SharePointGroup, web?: IWeb): Promise<void> {
        web = cloneWeb(web);

        if (group.hasChanges() && group.isDeleted && !group.isNew) {
            await web.siteGroups.removeById(group.id);
        }
        else if (group.hasChanges() && !group.isDeleted) {
            if (group.hasMetadataChanges()) {
                const sanitizedTitle = sanitizeSharePointGroupName(group.title);
                const groupProperties = {
                    Title: sanitizedTitle,
                    Description: group.description,
                    AllowRequestToJoinLeave: group.allowRequestToJoinLeave,
                    AutoAcceptRequestToJoinLeave: group.autoAcceptRequestToJoinLeave,
                    RequestToJoinLeaveEmailSetting: group.requestToJoinLeaveEmailSetting,
                    AllowMembersEditMembership: group.allowMembersEditMembership,
                    OnlyAllowMembersViewMembership: group.onlyAllowMembersViewMembership
                };

                if (group.isNew) {
                    const saveResult = await web.siteGroups.add(groupProperties);
                    group.setId(saveResult.data.Id);
                } else {
                    await web.siteGroups.getById(group.id).update(groupProperties);
                }
            }

            if (group.hasMembershipChanges()) {
                const membersDifference = group.membersDifference();

                await this.ensureLogin(membersDifference.added);

                const eh = new ErrorHandler();
                const usersBatch = web.createBatch();
                const batchedGroupUsers = web.siteGroups.getById(group.id).users.inBatch(usersBatch);
                membersDifference.added.forEach(({ login }) =>
                    batchedGroupUsers.add(login).catch(eh.catch)
                );
                membersDifference.removed.forEach(({ id }) =>
                    batchedGroupUsers.removeById(id).catch(eh.catch)
                );
                await usersBatch.execute();
                eh.throwIfError();
            }
        }

        group.immortalize();
    }

    public async changeGroupOwner(group: SharePointGroup, owner: SharePointGroup | User): Promise<void> {
        const rootId = '740c6a0b-85e2-48a0-a494-e0f1759d4aa7';
        const processQuery = `${this._webAbsoluteUrl}/_vti_bin/client.svc/ProcessQuery`;
        const ownerType = owner instanceof SharePointGroup ? 'g' : 'u';

        const options: ISPHttpClientOptions = {
            body:
                `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
                <Actions>
                    <SetProperty Id="1" ObjectPathId="2" Name="Owner">
                        <Parameter ObjectPathId="3" />
                    </SetProperty>
                    <Method Name="Update" Id="4" ObjectPathId="2" />
                </Actions>
                <ObjectPaths>
                    <Identity Id="2" Name="${rootId}:site:${this._siteId.toString()}:g:${group.id}" />
                    <Identity Id="3" Name="${rootId}:site:${this._siteId.toString()}:${ownerType}:${owner.id}" />
                </ObjectPaths>
            </Request>`
        };

        await this._spHttpClient.post(processQuery, SPHttpClient.configurations.v1, options);
    }
}
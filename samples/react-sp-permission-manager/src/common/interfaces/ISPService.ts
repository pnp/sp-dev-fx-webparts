import { type ISiteGroupInfo } from '@pnp/sp/site-groups';
import { ICreateGroupPayload, ICurrentUserPermissions, IPermissionLevel, IUpdateGroupPayload } from './IGroup';
import { IBulkAddUsersResult, IBulkUserInput } from './IBulk';
import { IPrincipalListItem, IPrincipalSearchOptions } from './IPrincipal';
import { ICreateOrUpdateUserPayload, IUserListItem } from './IUser';

export interface IPrincipalWithPermissions {
  Id: number;
  Title: string;
  LoginName: string;
  PrincipalType: number; // 1 = User, 8 = SP Group
  Email?: string;
  Description?: string;
  OwnerTitle?: string;
  IsHiddenInUI?: boolean;
  IsSiteAdmin?: boolean;
  AllowMembersEditMembership?: boolean;
  AllowRequestToJoinLeave?: boolean;
  AutoAcceptRequestToJoinLeave?: boolean;
  OnlyAllowMembersViewMembership?: boolean;
  RequestToJoinLeaveEmailSetting?: string;
   /** For group principals, indicates whether the current user can view this group's membership. */
   canCurrentUserViewMembership?: boolean;
  permissionLevelNames: string[];
}

export interface IUserSitePermissions {
  id: number;
  loginName: string;
  displayName: string;
  directPermissions: Array<{ permissionLevelId: number; permissionLevelName: string }>;
  groupMemberships: Array<{ groupId: number; groupTitle: string; permissionLevelNames: string[]; isDirectMember: boolean; canEditMembership: boolean }>;
}

interface IClientPeoplePickerEntityData {
  Email?: string;
  AccountName?: string;
  SPUserID?: string;
  SPGroupID?: string;
  PrincipalType?: string;
}

export interface IClientPeoplePickerEntity {
  Key?: string;
  DisplayText?: string;
  Description?: string;
  EntityType?: string;
  EntityData?: IClientPeoplePickerEntityData;
}

export interface IShareObjectUserPrincipal {
  Key: string;
  DisplayText: string;
  IsResolved: boolean;
  Description: string;
  EntityType: 'User';
  EntityData: {
    Email: string;
  };
  ProviderName: string;
  ProviderDisplayName: string;
  Resolved: boolean;
}

export interface ISPService {
  searchPrincipals(searchText: string, options?: IPrincipalSearchOptions): Promise<IPrincipalListItem[]>;
  getUsers(searchText?: string): Promise<IUserListItem[]>;
  addUser(payload: ICreateOrUpdateUserPayload): Promise<IUserListItem>;
  updateUser(userId: number, payload: ICreateOrUpdateUserPayload): Promise<IUserListItem>;
  deleteUser(userId: number): Promise<void>;
  getGroupsForUser(userId: number): Promise<ISiteGroupInfo[]>;
  getGroups(searchText?: string): Promise<ISiteGroupInfo[]>;
  getGroupsWithPermissions(): Promise<Array<ISiteGroupInfo & { permissionLevelNames: string[] }>>;
  getAllPrincipalsWithPermissions(): Promise<IPrincipalWithPermissions[]>;
  createGroup(payload: ICreateGroupPayload): Promise<ISiteGroupInfo>;
  updateGroup(groupId: number, payload: IUpdateGroupPayload): Promise<ISiteGroupInfo>;
  deleteGroup(groupId: number): Promise<void>;
  getUsersInGroup(groupId: number): Promise<IUserListItem[]>;
  getGroupOwner(groupId: number): Promise<IPrincipalListItem | undefined>;
  getCurrentUserPermissions(): Promise<ICurrentUserPermissions>;
  getGroupPermissions(groupId: number): Promise<IPermissionLevel[]>;
  getPermissionLevels(searchText?: string): Promise<IPermissionLevel[]>;
  setGroupPermissions(groupId: number, permissionLevelIds: number[]): Promise<void>;
  createPermissionLevel(name: string, description: string, basePermissionsLow: number, basePermissionsHigh: number): Promise<IPermissionLevel>;
  updatePermissionLevel(id: number, name: string, description: string, basePermissionsLow: number, basePermissionsHigh: number): Promise<void>;
  deletePermissionLevel(id: number): Promise<void>;
  addUserToGroup(groupId: number, userEmailOrLoginName: string): Promise<void>;
  removeUserFromGroup(groupId: number, userId: number): Promise<void>;
  removeUsersFromGroup(groupId: number, userIds: number[]): Promise<void>;
  changeUserPermissions(userEmailOrLoginName: string, permissionLevelIds: number[]): Promise<void>;
  removeUserPermissionsFromSite(userId: number): Promise<void>;
  grantPermissionsToUsers(loginNames: string[], mode: 'group' | 'direct', groupIdOrPermLevelIds: number[]): Promise<void>;
  getUserPermissionsOnSite(loginName: string): Promise<IUserSitePermissions>;
  bulkAddUsers(
    users: IBulkUserInput[],
    onProgress?: (processed: number, total: number) => void
  ): Promise<IBulkAddUsersResult>;
  bulkAddUsersToGroup(
    groupId: number,
    users: IBulkUserInput[],
    onProgress?: (processed: number, total: number) => void,
    options?: {
      sendEmail?: boolean;
      emailSubject?: string;
      emailBody?: string;
    }
  ): Promise<IBulkAddUsersResult>;
}
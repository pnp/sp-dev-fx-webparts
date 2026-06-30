export interface IGroupListItem {
  id: number;
  name: string;
  description: string;
  owner: string;
  loginName: string;
}

export interface IPermissionLevel {
  id: number;
  name: string;
  description: string;
  roleTypeKind: number;
  order: number;
  /** Lower 32 bits of the BasePermissions mask */
  basePermissionsLow: number;
  /** Upper 32 bits of the BasePermissions mask */
  basePermissionsHigh: number;
}

export interface IOwnerInfo {
  id: number | string;
  principalType: 'User' | 'Group';
  loginName: string;
}

export interface ICreateGroupPayload {
  name: string;
  description?: string;
  owner?: IOwnerInfo;
  permissionLevelIds?: number[];
  onlyAllowMembersViewMembership?: boolean;
  allowMembersEditMembership?: boolean;
  allowRequestToJoinLeave?: boolean;
  autoAcceptRequestToJoinLeave?: boolean;
  requestToJoinLeaveEmailSetting?: string;
}

export interface IUpdateGroupPayload {
  name?: string;
  description?: string;
  owner?: IOwnerInfo;
  permissionLevelIds?: number[];
  onlyAllowMembersViewMembership?: boolean;
  allowMembersEditMembership?: boolean;
  allowRequestToJoinLeave?: boolean;
  autoAcceptRequestToJoinLeave?: boolean;
  requestToJoinLeaveEmailSetting?: string;
}

export interface ICurrentUserPermissions {
  canManageGroups: boolean;
}
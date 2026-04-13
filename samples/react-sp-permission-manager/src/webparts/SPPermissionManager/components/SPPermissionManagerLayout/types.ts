import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type { IPrincipalListItem, IPrincipalWithPermissions } from '../../../../common/interfaces';
import type { TGroupEditorMode } from '../GroupEditorPanel/types';
import type { ISPPermissionManagerFeatureOptions } from '../ISPPermissionManagerProps';

/** Flat shape used for the list view — covers both users and SP groups */
export interface IPrincipalPermissionItem extends IPrincipalWithPermissions {
  permissionLevels: string;
  principalTypeLabel: string;
}

/** Kept for backward compatibility with GroupDeleteDialog and GroupEditorPanel imports */
export type IGroupListViewItem = IPrincipalPermissionItem;

export interface ISPPermissionManagerLayoutProps {
  context: WebPartContext;
  featureOptions: ISPPermissionManagerFeatureOptions;
}

/** Pure helper — convert a principals-list item to the shape PeoplePicker / dialogs expect */
export const toPrincipalListItem = (item: IPrincipalPermissionItem): IPrincipalListItem => ({
  key: item.Id.toString(),
  id: item.Id,
  displayName: item.Title,
  secondaryText: item.Email ?? '',
  principalType: 'User',
  loginName: item.LoginName,
  email: item.Email
});

export interface ISPPermissionManagerLayoutState {
  groupItems: IPrincipalPermissionItem[];
  isGroupsLoading: boolean;
  selectedGroupIds: Set<string>;
  isGroupEditorOpen: boolean;
  isGroupUsersOpen: boolean;
  groupEditorMode: TGroupEditorMode;
  clickedGroup: IPrincipalPermissionItem | undefined;
  actionError: string;
  canManageGroups: boolean;
  isPermissionsLoading: boolean;
  isDeleteDialogOpen: boolean;
  isGrantPermissionsOpen: boolean;
  grantPermissionsMode: 'grant' | 'edit';
  editPermissionsUsers: IPrincipalListItem[];
  isCheckPermissionsOpen: boolean;
  isPermissionLevelsOpen: boolean;
  activeGroupForUsers: IPrincipalPermissionItem | undefined;
}

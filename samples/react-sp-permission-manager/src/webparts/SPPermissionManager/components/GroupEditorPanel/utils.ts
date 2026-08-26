import type { IPermissionLevel } from '../../../../common/interfaces';
import type { ISiteGroupInfo } from '@pnp/sp/site-groups';
import type { TGroupEditorMode, IGroupFormState } from './types';

export const createInitialState = (group?: ISiteGroupInfo): IGroupFormState => ({
  name: group?.Title ?? '',
  description: group?.Description ?? '',
  permissionLevelIds: [],
  onlyAllowMembersViewMembership: group?.OnlyAllowMembersViewMembership ?? false,
  allowMembersEditMembership: group?.AllowMembersEditMembership ?? false,
  allowRequestToJoinLeave: group?.AllowRequestToJoinLeave ?? true,
  autoAcceptRequestToJoinLeave: group?.AutoAcceptRequestToJoinLeave ?? false
});

export const getPermissionLevelId = (permissionLevel: IPermissionLevel): number =>
  permissionLevel.id;

export const getDrawerTitle = (
  mode: TGroupEditorMode,
  readOnly: boolean,
  groupTitle: string | undefined
): string => {
  if (mode === 'add') return 'Add Group';
  if (readOnly) return `View Group: ${groupTitle ?? ''}`;
  return `Edit Group: ${groupTitle ?? ''}`;
};

export const getSubmitButtonLabel = (isSaving: boolean, mode: TGroupEditorMode): string => {
  if (isSaving) return 'Saving...';
  if (mode === 'add') return 'Create Group';
  return 'Save Changes';
};

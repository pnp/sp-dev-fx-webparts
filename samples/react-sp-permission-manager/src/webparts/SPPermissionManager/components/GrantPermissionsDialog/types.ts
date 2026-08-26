import type { IPermissionLevel, IPrincipalListItem, ISPService } from '../../../../common/interfaces';
import type { ISiteGroupInfo } from '@pnp/sp/site-groups';

export type TPermissionMode = 'group' | 'direct';

export interface IGrantPermissionsDialogProps {
  open: boolean;
  /** 'grant' for new permissions, 'edit' to change existing permissions of pre-selected users */
  mode: 'grant' | 'edit';
  /** Pre-populated users (used in edit mode) */
  preSelectedUsers?: IPrincipalListItem[];
  spService: ISPService;
  onClose: () => void;
  onCompleted: () => void;
}

export interface IGrantPermissionsDialogState {
  selectedPeople: IPrincipalListItem[];
  permissionMode: TPermissionMode;
  groups: ISiteGroupInfo[];
  permissionLevels: IPermissionLevel[];
  selectedGroupIds: number[];
  sharedPermLevelIds: number[];
  sameForAll: boolean;
  individualPerms: Map<string, number[]>;
  /** loginName → current permission level names (edit mode display only) */
  currentPermNames: Map<string, string[]>;
  isLoading: boolean;
  isSubmitting: boolean;
  feedback: string;
}

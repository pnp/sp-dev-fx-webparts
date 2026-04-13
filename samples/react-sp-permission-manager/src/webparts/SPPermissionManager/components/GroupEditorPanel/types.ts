import type { IPermissionLevel, IPrincipalListItem, ISPService } from '../../../../common/interfaces';
import type { ISiteGroupInfo } from '@pnp/sp/site-groups';

export type TGroupEditorMode = 'add' | 'edit';

export interface IGroupFormState {
  name: string;
  description: string;
  ownerUserId?: number;
  permissionLevelIds: number[];
  onlyAllowMembersViewMembership: boolean;
  allowMembersEditMembership: boolean;
  allowRequestToJoinLeave: boolean;
  autoAcceptRequestToJoinLeave: boolean;
}

export interface IGroupEditorPanelProps {
  open: boolean;
  mode: TGroupEditorMode;
  spService: ISPService;
  group?: ISiteGroupInfo;
  readOnly?: boolean;
  /** When false, the Delete Group button is shown but disabled. Defaults to !readOnly. */
  canDelete?: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export interface IGroupEditorPanelState {
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  hasTriedToSubmit: boolean;
  isDeleteDialogOpen: boolean;
  permissionLevels: IPermissionLevel[];
  selectedOwner: IPrincipalListItem[];
  formState: IGroupFormState;
}

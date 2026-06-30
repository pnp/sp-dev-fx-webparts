import type { ISPService, IPrincipalListItem, IUserSitePermissions } from '../../../../common/interfaces';

export interface ICheckPermissionsDialogProps {
  open: boolean;
  spService: ISPService;
  canManage: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

export interface ICheckPermissionsDialogState {
  selectedUser: IPrincipalListItem[];
  isLoading: boolean;
  result: IUserSitePermissions | undefined;
  feedback: string;
  successMessage: string;
  removingKey: string | undefined;
  confirmGroup: { groupId: number; groupTitle: string } | undefined;
  hasChanges: boolean;
}

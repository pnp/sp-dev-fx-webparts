import type { IUserListItem, IPrincipalListItem, ISPService } from '../../../../common/interfaces';
import type { ISiteGroupInfo } from '@pnp/sp/site-groups';

export interface IGroupUsersPanelProps {
  open: boolean;
  group?: ISiteGroupInfo;
  spService: ISPService;
  canManageUsers?: boolean;
  onClose: () => void;
}

export interface IAddUsersDialogProps {
  open: boolean;
  group: ISiteGroupInfo;
  spService: ISPService;
  onClose: () => void;
  onAdded: () => void;
}

export interface IImportResult {
  validEmails: string[];
  invalidEmails: string[];
}

export interface IImportColumnOption {
  key: string;
  label: string;
}

export interface IGroupUsersPanelState {
  users: IUserListItem[];
  isLoading: boolean;
  error: string;
  selectedUserIds: Set<string>;
  isAddDialogOpen: boolean;
  // deletion confirmation dialog
  confirmDialogOpen: boolean;
  confirmItems: Array<{ id: string; title: string }>;
  suppressSuccessModal: boolean; // Added to manage modal suppression
}

export interface IAddUsersDialogState {
  selectedPeople: IPrincipalListItem[];
  importedEmails: string[];
  invalidEmails: string[];
  importRows: string[][];
  importColumnOptions: IImportColumnOption[];
  selectedImportColumnKey: string;
  sendEmail: boolean;
  emailMessage: string;
  isSubmitting: boolean;
  feedback: string;
}

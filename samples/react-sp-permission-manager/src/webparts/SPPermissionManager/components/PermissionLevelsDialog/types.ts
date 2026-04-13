import type { IPermissionLevel, ISPService } from '../../../../common/interfaces';

export interface IPermissionLevelsDialogProps {
  open: boolean;
  spService: ISPService;
  canManage: boolean;
  onClose: () => void;
}

export interface IPermissionLevelEditorPanelProps {
  open: boolean;
  /**
   * Mode:
   * - 'new'  : start from a blank definition
   * - 'copy' : pre-fills name with "Copy of…" and permissions from source
   * - 'edit' : edits the existing definition in-place
   */
  mode: 'new' | 'copy' | 'edit';
  /** The permission level to base this editor on */
  sourcePermissionLevel: IPermissionLevel | undefined;
  spService: ISPService;
  canManage: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export interface IPermissionLevelsDialogState {
  permissionLevels: IPermissionLevel[];
  isLoading: boolean;
  feedback: string;
  editorOpen: boolean;
  editorMode: 'copy' | 'edit' | 'new';
  editorSource: IPermissionLevel | undefined;
  confirmDeleteItem: IPermissionLevel | undefined;
}

export interface IPermissionLevelEditorPanelState {
  name: string;
  description: string;
  permLow: number;
  permHigh: number;
  isSaving: boolean;
  feedback: string;
  showDeleteConfirm: boolean;
}

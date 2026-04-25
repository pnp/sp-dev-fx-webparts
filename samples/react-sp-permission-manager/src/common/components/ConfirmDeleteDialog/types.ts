export type TDialogMode = 'access-denied' | 'confirm' | 'deleting' | 'result';

export interface IDeleteItem {
  id: string | number;
  title: string;
}

export interface IDeleteResult {
  item: IDeleteItem;
  success: boolean;
  error?: string;
}

export interface IConfirmDeleteDialogProps {
  /** Controls dialog visibility */
  open: boolean;
  /** Items to delete */
  items: IDeleteItem[];
  /** Whether the current user has permission to delete */
  canDelete: boolean;
  /**
   * Singular entity name shown in messages, e.g. "group", "user".
   * Defaults to "item".
   */
  entityName?: string;
  /**
   * Plural entity name used when multiple items are selected.
   * Defaults to `entityName + "s"`.
   */
  entityNamePlural?: string;
  /**
   * Custom message shown in the access-denied state.
   * Defaults to a generic permission message.
   */
  accessDeniedMessage?: string;
  /**
   * Called once per item to perform the actual deletion.
   * Throw to signal failure for a specific item.
   */
  onDelete: (item: IDeleteItem) => Promise<void>;
  /** Called when the dialog should close (cancel / Close button) */
  onClose: () => void;
  /** Called after at least one deletion succeeded — use to refresh data */
  onCompleted: () => void;
  /**
   * When true, the dialog will not show the results view after a successful
   * deletion. Useful for single-item deletes where a brief success modal
   * is undesirable; the dialog will simply close instead. Defaults to false.
   */
  suppressSuccessModal?: boolean;
}

export interface IConfirmDeleteDialogState {
  mode: TDialogMode;
  deleteResults: IDeleteResult[];
  deletingLabel: string;
}

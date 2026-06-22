import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';

export interface IBookmarkLabelManagerState {
  isFormDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  editingLabel: Partial<IBookmarkLabel> | undefined;
  editingIndex: number | undefined;
  labelToDelete: { label: IBookmarkLabel; index: number } | undefined;
  nameError: string;
  colorError: string;
  deleteError: string;
}

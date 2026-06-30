import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';

export interface IBookmarkGroupManagerState {
  isFormDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  editingGroup: Partial<IBookmarkGroup> | undefined;
  groupToDelete: IBookmarkGroup | undefined;
  nameError: string;
}

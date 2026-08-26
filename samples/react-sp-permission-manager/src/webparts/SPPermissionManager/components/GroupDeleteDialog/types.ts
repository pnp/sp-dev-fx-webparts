import type { ISPService } from '../../../../common/interfaces';
import type { IGroupListViewItem } from '../SPPermissionManagerLayout';

export interface IGroupDeleteDialogProps {
  open: boolean;
  groups: IGroupListViewItem[];
  canManageGroups: boolean;
  spService: ISPService;
  onClose: () => void;
  onCompleted: () => void;
}

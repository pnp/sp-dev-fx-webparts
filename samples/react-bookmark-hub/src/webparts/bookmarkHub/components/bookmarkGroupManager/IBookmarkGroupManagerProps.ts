import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';

export interface IBookmarkGroupManagerProps {
  groups: IBookmarkGroup[];
  onGroupsChanged: (groups: IBookmarkGroup[]) => void;
}

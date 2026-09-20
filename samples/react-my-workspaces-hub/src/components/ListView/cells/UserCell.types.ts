import type { IListViewUser } from '../interfaces/IListView';

export interface IUserCellProps {
  users: IListViewUser[];
  showAvatar?: boolean;
  showSecondary?: boolean;
  showHoverCard?: boolean;
  avatarSize?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64;
}

export interface IUserHoverContentProps {
  user: IListViewUser;
}

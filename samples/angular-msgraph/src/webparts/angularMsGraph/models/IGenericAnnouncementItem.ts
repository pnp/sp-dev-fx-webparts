import { ICreatedBy, IUser } from './IListCollection';
import { IAnnouncements } from './IAnnouncements';

export interface IGenericAnnouncementItem {
  createdBy: ICreatedBy
  createdDateTime: Date;
  eTag: string;
  id: string;
  lastModifiedBy: IUser;
  webUrl: string;
  listItemId: number;
  columnSet: IAnnouncements;
}
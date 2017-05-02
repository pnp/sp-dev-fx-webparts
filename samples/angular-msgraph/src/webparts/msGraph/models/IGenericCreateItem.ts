import { ICreatedBy, IUser } from './IListCollection';

export interface IGenericCreateItem {
  createdBy: ICreatedBy;
  createDateTime: Date;
  eTag: string;
  id: string;
  lastModifiedBy: IUser;
  lastModifiedDateTime: Date;
  listItemId: number;
  webUrl: string;
}
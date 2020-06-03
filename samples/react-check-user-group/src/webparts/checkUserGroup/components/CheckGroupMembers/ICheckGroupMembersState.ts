import { IUserItem } from "../../../../Common/IUserItem";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface ICheckGroupMembersState {
  userItems: IUserItem[];
  columns: IColumn[];
  memberStatus: string;
  loading: boolean;
}
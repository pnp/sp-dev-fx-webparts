import { IUserInfo } from "../../models";

export interface IPersonCardProps {
  userInfo: IUserInfo;
  onUserSelected: (user: IUserInfo) => void;
  selectedUser?: IUserInfo;
  showActionsBar?: boolean;
}

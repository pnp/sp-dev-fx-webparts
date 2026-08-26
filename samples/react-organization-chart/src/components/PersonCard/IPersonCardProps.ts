import { IUserInfo } from "../../models";
import { SPFI } from "@pnp/sp";

export interface IPersonCardProps {
  userInfo: IUserInfo;
  onUserSelected: (user: IUserInfo) => void;
  selectedUser?: IUserInfo;
  showActionsBar?: boolean;
  sp: SPFI;
}

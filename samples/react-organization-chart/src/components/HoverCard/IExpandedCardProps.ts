import { IUserInfo } from "../../models/IUserInfo";
import { SPFI } from "@pnp/sp";

export interface IExpandedCardProps {
  user: IUserInfo;
  sp: SPFI;
}

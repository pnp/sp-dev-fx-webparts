import { IUser } from "./IUser";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAppContext {
  currentUser: IUser;
  context: WebPartContext;
}

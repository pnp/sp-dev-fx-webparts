import { IUser } from './IUser';
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IHappyBirthdayProps {
  users: IUser[];
  imageTemplate: string;
}

import { IUser } from "./IUser";
export interface IUserExtended extends IUser {
    count: number;
    pictureBase64: string;
}

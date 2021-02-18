import { IUser } from "./IUser";
import { IUserPresence } from "./IUserPresence";
export interface IUserExtended extends IUser, IUserPresence {
    count: number;
    pictureBase64: string;
}

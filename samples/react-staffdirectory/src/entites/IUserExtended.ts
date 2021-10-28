import { IUser } from "./IUser";
import { IUserPresence } from "./IUserPresence";
import { IUserBio } from "./IUserBio";
export interface IUserExtended extends IUser, IUserPresence, IUserBio {
    count: number;
    pictureBase64: string;
}

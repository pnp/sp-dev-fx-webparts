import { User } from "./User";

export interface IUserListChanges {
    added: User[];
    removed: User[];
}
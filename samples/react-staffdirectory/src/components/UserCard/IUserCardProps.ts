import { IUserExtended } from "../../entites/IUserExtended";
export interface IUserCardProps {
    userData: IUserExtended;
    updateUsersPresence:boolean;
    userAttributes: string[];
}

import { IUserExtended } from "../../entites/IUserExtended";

export interface IStaffDirectoryState {
  isLoading: boolean;
  listUsers: IUserExtended[];
  hasError:boolean;
  errorMessage:string;
  updateUsersPresence:boolean;
  nextPageLink:string;
  isLoadingNextPage:boolean;
}

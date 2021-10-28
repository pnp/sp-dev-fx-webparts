import { IUserExtended } from "../../entites/IUserExtended";

export interface IStaffDirectoryState {
  isLoading: boolean;
  listUsers: IUserExtended[];
  hasError:boolean;
  errorMessage:string;
  isLoadingNextPage:boolean;
  currentPage?: number;
  totalPages?:number;
}

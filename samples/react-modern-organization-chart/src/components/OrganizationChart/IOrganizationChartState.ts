import { IUserInfo } from "../../Entities/IUserInfo";

export interface IOrganizationChartState {
  hasError: boolean;
  isloading: boolean;
  errorMessage: string;
  managerList: IUserInfo[];
  userProfile: any;
  reportsList: IUserInfo[];
}

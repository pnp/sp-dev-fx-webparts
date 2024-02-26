import { IUserInfo } from "../../models/IUserInfo";
export interface IErrorInfo {
  hasError: boolean;
  errorMessage: string;
}
export interface IOrgChartState {
  isLoading: boolean;
  renderManagers: JSX.Element[];
  renderDirectReports: JSX.Element[];
  error?: IErrorInfo;
  currentUser?: IUserInfo;
}

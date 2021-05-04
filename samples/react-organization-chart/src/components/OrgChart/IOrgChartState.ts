import { IUserInfo } from "../../models/IUserInfo";
export interface IErrorInfo {
  hasError: boolean;
  errorMessage: string;
}
export interface IOrgChartState {
  isLoading: boolean;
  error:IErrorInfo;
  renderManagers:JSX.Element[];
  renderDirectReports: JSX.Element[];
  currentUser:IUserInfo;
}

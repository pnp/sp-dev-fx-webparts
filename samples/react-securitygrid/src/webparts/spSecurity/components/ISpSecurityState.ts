import { SPSecurityInfo } from "../../SPSecurityService";
export interface ISpSecurityState {
  securityInfo: SPSecurityInfo;
  permission: string;
  showUserPanel:boolean;
  showListPanel:boolean;
}

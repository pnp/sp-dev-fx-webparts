import { SPSecurityInfo } from "../../SPSecurityService";
export interface ISpSecurityState {
  securityInfo: SPSecurityInfo;
  permission: string;
  showUserPanel:boolean;
  showListPanel:boolean;
  showEmail:boolean; //0 show name, 1 show email
  securityInfoLoaded:boolean;

}

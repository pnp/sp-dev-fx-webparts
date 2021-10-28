import { Guid } from "@microsoft/sp-core-library";

export interface IUserItem {
  displayName: string;
  mail: string;
  userPrincipalName: string;
  id: Guid;
}

export interface ITeamItem {
  id: Guid;
  displayName: string;
}

export interface ILog {
  team: string;
  logs: Array<string>;
  errors: Array<string>;
  logurl: string;
}
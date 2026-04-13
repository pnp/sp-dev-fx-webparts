export interface IUserListItem {
  id: number;
  displayName: string;
  email: string;
  userPrincipalName: string;
  loginName: string;
  isSiteAdmin: boolean;
}

export interface ICreateOrUpdateUserPayload {
  email: string;
  displayName?: string;
  role?: string;
}
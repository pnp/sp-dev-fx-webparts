export interface IUser {
  displayName:string;
  email: string;
  isAnonymousGuestUser?: boolean;
  isExternalGuestUser?: boolean;
  loginName?: string;
  preferUserTimeZone?: boolean;

}

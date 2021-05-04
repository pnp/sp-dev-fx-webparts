export interface IPersonProperties {
  AccountName: string;
  DirectReports: string[];
  DisplayName: string;
  Email: string;
  ExtendedManagers: string[];
  ExtendedReports: string[];
  IsFollowed: boolean;
  LatestPost: string;
  Peers: string[];
  PersonalSiteHostUrl: string;
  PersonalUrl: string;
  PictureUrl: string;
  Title: string;
  UserProfileProperties: { Key: string; Value: string; ValueType: string }[];
  UserUrl: string;
  loginName: string;
}

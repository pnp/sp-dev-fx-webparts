/*export interface IGroupMember {
  '@odata.type': string;
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation?: any;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
}*/

export interface IGroupMember {
  '@odata.context': string;
  '@odata.nextLink': string;
  value: IMember[];
}

export interface IMember {
  '@odata.type': string;
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation?: any;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
}

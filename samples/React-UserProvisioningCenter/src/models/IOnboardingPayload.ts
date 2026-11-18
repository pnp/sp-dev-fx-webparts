import type { IAccessGrants } from './IAccessGrants';

export type EmployeeType = 'Employee' | 'Contractor';
export type CredentialMode = 'password' | 'tap';

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  displayName: string;
  employeeId: string;
  mobilePhone?: string;
  personalEmail?: string;
  photoDataUrl?: string;
}

export interface IEmploymentInfo {
  jobTitle: string;
  department: string;
  companyName?: string;
  officeLocation?: string;
  country?: string;
  managerId?: string;
  managerDisplayName?: string;
  managerUpn?: string;
  employeeType: EmployeeType;
  hireDate: string;
}

export interface IIdentityInfo {
  userPrincipalName: string;
  mailNickname: string;
  domain: string;
  accountType: 'member' | 'guest';
}

export interface IAccountSettings {
  usageLocation: string;
  accountEnabled: boolean;
  credentialMode: CredentialMode;
  forceChangePassword: boolean;
}

export interface ILicenseSelection {
  skuId: string;
  skuPartNumber: string;
  displayName?: string;
}

export interface IOnboardingPayload {
  schemaVersion: 1;
  kind: 'onboard';
  personal: IPersonalInfo;
  employment: IEmploymentInfo;
  identity: IIdentityInfo;
  accountSettings: IAccountSettings;
  licenses: ILicenseSelection[];
  access: IAccessGrants;
  expirationReviewDays: number | null;
  cloneSourceUserId?: string;
  cloneSourceDisplayName?: string;
  approverGroupId?: string | null;
}

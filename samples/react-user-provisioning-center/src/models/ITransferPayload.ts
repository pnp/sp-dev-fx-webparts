import type { ILicenseSelection } from './IOnboardingPayload';

export interface ITransferTarget {
  userId: string;
  displayName: string;
  userPrincipalName: string;
}

export interface ITransferChanges {
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  managerId?: string;
  managerDisplayName?: string;
  addLicenses: ILicenseSelection[];
  removeLicenseSkuIds: string[];
}

export interface ITransferPayload {
  schemaVersion: 1;
  kind: 'transfer';
  target: ITransferTarget;
  changes: ITransferChanges;
}

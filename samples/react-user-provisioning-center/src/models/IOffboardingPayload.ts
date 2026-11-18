import type { IIdentityInfo } from './IOnboardingPayload';

export type MailboxAction = 'none' | 'convertShared' | 'forward';

export interface IOffboardingOptions {
  removeLicenses: boolean;
  removeFromGroups: boolean;
  mailboxAction: MailboxAction;
  forwardingAddress?: string;
  oneDriveAccessUpn?: string;
}

export interface IOffboardingTarget {
  userId: string;
  displayName: string;
  userPrincipalName: string;
}

export interface IOffboardingPayload {
  schemaVersion: 1;
  kind: 'offboard';
  identity: IIdentityInfo;
  target: IOffboardingTarget;
  options: IOffboardingOptions;
}

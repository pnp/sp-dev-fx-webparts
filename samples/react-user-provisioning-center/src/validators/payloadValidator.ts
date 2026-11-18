import type { IOnboardingPayload } from '../models';

const ISO_DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;
const ISO_COUNTRY: RegExp = /^[A-Z]{2}$/;
const UPN_LOCAL: RegExp = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
const EMAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_ROLES: readonly string[] = ['visitor', 'member', 'owner'];
const TEAM_ROLES: readonly string[] = ['member', 'owner'];

export function validatePayload(payload: IOnboardingPayload): string[] {
  const errors: string[] = [];

  if (!payload || payload.schemaVersion !== 1) {
    return ['payload: unsupported schema version'];
  }

  const { personal, employment, identity, accountSettings, licenses, access, expirationReviewDays } = payload;

  if (!personal?.firstName?.trim()) errors.push('personal.firstName: required');
  if (!personal?.lastName?.trim()) errors.push('personal.lastName: required');
  if (!personal?.displayName?.trim()) errors.push('personal.displayName: required');
  if (!personal?.employeeId?.trim()) errors.push('personal.employeeId: required');
  if ((personal?.employeeId ?? '').length > 16) errors.push('personal.employeeId: max 16 characters');

  if (!employment?.jobTitle?.trim()) errors.push('employment.jobTitle: required');
  if (!employment?.department?.trim()) errors.push('employment.department: required');
  if (employment?.employeeType !== 'Employee' && employment?.employeeType !== 'Contractor') {
    errors.push('employment.employeeType: must be Employee or Contractor');
  }
  if (!ISO_DATE.test(employment?.hireDate ?? '')) errors.push('employment.hireDate: must be yyyy-MM-dd');
  if (employment?.managerId && !/^[0-9a-f-]{36}$/i.test(employment.managerId)) {
    errors.push('employment.managerId: must be an Entra objectId');
  }
  if (employment?.country && !ISO_COUNTRY.test(employment.country)) {
    errors.push('employment.country: must be ISO 3166-1 alpha-2');
  }

  if (identity?.accountType !== 'member' && identity?.accountType !== 'guest') {
    errors.push('identity.accountType: must be member or guest');
  }
  const isGuest: boolean = identity?.accountType === 'guest';

  if (isGuest) {

    if (!EMAIL.test(identity?.userPrincipalName ?? '')) {
      errors.push('identity.userPrincipalName: must be a valid email address for a guest invite');
    }
  } else {
    const local: string = identity?.mailNickname ?? '';
    if (!local) {
      errors.push('identity.mailNickname: required');
    } else {
      if (local.length > 64) errors.push('identity.mailNickname: max 64 characters');
      if (!UPN_LOCAL.test(local)) errors.push('identity.mailNickname: invalid characters or leading/trailing dot');
    }
    if (!identity?.domain?.trim()) errors.push('identity.domain: required');
    if (identity?.userPrincipalName !== `${local}@${identity?.domain}`) {
      errors.push('identity.userPrincipalName: must equal mailNickname@domain');
    }
  }

  if (!isGuest) {
    if (!ISO_COUNTRY.test(accountSettings?.usageLocation ?? '')) {
      errors.push('accountSettings.usageLocation: must be ISO 3166-1 alpha-2');
    }
    if (accountSettings?.credentialMode !== 'password' && accountSettings?.credentialMode !== 'tap') {
      errors.push('accountSettings.credentialMode: must be password or tap');
    }
  }

  if (!Array.isArray(licenses)) {
    errors.push('licenses: must be an array');
  } else {
    const seen: Set<string> = new Set();
    for (const l of licenses) {
      if (!l.skuId || !l.skuPartNumber) errors.push('licenses: every entry needs skuId and skuPartNumber');
      if (l.skuId && seen.has(l.skuId)) errors.push(`licenses: duplicate skuId ${l.skuId}`);
      if (l.skuId) seen.add(l.skuId);
    }
  }

  if (!access) {
    errors.push('access: required');
  } else {
    if (!Array.isArray(access.securityGroups)) errors.push('access.securityGroups: must be an array');
    if (!Array.isArray(access.m365Groups)) errors.push('access.m365Groups: must be an array');
    if (!Array.isArray(access.teams)) {
      errors.push('access.teams: must be an array');
    } else {
      for (const t of access.teams) {
        if (!t.teamId) errors.push('access.teams: every entry needs teamId');
        if (TEAM_ROLES.indexOf(t.role) === -1) errors.push(`access.teams: invalid role ${String(t.role)}`);
      }
    }
    if (!Array.isArray(access.sharePointSites)) {
      errors.push('access.sharePointSites: must be an array');
    } else {
      for (const s of access.sharePointSites) {
        if (!s.siteUrl) errors.push('access.sharePointSites: every entry needs siteUrl');
        if (SITE_ROLES.indexOf(s.role) === -1) errors.push(`access.sharePointSites: invalid role ${String(s.role)}`);
      }
    }
    if (!Array.isArray(access.applications)) errors.push('access.applications: must be an array');
  }

  if (expirationReviewDays !== null && (typeof expirationReviewDays !== 'number' || expirationReviewDays < 0)) {
    errors.push('expirationReviewDays: must be null or a non-negative number');
  }

  return errors;
}

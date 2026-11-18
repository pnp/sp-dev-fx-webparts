export type CapabilityId =
  | 'directoryRead'
  | 'licenseRead'
  | 'createUsers'
  | 'assignLicenses'
  | 'groupWrites'
  | 'teamsWrites'
  | 'tapCreation'
  | 'guestInvites'
  | 'revokeSessions'
  | 'sharePointRead'
  | 'sharePointWrite'
  | 'groupMemberRead'
  | 'schemaValid';

export interface ICapabilityCheck {
  capability: CapabilityId;
  label: string;
  ok: boolean;
  detail: string;
}

export interface ISchemaGap {
  list: string;
  missingList: boolean;
  missingFields: string[];
  error: string;
}

export interface ISchemaValidationResult {
  gaps: ISchemaGap[];
  checkedLists: number;
}

export interface IPreflightResult {
  checks: ICapabilityCheck[];
  missing: ICapabilityCheck[];
  directoryRoleTemplateIds: string[];
  operatorUpn: string;
  requiredGraphScopes: string[];
  schemaGaps: ISchemaGap[];
}

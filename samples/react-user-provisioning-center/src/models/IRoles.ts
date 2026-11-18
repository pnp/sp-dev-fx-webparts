export type AppRole =
  | 'ITAdmin'
  | 'HRAdmin'
  | 'DepartmentManager'
  | 'ServiceDesk'
  | 'Auditor'
  | 'ReadOnly';

export type AppPermission =
  | 'createJobs'
  | 'approveJobs'
  | 'runJobs'
  | 'retrySteps'
  | 'skipSteps'
  | 'cancelJobs'
  | 'rollbackJobs'
  | 'manageTemplates'
  | 'viewAudit'
  | 'manageTasks'
  | 'manageSettings'
  | 'manageDelegations';

export interface IRoleDefinition {
  role: AppRole;
  memberGroupId: string;
  permissions: AppPermission[];
}

export interface IRoleManagementItem extends IRoleDefinition {
  itemId: number;
}

export interface IResolvedRoles {
  roles: AppRole[];
  permissions: Set<AppPermission>;
  resolvedUtc: string;
  unconfigured: boolean;
  bootstrapGranted: boolean;
}

export const BOOTSTRAP_PERMISSIONS: AppPermission[] = ['manageSettings', 'manageDelegations', 'viewAudit'];

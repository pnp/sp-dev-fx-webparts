export interface IUserPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canBulkOperations: boolean;
  canExport: boolean;
  canImport: boolean;
  canManageTemplates: boolean;
  canAccessAdvancedFeatures: boolean;
  isAdmin: boolean;
}

export interface IPermissionCheck {
  hasPermission: boolean;
  reason?: string;
  requiredPermission: string;
}

export enum PermissionLevel {
  None = 0,
  View = 1,
  Contribute = 2,
  Design = 3,
  FullControl = 4
}

export enum CustomActionRole {
  Viewer = 'Viewer',
  Contributor = 'Contributor', 
  Designer = 'Designer',
  Administrator = 'Administrator'
}

export interface IRoleDefinition {
  role: CustomActionRole;
  permissions: IUserPermissions;
  description: string;
  requiredSPPermissions: string[];
}

export interface IPermissionConfig {
  enableRBAC: boolean;
  defaultRole: CustomActionRole;
  roles: IRoleDefinition[];
  adminGroups: string[];
  bypassGroups: string[];
}
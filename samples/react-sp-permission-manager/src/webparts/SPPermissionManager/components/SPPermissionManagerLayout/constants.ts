export const GROUP_COLUMN_HEADER_MAP: Record<string, string> = {
  principalTypeLabel: 'Type',
  Id: 'ID',
  Title: 'Name',
  Email: 'Email',
  Description: 'Description',
  OwnerTitle: 'Owner',
  LoginName: 'Login Name',
  permissionLevels: 'Permission Levels'
};

// Error messages and UI strings for SPPermissionManagerLayout
export const USER_GROUP_MANAGER_LAYOUT_STRINGS = {
  NO_PERMISSION_MANAGE_ACTION: 'You do not have permission to perform this action.',
  ACTION_DISABLED_BY_CONFIGURATION: 'This action has been disabled by the web part configuration.',
  NO_PERMISSION_EXPORT_USERS: 'You do not have permission to export users.',
  ACCESS_DENIED_TITLE: 'Access denied',
  ACCESS_DENIED_MESSAGE: 'You need SharePoint Manage Permissions access to use this page. Please contact your SharePoint administrator if you believe this is incorrect.',
  SELECT_GROUPS_TO_EXPORT: 'Select one or more groups to export users.',
  NO_PERMISSION_VIEW_MEMBERSHIP: 'You do not have permission to view membership for one or more selected groups.',
  SELECT_USERS_TO_EDIT_PERMISSIONS: 'Select one or more users to edit permissions.',
  SELECT_GROUPS_TO_DELETE: 'Select one or more groups to delete.',
  NO_PERMISSION_MANAGE_GROUP_USERS: 'You do not have permission to manage group users.',
  SELECT_SINGLE_GROUP_MANAGE_USERS: 'Select a single group to manage users.',
  NO_PERMISSION_VIEW_GROUP_MEMBERSHIP: 'You do not have permission to view membership for this group.',
  FAILED_EXPORT_CSV: 'Failed to export users to CSV.',
  FAILED_EXPORT_EXCEL: 'Failed to export users to Excel.'
} as const;

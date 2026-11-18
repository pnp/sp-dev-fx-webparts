import { DEFAULT_APP_SETTINGS, type IAppSettings } from '../../models';
import type { AppPermission, AppRole } from '../../models';
import { DEFAULT_ROLE_PERMISSIONS } from '../roles/RoleService';
import { LIST_ROLES, LIST_SETTINGS } from '../../constants/listNames';

export type SeedItem = Record<string, unknown>;

export interface ISeedDefinition {
  listTitle: string;
  identityField: string;
  items: SeedItem[];
}

const APP_SETTINGS_ROW: SeedItem = {
  Title: 'app',
  SettingsJson: JSON.stringify(DEFAULT_APP_SETTINGS satisfies IAppSettings)
};

function roleRow(role: AppRole): SeedItem {
  return {
    Title: role,
    MemberGroupId: '',
    PermissionsJson: JSON.stringify(DEFAULT_ROLE_PERMISSIONS[role] satisfies AppPermission[])
  };
}

const ROLE_ROWS: SeedItem[] = (['ITAdmin', 'HRAdmin', 'DepartmentManager', 'ServiceDesk', 'Auditor', 'ReadOnly'] as AppRole[]).map(
  roleRow
);

export const UPC_SEED_DEFINITIONS: ISeedDefinition[] = [
  {
    listTitle: LIST_SETTINGS,
    identityField: 'Title',
    items: [APP_SETTINGS_ROW]
  },
  {
    listTitle: LIST_ROLES,
    identityField: 'Title',
    items: ROLE_ROWS
  }
];
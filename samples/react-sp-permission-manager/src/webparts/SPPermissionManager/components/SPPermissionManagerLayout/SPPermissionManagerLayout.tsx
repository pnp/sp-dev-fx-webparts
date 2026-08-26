import * as React from 'react';
import { Button, MessageBar, MessageBarBody, Spinner } from '@fluentui/react-components';
import { EditRegular } from '@fluentui/react-icons';
import { type ISiteGroupInfo } from '@pnp/sp/site-groups';
import * as XLSX from 'xlsx';
import { ManagementToolbar } from '../ManagementToolbar';
import { ListView, type IListViewColumn, type IListViewRef } from '../../../../common/components';
import {  type IUserListItem } from '../../../../common/interfaces';
import { SPService } from '../../../../common/services/SPService';
import { GroupEditorPanel, } from '../GroupEditorPanel';
import { GroupUsersPanel } from '../GroupUsersPanel/GroupUsersPanel';
import { GroupDeleteDialog } from '../GroupDeleteDialog';
import { GrantPermissionsDialog } from '../GrantPermissionsDialog';
import { CheckPermissionsDialog } from '../CheckPermissionsDialog';
import { PermissionLevelsDialog } from '../PermissionLevelsDialog';
import styles from './SPPermissionManagerLayout.module.scss';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import type { IPrincipalPermissionItem, ISPPermissionManagerLayoutProps, ISPPermissionManagerLayoutState } from './types';
import { toPrincipalListItem } from './types';
import { GROUP_COLUMN_HEADER_MAP, USER_GROUP_MANAGER_LAYOUT_STRINGS } from './constants';

export const SPPermissionManagerLayout: React.FC<ISPPermissionManagerLayoutProps> = ({ context, featureOptions }) => {
  const [state, setState] = React.useState<ISPPermissionManagerLayoutState>({
    groupItems: [],
    isGroupsLoading: false,
    selectedGroupIds: new Set<string>(),
    isGroupEditorOpen: false,
    isGroupUsersOpen: false,
    groupEditorMode: 'add',
    clickedGroup: undefined,
    actionError: '',
    canManageGroups: false,
    isPermissionsLoading: true,
    isDeleteDialogOpen: false,
    isGrantPermissionsOpen: false,
    grantPermissionsMode: 'grant',
    editPermissionsUsers: [],
    isCheckPermissionsOpen: false,
    isPermissionLevelsOpen: false,
    activeGroupForUsers: undefined
  });

  const groupListRef = React.useRef<IListViewRef<IPrincipalPermissionItem>>(null);

  const spService = React.useMemo(() => new SPService(context), [context]);

  const availableActions = React.useMemo(() => {
    const actions = new Set<string>([
      'add-new-group',
      'grant-permissions',
      'edit-user-permissions',
      'manage-group-users',
      'delete-group',
      'check-permissions',
      'permission-levels',
      'export-users-csv',
      'export-users-excel'
    ]);

    if (!featureOptions.allowCreateGroup) {
      actions.delete('add-new-group');
    }

    if (!featureOptions.allowDeleteGroup) {
      actions.delete('delete-group');
    }

    if (!featureOptions.allowPermissionLevels) {
      actions.delete('permission-levels');
    }

    if (!featureOptions.allowExportUsersCsv) {
      actions.delete('export-users-csv');
    }

    if (!featureOptions.allowExportUsersExcel) {
      actions.delete('export-users-excel');
    }

    return actions;
  }, [featureOptions.allowCreateGroup, featureOptions.allowDeleteGroup, featureOptions.allowExportUsersCsv, featureOptions.allowExportUsersExcel, featureOptions.allowPermissionLevels]);

  React.useEffect(() => {
    spService.getCurrentUserPermissions()
      .then((perms) => setState(prev => ({ ...prev, canManageGroups: perms.canManageGroups, isPermissionsLoading: false })))
      .catch(() => setState(prev => ({ ...prev, canManageGroups: false, isPermissionsLoading: false })));
  }, [spService]);

  const selectedGroups = React.useMemo(() => {
    const selected = new Set(state.selectedGroupIds);
    return state.groupItems.filter((item) => selected.has(item.Id.toString()) && item.PrincipalType === 8);
  }, [state.groupItems, state.selectedGroupIds]);

  const selectedGroup = React.useMemo(() => {
    const selectedId = state.selectedGroupIds.values().next().value;

    if (!selectedId) {
      return undefined;
    }

    return state.groupItems.find((item) => item.Id.toString() === selectedId && item.PrincipalType === 8);
  }, [state.groupItems, state.selectedGroupIds]);

  /** Users (PrincipalType=1) currently selected in the list */
  const selectedUsers = React.useMemo(() => {
    const selected = new Set(state.selectedGroupIds);
    return state.groupItems.filter((item) => selected.has(item.Id.toString()) && item.PrincipalType === 1);
  }, [state.groupItems, state.selectedGroupIds]);

  const canViewMembershipForSelectedGroups = React.useMemo(
    () => selectedGroups.length > 0 && selectedGroups.every((g) => g.canCurrentUserViewMembership !== false),
    [selectedGroups]
  );

  const disabledActionKeys = React.useMemo(() => {
    const disabled = new Set<string>();

    if (!state.canManageGroups) {
      disabled.add('add-new-group');
      disabled.add('grant-permissions');
      disabled.add('edit-user-permissions');
      disabled.add('remove-user-permissions');
      disabled.add('manage-group-users');
      disabled.add('delete-group');
      disabled.add('check-permissions');
      disabled.add('permission-levels');
      disabled.add('export-users-csv');
      disabled.add('export-users-excel');
      return disabled;
    }

    if (!featureOptions.allowCreateGroup) {
      disabled.add('add-new-group');
    }

    if (!featureOptions.allowDeleteGroup) {
      disabled.add('delete-group');
    }

    if (!featureOptions.allowPermissionLevels) {
      disabled.add('permission-levels');
    }

    if (!featureOptions.allowExportUsersCsv) {
      disabled.add('export-users-csv');
    }

    if (!featureOptions.allowExportUsersExcel) {
      disabled.add('export-users-excel');
    }

    if (selectedGroups.length !== 1 || !canViewMembershipForSelectedGroups) {
      disabled.add('manage-group-users');
    }

    if (selectedGroups.length === 0) {
      disabled.add('delete-group');
    }

    if (selectedUsers.length === 0) {
      disabled.add('edit-user-permissions');
      disabled.add('remove-user-permissions');
    }

    if (selectedGroups.length === 0 || !canViewMembershipForSelectedGroups) {
      disabled.add('export-users-csv');
      disabled.add('export-users-excel');
    }

    return disabled;
  }, [state.canManageGroups, canViewMembershipForSelectedGroups, featureOptions.allowCreateGroup, featureOptions.allowDeleteGroup, featureOptions.allowExportUsersCsv, featureOptions.allowExportUsersExcel, featureOptions.allowPermissionLevels, selectedGroups, selectedUsers]);

  const openGroupEditorForItem = React.useCallback((groupItem: IPrincipalPermissionItem): void => {
    if (!state.canManageGroups) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_MANAGE_ACTION }));
      return;
    }

    if (!featureOptions.allowEditGroup) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.ACTION_DISABLED_BY_CONFIGURATION }));
      return;
    }

    setState(prev => ({ ...prev, actionError: '', clickedGroup: groupItem, groupEditorMode: 'edit', isGroupEditorOpen: true }));
  }, [featureOptions.allowEditGroup, state.canManageGroups]);

  const openGroupUsersForItem = React.useCallback((groupItem: IPrincipalPermissionItem): void => {
    if (!state.canManageGroups) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_MANAGE_GROUP_USERS }));
      return;
    }

    if (groupItem.canCurrentUserViewMembership === false) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_VIEW_GROUP_MEMBERSHIP }));
      return;
    }

    setState(prev => ({ ...prev, actionError: '', activeGroupForUsers: groupItem, isGroupUsersOpen: true }));
  }, [state.canManageGroups]);

  const isExportDisabled = React.useMemo(
    () => !state.canManageGroups || selectedGroups.length === 0 || !canViewMembershipForSelectedGroups,
    [state.canManageGroups, selectedGroups.length, canViewMembershipForSelectedGroups]
  );

  const sanitizeSheetName = React.useCallback((name: string, usedNames: Set<string>): string => {
    const base = name
      .replaceAll('\\', ' ')
      .replaceAll('/', ' ')
      .replaceAll('?', ' ')
      .replaceAll('*', ' ')
      .replaceAll(':', ' ')
      .trim()
      .slice(0, 31) || 'Group';
    let candidate = base;
    let index = 1;

    while (usedNames.has(candidate)) {
      const suffix = ` ${index}`;
      candidate = `${base.slice(0, Math.max(1, 31 - suffix.length))}${suffix}`;
      index += 1;
    }

    usedNames.add(candidate);
    return candidate;
  }, []);

  const exportUsers = React.useCallback(async (format: 'csv' | 'excel'): Promise<void> => {
    if (!state.canManageGroups) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_EXPORT_USERS }));
      return;
    }

    if (selectedGroups.length === 0) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.SELECT_GROUPS_TO_EXPORT }));
      return;
    }

    if (!canViewMembershipForSelectedGroups) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_VIEW_MEMBERSHIP }));
      return;
    }

    setState(prev => ({ ...prev, actionError: '' }));

    const usersByGroup = await Promise.all(
      selectedGroups.map(async (groupItem) => {
        const users = await spService.getUsersInGroup(groupItem.Id);
        return {
          group: groupItem,
          users
        };
      })
    );

    if (format === 'csv') {
      const csvRows = usersByGroup.flatMap(({ group, users }) => users.map((user) => ({
        groupName: group.Title,
        displayName: user.displayName,
        email: user.email,
        loginName: user.loginName,
        isSiteAdmin: user.isSiteAdmin ? 'Yes' : 'No'
      })));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(csvRows);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      XLSX.writeFile(workbook, 'group-users.csv', { bookType: 'csv' });
      return;
    }

    const workbook = XLSX.utils.book_new();
    const usedSheetNames = new Set<string>();

    usersByGroup.forEach(({ group, users }) => {
      const rows = users.map((user: IUserListItem) => ({
        displayName: user.displayName,
        email: user.email,
        loginName: user.loginName,
        isSiteAdmin: user.isSiteAdmin ? 'Yes' : 'No'
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const sheetName = sanitizeSheetName(group.Title, usedSheetNames);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    XLSX.writeFile(workbook, 'group-users.xlsx');
  }, [state.canManageGroups, canViewMembershipForSelectedGroups, sanitizeSheetName, selectedGroups, spService]);

  const toDisplayHeader = React.useCallback((propertyKey: string): string => {
    const mappedHeader = GROUP_COLUMN_HEADER_MAP[propertyKey];

    if (mappedHeader) {
      return mappedHeader;
    }

    return propertyKey
      .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
        .replaceAll('_', ' ')
      .replaceAll(/\s+/g, ' ')
      .trim();
  }, []);

  const loadGroups = React.useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isGroupsLoading: true }));

    try {
      const allPrincipals = await spService.getAllPrincipalsWithPermissions();

      const mappedItems: IPrincipalPermissionItem[] = allPrincipals.map((p) => {
        let principalTypeLabel: string;
        if (p.PrincipalType === 8) {
          principalTypeLabel = 'Group';
        } else if (p.IsSiteAdmin) {
          principalTypeLabel = 'Site Admin';
        } else {
          principalTypeLabel = 'User';
        }
        return {
          ...p,
          permissionLevels: p.permissionLevelNames.length > 0
            ? p.permissionLevelNames.join(', ')
            : 'No permissions assigned',
          principalTypeLabel
        };
      });

      setState((prev) => {
        const validIds = new Set(mappedItems.map((item) => item.Id.toString()));
        const nextSelection = new Set<string>();

        prev.selectedGroupIds.forEach((selectedId) => {
          if (validIds.has(selectedId)) {
            nextSelection.add(selectedId);
          }
        });

        return { ...prev, groupItems: mappedItems, selectedGroupIds: nextSelection };
      });
    } finally {
      setState(prev => ({ ...prev, isGroupsLoading: false }));
    }
  }, [spService]);

  React.useEffect(() => {
    setState(prev => ({ ...prev, actionError: '' }));
    loadGroups().catch(() => {
      setState(prev => ({ ...prev, groupItems: [], selectedGroupIds: new Set<string>(), isGroupsLoading: false }));
    });
  }, [loadGroups]);

  /** Handles permission-related toolbar actions. Returns true when the action was consumed. */
  const handlePermissionsAction = React.useCallback((actionKey: string): boolean => {
    if (actionKey === 'grant-permissions') {
      setState(prev => ({ ...prev, grantPermissionsMode: 'grant', editPermissionsUsers: [], isGrantPermissionsOpen: true }));
      return true;
    }
    if (actionKey === 'edit-user-permissions') {
      if (selectedUsers.length === 0) {
        setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.SELECT_USERS_TO_EDIT_PERMISSIONS }));
        return true;
      }
      setState(prev => ({ ...prev, grantPermissionsMode: 'edit', editPermissionsUsers: selectedUsers.map(toPrincipalListItem), isGrantPermissionsOpen: true }));
      return true;
    }

    if (actionKey === 'check-permissions') {
      setState(prev => ({ ...prev, isCheckPermissionsOpen: true }));
      return true;
    }
    if (actionKey === 'permission-levels') {
      setState(prev => ({ ...prev, isPermissionLevelsOpen: true }));
      return true;
    }
    return false;
  }, [selectedUsers]);

  const handleGroupAction = React.useCallback((actionKey: string): void => {
    setState(prev => ({ ...prev, actionError: '' }));

    const requiresManagePermission = new Set<string>([
      'add-new-group',
      'grant-permissions',
      'edit-user-permissions',
      'remove-user-permissions',
      'manage-group-users',
      'delete-group',
      'check-permissions',
      'permission-levels',
      'export-users-csv',
      'export-users-excel'
    ]);

    if (requiresManagePermission.has(actionKey) && !state.canManageGroups) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.NO_PERMISSION_MANAGE_ACTION }));
      return;
    }

    if (!availableActions.has(actionKey)) {
      setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.ACTION_DISABLED_BY_CONFIGURATION }));
      return;
    }

    if (actionKey === 'add-new-group') {
      setState(prev => ({ ...prev, groupEditorMode: 'add', isGroupEditorOpen: true }));
      return;
    }

    if (handlePermissionsAction(actionKey)) return;

    if (actionKey === 'delete-group') {
      if (selectedGroups.length === 0) {
        setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.SELECT_GROUPS_TO_DELETE }));
        return;
      }
      setState(prev => ({ ...prev, isDeleteDialogOpen: true }));
      return;
    }

    if (actionKey === 'manage-group-users') {
      if (!selectedGroup) {
        setState(prev => ({ ...prev, actionError: USER_GROUP_MANAGER_LAYOUT_STRINGS.SELECT_SINGLE_GROUP_MANAGE_USERS }));
        return;
      }

      openGroupUsersForItem(selectedGroup);
      return;
    }

    if (actionKey === 'export-users-csv') {
      exportUsers('csv').catch((error: unknown) => {
        setState(prev => ({ ...prev, actionError: getErrorMessage(error) }));
      });
      return;
    }

    if (actionKey === 'export-users-excel') {
      exportUsers('excel').catch((error: unknown) => {
        setState(prev => ({ ...prev, actionError: getErrorMessage(error) }));
      });
    }
  }, [availableActions, state.canManageGroups, exportUsers, handlePermissionsAction, openGroupUsersForItem, selectedGroup, selectedGroups]);

  // helper that encapsulates our column sizing rules
  const computeColumnSize = React.useCallback((key: string): { width?: number; minWidth: number; isFlexible: boolean } => {
    if (key === 'principalTypeLabel') {
      return { width: 80, minWidth: 80, isFlexible: false };
    }
    if (key === '__actions') {
      return { width: 50, minWidth: 50, isFlexible: false };
    }
    if (key === 'Email') {
      return { minWidth: 300, isFlexible: true };
    }
    if (key === 'Description') {
      return { minWidth: 320, isFlexible: true };
    }
    return { minWidth: 220, isFlexible: true };
  }, []);

  const groupColumns: IListViewColumn<IPrincipalPermissionItem>[] = React.useMemo(() => {
    const allKeys = new Set<string>();

    state.groupItems.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if(!key.includes("odata"))
        allKeys.add(key);
      });
    });

    const defaultVisibleKeys = new Set<string>(['principalTypeLabel', 'Title', 'Email', 'Description', 'permissionLevels',
      // only include actions when edit is permitted
      ...(featureOptions.allowEditGroup ? ['__actions'] : [])
    ]);
    const fallbackKeys = ['principalTypeLabel', 'Title', 'Email', 'Description', 'permissionLevels'];
    // Ensure preferred columns appear first
    const preferredOrder = ['principalTypeLabel', 'Title', 'Email', 'Description', 'permissionLevels'];
    const remaining = [...allKeys].filter((k) => !preferredOrder.includes(k));
    let orderedKeys = allKeys.size > 0 ? [...preferredOrder.filter((k) => allKeys.has(k)), ...remaining] : fallbackKeys;

    // only show actions column if the user can manage groups *and* editing is allowed
    if (state.canManageGroups && featureOptions.allowEditGroup) {
      orderedKeys = ['__actions', ...orderedKeys];
    }

    return orderedKeys.map((key) => {
      const size = computeColumnSize(key);
      return {
        key,
        header: key === '__actions' ? '' : toDisplayHeader(key),
        defaultVisible: defaultVisibleKeys.has(key),
        getValue: (item) => {
          if (key === '__actions') {
            return '';
          }

          // For the Title/Name column on user principals, prefer the stored
          // display name (Title). Only fall back to login name or email when
          // Title is missing.
          if (key === 'Title' && item.PrincipalType === 1) {
            const title = (item.Title ?? '').trim();
            if (title) {
              return title;
            }

            const loginName = (item.LoginName ?? '').trim();
            if (loginName) {
              const lastSegment = loginName.includes('|') ? (loginName.split('|').pop() ?? '') : loginName;
              if (lastSegment) {
                return lastSegment;
              }
            }

            if (item.Email) {
              return item.Email;
            }

            return '';
          }

          const value = (item as unknown as Record<string, unknown>)[key];

          if (value === null || value === undefined) {
            return '';
          }

          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value;
          }

          return JSON.stringify(value);
        },
        renderCell: key === '__actions' ? (item) => {
          if (item.PrincipalType !== 8) {
            return null;
          }

          const canEdit = state.canManageGroups && featureOptions.allowEditGroup;

          return (
            <div style={{ display: 'flex', gap: 6 }}>
              <Button
                appearance="subtle"
                size="small"
                icon={<EditRegular />}
                aria-label="Edit group"
                disabled={!canEdit}
                onClick={(event) => {
                  event.stopPropagation();
                  openGroupEditorForItem(item);
                }}
              />
            </div>
          );
        } : undefined,
        isSortable: key !== '__actions',
        isFilterable: key !== '__actions',
        width: size.width,
        minWidth: size.minWidth,
        isFlexibleWidth: size.isFlexible,
      
      };
    });
  }, [featureOptions.allowEditGroup, openGroupEditorForItem, state.canManageGroups, state.groupItems, toDisplayHeader, computeColumnSize]);

  let mainContent: React.ReactNode;

  if (state.isGroupsLoading) {
    mainContent = <Spinner label="Loading..." />;
  } else {
    mainContent = (
      <ListView
        ref={groupListRef}
        items={state.groupItems}
        columns={groupColumns}
        getRowId={(item) => item.Id.toString()}
        emptyMessage="No principals with permissions found"
        panelTitle="Filter by"
        enableGlobalSearch
        searchPlaceholder="Search users and groups"
        enableColumnChooser={false}
        selectionMode="multiple"
        selectedRowIds={state.selectedGroupIds}
        onSelectionChange={(ids) => setState(prev => ({ ...prev, selectedGroupIds: ids }))}
        onRowClick={(item) => {
          // only navigate when click is on a group *and* editing is allowed
          if (item.PrincipalType !== 8 || !state.canManageGroups || !featureOptions.allowEditGroup) {
            return;
          }
          openGroupEditorForItem(item);
        }}
      />
    );
  }

  if (state.isPermissionsLoading) {
    return (
      <div className={styles.pageContainer}>
        <main className={styles.mainPane}>
          <Spinner label="Checking access..." />
        </main>
      </div>
    );
  }

  if (!state.canManageGroups) {
    return (
      <div className={styles.pageContainer}>
        <main className={styles.mainPane}>
          <MessageBar intent="error">
            <MessageBarBody>{USER_GROUP_MANAGER_LAYOUT_STRINGS.ACCESS_DENIED_MESSAGE}</MessageBarBody>
          </MessageBar>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <ManagementToolbar
        onActionClick={handleGroupAction}
        disabledActionKeys={disabledActionKeys}
        visibleActionKeys={availableActions}
        isExportDisabled={isExportDisabled}
      />
      <main className={styles.mainPane}>
        {state.actionError && (
          <MessageBar intent="warning" className={styles.actionErrorBar}>
            <MessageBarBody>{state.actionError}</MessageBarBody>
          </MessageBar>
        )}
        {mainContent}
      </main>

      <GroupEditorPanel
        open={state.isGroupEditorOpen}
        mode={state.groupEditorMode}
        spService={spService}
        group={state.groupEditorMode === 'edit' ? ((state.clickedGroup ?? selectedGroup) as unknown as ISiteGroupInfo) : undefined}
        readOnly={!state.canManageGroups}
        canDelete={state.canManageGroups}
        onClose={() => {
          setState(prev => ({ ...prev, isGroupEditorOpen: false, clickedGroup: undefined }));
        }}
        onSaved={() => {
          loadGroups().catch(() => {
            setState(prev => ({ ...prev, groupItems: [], selectedGroupIds: new Set<string>(), isGroupsLoading: false }));
          });
        }}
      />

      <GroupUsersPanel
        open={state.isGroupUsersOpen}
        group={(state.activeGroupForUsers ?? selectedGroup) as unknown as ISiteGroupInfo}
        spService={spService}
        canManageUsers={state.canManageGroups}
        onClose={() => {
          setState(prev => ({ ...prev, isGroupUsersOpen: false, activeGroupForUsers: undefined }));
        }}
      />

      <GroupDeleteDialog
        open={state.isDeleteDialogOpen}
        groups={selectedGroups}
        canManageGroups={state.canManageGroups}
        spService={spService}
        onClose={() => setState(prev => ({ ...prev, isDeleteDialogOpen: false }))}
        onCompleted={() => {
          setState(prev => ({ ...prev, selectedGroupIds: new Set<string>() }));
          loadGroups().catch(() => {
            setState(prev => ({ ...prev, groupItems: [], selectedGroupIds: new Set<string>(), isGroupsLoading: false }));
          });
        }}
      />

      <GrantPermissionsDialog
        open={state.isGrantPermissionsOpen}
        mode={state.grantPermissionsMode}
        preSelectedUsers={state.grantPermissionsMode === 'edit' ? state.editPermissionsUsers : undefined}
        spService={spService}
        onClose={() => {
          setState(prev => ({ ...prev, isGrantPermissionsOpen: false, editPermissionsUsers: [] }));
        }}
        onCompleted={() => {
          loadGroups().catch(() => {
            setState(prev => ({ ...prev, groupItems: [], selectedGroupIds: new Set<string>(), isGroupsLoading: false }));
          });
        }}
      />

      <CheckPermissionsDialog
        open={state.isCheckPermissionsOpen}
        canManage={state.canManageGroups}
        spService={spService}
        onClose={() => setState(prev => ({ ...prev, isCheckPermissionsOpen: false }))}
        onCompleted={() => {
          loadGroups().catch(() => {
            setState(prev => ({ ...prev, groupItems: [], selectedGroupIds: new Set<string>(), isGroupsLoading: false }));
          });
        }}
      />

      <PermissionLevelsDialog
        open={state.isPermissionLevelsOpen}
        spService={spService}
        canManage={state.canManageGroups}
        onClose={() => setState(prev => ({ ...prev, isPermissionLevelsOpen: false }))}
      />
    </div>
  );
};

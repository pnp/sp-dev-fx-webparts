import * as React from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  MessageBar,
  MessageBarBody,
  OverlayDrawer,
  Spinner,
  Text,
  Tooltip
} from '@fluentui/react-components';
import { DismissRegular, PersonAddRegular, PersonDeleteRegular } from '@fluentui/react-icons';
import { ListView, type IListViewColumn } from '../../../../common/components';
import { type IUserListItem } from '../../../../common/interfaces';
import styles from './GroupUsersPanel.module.scss';
import { AddUsersDialog } from './AddUsersDialog';
import { ConfirmDeleteDialog } from '../../../../common/components/ConfirmDeleteDialog/ConfirmDeleteDialog';
import type { IDeleteItem } from '../../../../common/components/ConfirmDeleteDialog/types';
import type { IGroupUsersPanelProps, IGroupUsersPanelState } from './types';
import {  GROUP_USERS_PANEL_STRINGS } from './constants';



export const GroupUsersPanel: React.FC<IGroupUsersPanelProps> = ({
  open,
  group,
  spService,
  canManageUsers = true,
  onClose
}) => {
  const [state, setState] = React.useState<IGroupUsersPanelState>({
    users: [],
    isLoading: false,
    error: '',
    selectedUserIds: new Set<string>(),
    isAddDialogOpen: false,
    // confirm dialog defaults
    confirmDialogOpen: false,
    confirmItems: [],
    suppressSuccessModal: false // Added to manage modal suppression
  });

  const loadUsers = React.useCallback(async (): Promise<void> => {
    if (!group) {
      setState(prev => ({ ...prev, users: [] }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const groupUsers = await spService.getUsersInGroup(group.Id);
      setState((prev) => {
        const validIds = new Set(groupUsers.map((user) => user.id.toString()));
        const nextSelection = new Set<string>();

        prev.selectedUserIds.forEach((id) => {
          if (validIds.has(id)) {
            nextSelection.add(id);
          }
        });

        return { ...prev, users: groupUsers, selectedUserIds: nextSelection };
      });
    } catch (loadError) {
      setState(prev => ({ ...prev, error: loadError instanceof Error ? loadError.message : GROUP_USERS_PANEL_STRINGS.FAILED_LOAD_GROUP_USERS, users: [] }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [group, spService]);

  React.useEffect(() => {
    if (!open || !group) {
      return;
    }

    loadUsers().catch(() => {
      setState(prev => ({ ...prev, error: GROUP_USERS_PANEL_STRINGS.FAILED_LOAD_GROUP_USERS, isLoading: false }));
    });
  }, [group, loadUsers, open]);

  // previous removeUsers helper was removed – confirmation dialog handles deletion now

  const handleRemoveSingleUser = React.useCallback((userId: number): void => {
    // open confirmation dialog for the single user
    const user = state.users.find(u => u.id === userId);
    setState(prev => ({
      ...prev,
      confirmDialogOpen: true,
      confirmItems: user
        ? [{ id: userId.toString(), title: user.displayName || user.email || user.loginName }]
        : [{ id: userId.toString(), title: userId.toString() }],
      suppressSuccessModal: true // Add this flag to suppress the success modal
    }));
  }, [state.users]);

  const handleRemoveSelectedUsers = React.useCallback((): void => {
    const userIds = new Set<number>(
      [...state.selectedUserIds]
        .map(Number)
        .filter((id) => !Number.isNaN(id))
    );
    const items = state.users
      .filter(u => userIds.has(u.id))
      .map(u => ({ id: u.id.toString(), title: u.displayName || u.email || u.loginName }));

    setState(prev => ({
      ...prev,
      confirmDialogOpen: true,
      confirmItems: items
    }));
  }, [state.selectedUserIds, state.users]);

  const selectedCount = state.selectedUserIds.size;

  const columns = React.useMemo<IListViewColumn<IUserListItem>[]>(() => ([
    {
      key: 'displayName',
      header: GROUP_USERS_PANEL_STRINGS.DISPLAY_NAME_HEADER,
      getValue: (item) => item.displayName,
      isSortable: true,
      isFilterable: true,
      defaultVisible: true,
      minWidth: 180,
      isFlexibleWidth: true
    },
    {
      key: 'email',
      header: GROUP_USERS_PANEL_STRINGS.EMAIL_HEADER,
      getValue: (item) => item.email,
      isSortable: true,
      isFilterable: true,
      defaultVisible: true,
      minWidth: 220,
      isFlexibleWidth: true
    },
    {
      key: 'loginName',
      header: 'Login Name',
      getValue: (item) => item.loginName,
      isSortable: true,
      isFilterable: true,
      defaultVisible: false,
      minWidth: 220,
      isFlexibleWidth: true
    },
    {
      key: 'isSiteAdmin',
      header: 'Site Admin',
      getValue: (item) => (item.isSiteAdmin ? 'Yes' : 'No'),
      isSortable: true,
      isFilterable: true,
      defaultVisible: true,
      minWidth: 92,
      maxWidth: 96,
      isFlexibleWidth: false
    },
    {
      key: 'actions',
      header: 'Actions',
      getValue: () => '',
      isSortable: false,
      isFilterable: true,
      defaultVisible: true,
      minWidth: 74,
      maxWidth: 84,
      isFlexibleWidth: false,
      renderCell: (item) => (
        <Tooltip content="Remove from group" relationship="label">
          <Button
            appearance="subtle"
            size="small"
            className={styles.dangerAction}
            icon={<PersonDeleteRegular />}
            disabled={!canManageUsers}
            onClick={() => handleRemoveSingleUser(item.id)}
            aria-label="Remove from group"
          />
        </Tooltip>
      )
    }
  ]), [canManageUsers, handleRemoveSingleUser]);

  const handleDialogDelete = React.useCallback(async (item: IDeleteItem): Promise<void> => {
    if (!group) return;
    const idNum = Number(item.id);
    if (!Number.isNaN(idNum)) {
      await spService.removeUsersFromGroup(group.Id, [idNum]);
    }
  }, [group, spService]);

  const handleDialogCompleted = React.useCallback((): void => {
    setState(prev => {
      if (prev.suppressSuccessModal) {
        // single‑item deletion – close straight away and reset the flag
        return {
          ...prev,
          confirmDialogOpen: false,
          confirmItems: [],
          selectedUserIds: new Set<string>(),
          suppressSuccessModal: false
        };
      }
      // bulk deletion – retain the dialog/confirmItems so the results table stays visible,
      // but clear any selected rows in the main list so the UI reflects the changes.
      return {
        ...prev,
        selectedUserIds: new Set<string>()
      };
    });

    loadUsers().catch(() => {
      setState(prev => ({ ...prev, error: GROUP_USERS_PANEL_STRINGS.FAILED_LOAD_GROUP_USERS, isLoading: false }));
    });
  }, [loadUsers]);

  return (
    <>
      <OverlayDrawer
        position="end"
        size="large"
        open={open}
        onOpenChange={(_event, data) => {
          if (!data.open) {
            onClose();
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button appearance="subtle" icon={<DismissRegular />} onClick={onClose} aria-label="Close users panel" />
            }
          >
            Manage Users{group ? `: ${group.Title}` : ''}
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          {state.error && (
            <MessageBar intent="error" className={styles.section}>
              <MessageBarBody>{state.error}</MessageBarBody>
            </MessageBar>
          )}

          {!canManageUsers && (
            <MessageBar intent="error" className={styles.section}>
              <MessageBarBody>Access Denied: You don&apos;t have sufficient permissions to manage users in this group.</MessageBarBody>
            </MessageBar>
          )}

          <div className={styles.actionsRow}>
            <Text>{selectedCount > 0 ? `${selectedCount} selected` : 'Select one or more users'}</Text>
            <div className={styles.actionsRight}>
              <Button
                appearance="secondary"
                icon={<PersonAddRegular />}
                onClick={() => setState(prev => ({ ...prev, isAddDialogOpen: true }))}
                disabled={!group || state.isLoading || !canManageUsers}
              >
                Add Users
              </Button>
              <Button
                appearance="primary"
                className={styles.dangerPrimary}
                icon={<PersonDeleteRegular />}
                disabled={selectedCount === 0 || state.isLoading || !canManageUsers}
                onClick={handleRemoveSelectedUsers}
              >
                Remove Selected
              </Button>
            </div>
          </div>

          {state.isLoading ? (
            <Spinner label="Loading users..." />
          ) : (
            <ListView
              items={state.users}
              columns={columns}
              getRowId={(item) => item.id.toString()}
              emptyMessage="No users found in this group"
              enableGlobalSearch
              searchPlaceholder="Search users"
              enableColumnChooser={false}
              selectionMode="multiple"
              selectedRowIds={state.selectedUserIds}
              onSelectionChange={(ids) => setState(prev => ({ ...prev, selectedUserIds: ids }))}
            />
          )}
        </DrawerBody>

        {/* confirmation dialog for deletes */}
        <ConfirmDeleteDialog
          open={state.confirmDialogOpen}
          items={state.confirmItems.map(i => ({ id: i.id, title: i.title }))}
          canDelete={canManageUsers}
          entityName="user"
          onDelete={handleDialogDelete}
          onClose={() => setState(prev => ({ ...prev, confirmDialogOpen: false, confirmItems: [], suppressSuccessModal: false }))}
          onCompleted={handleDialogCompleted}
          suppressSuccessModal={state.suppressSuccessModal}
        />

        <DrawerFooter className={styles.footer} style={{ justifyContent: 'flex-end' }}>
          <Button appearance="secondary" onClick={onClose}>Close</Button>
        </DrawerFooter>
      </OverlayDrawer>

      {group && (
        <AddUsersDialog
          open={state.isAddDialogOpen}
          group={group}
          spService={spService}
          onClose={() => setState(prev => ({ ...prev, isAddDialogOpen: false }))}
          onAdded={() => {
            loadUsers().catch(() => {
              setState(prev => ({ ...prev, error: 'Failed to refresh users after add.', isLoading: false }));
            });
          }}
        />
      )}
    </>
  );
};

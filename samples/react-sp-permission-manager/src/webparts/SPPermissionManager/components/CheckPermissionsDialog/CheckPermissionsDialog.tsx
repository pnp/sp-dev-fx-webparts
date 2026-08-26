import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  MessageBar,
  MessageBarBody,
  Spinner,
  Text,
  Tooltip
} from '@fluentui/react-components';
import {
  DismissRegular,
  GroupRegular,
  KeyRegular,
  PersonDeleteRegular,
  SearchRegular,
  ShieldCheckmarkRegular
} from '@fluentui/react-icons';
import { PeoplePicker } from '../../../../common/components';
import { getErrorMessage } from '../../../../common/utils/errorUtils';

import type { ICheckPermissionsDialogProps, ICheckPermissionsDialogState } from './types';
import styles from './CheckPermissionsDialog.module.scss';

export const CheckPermissionsDialog: React.FC<ICheckPermissionsDialogProps> = ({
  open,
  spService,
  canManage,
  onClose,
  onCompleted
}) => {
  const [state, setState] = React.useState<ICheckPermissionsDialogState>({
    selectedUser: [],
    isLoading: false,
    result: undefined,
    feedback: '',
    successMessage: '',
    removingKey: undefined,
    confirmGroup: undefined,
    hasChanges: false
  });

  // Reset when closed
  React.useEffect(() => {
    if (!open) {
      setState(prev => ({ ...prev, selectedUser: [], result: undefined, feedback: '', successMessage: '', removingKey: undefined, hasChanges: false }));
    }
  }, [open]);

  const handleClose = React.useCallback((): void => {
    if (state.hasChanges) {
      onCompleted();
    }
    onClose();
  }, [state.hasChanges, onClose, onCompleted]);

  const handleCheck = React.useCallback(async (): Promise<void> => {
    const user = state.selectedUser[0];
    if (!user) return;

    setState(prev => ({ ...prev, isLoading: true, feedback: '', successMessage: '', result: undefined }));

    try {
      const permissions = await spService.getUserPermissionsOnSite(
        user.loginName ?? user.email ?? String(user.id)
      );
      setState(prev => ({ ...prev, result: permissions }));
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.selectedUser, spService]);

  const handleRemoveDirectPermission = React.useCallback(async (permissionLevelId: number): Promise<void> => {
    if (!state.result) return;
    const key = `direct-${permissionLevelId}`;
    setState(prev => ({ ...prev, removingKey: key, feedback: '', successMessage: '' }));

    try {
      const remaining = state.result.directPermissions
        .filter((p) => p.permissionLevelId !== permissionLevelId)
        .map((p) => p.permissionLevelId);
      await spService.changeUserPermissions(state.result.loginName, remaining);

      // Refresh
      const updated = await spService.getUserPermissionsOnSite(state.result.loginName);
      setState(prev => ({ ...prev, result: updated, successMessage: 'Direct permission removed successfully.', hasChanges: true }));
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, removingKey: undefined }));
    }
  }, [state.result, spService]);

  const handleRemoveFromGroup = React.useCallback(async (groupId: number, groupTitle: string): Promise<void> => {
    if (!state.result) return;
    const key = `group-${groupId}`;
    setState(prev => ({ ...prev, removingKey: key, feedback: '', successMessage: '' }));

    try {
      await spService.removeUserFromGroup(groupId, state.result.id);

      // Refresh
      const updated = await spService.getUserPermissionsOnSite(state.result.loginName);
      setState(prev => ({ ...prev, result: updated, successMessage: `${state.result!.displayName} was successfully removed from ${groupTitle}.`, hasChanges: true }));
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, removingKey: undefined }));
    }
  }, [state.result, spService]);

  const isIdle = !state.isLoading && state.removingKey === undefined;

  return (
    <Dialog open={open} onOpenChange={(_ev, data) => { if (!data.open) handleClose(); }}>
      <DialogSurface style={{ maxWidth: 640 }}>
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={handleClose}
              />
            }
          >
            <ShieldCheckmarkRegular style={{ marginRight: 6, verticalAlign: 'middle', color: '#115ea3' }} />
            <span style={{ color: '#242424' }}>Check Permissions</span>
          </DialogTitle>

          <DialogContent className={styles.content}>
            {state.feedback && (
              <MessageBar intent="error" className={styles.section}>
                <MessageBarBody>{state.feedback}</MessageBarBody>
              </MessageBar>
            )}

            {state.successMessage && !state.feedback && (
              <MessageBar intent="success" className={styles.section}>
                <MessageBarBody>{state.successMessage}</MessageBarBody>
              </MessageBar>
            )}

            {/* Single-user PeoplePicker + Check button */}
            <div className={styles.section}>
              <div className={styles.searchRow}>
                <div className={styles.searchField}>
                  <PeoplePicker
                    spService={spService}
                    label="Select a user to check permissions"
                    placeholder="Search users"
                    mode="single"
                    allowUsers
                    allowGroups={false}
                    selectedItems={state.selectedUser}
                    onSelectionChange={(items) => setState(prev => ({ ...prev, selectedUser: items }))}
                  />
                </div>
                <Button
                  appearance="primary"
                  icon={<SearchRegular />}
                  disabled={state.selectedUser.length === 0 || !isIdle}
                  onClick={() => {
                    handleCheck().catch(() => setState(prev => ({ ...prev, feedback: 'Failed to load permissions.' })));
                  }}
                >
                  Check
                </Button>
              </div>
            </div>

            {state.isLoading && <Spinner label="Loading permissions…" />}

            {state.result && !state.isLoading && (
              <div className={styles.resultsSection}>
                {/* Direct permissions */}
                <div className={styles.section}>
                  <div className={styles.resultsTitle}>
                    <KeyRegular />
                    <Text weight="semibold">Direct Permissions</Text>
                  </div>

                  {state.result.directPermissions.length === 0 ? (
                    <Text className={styles.emptyHint}>No direct permissions assigned on this site.</Text>
                  ) : (
                    state.result.directPermissions.map((perm) => {
                      const key = `direct-${perm.permissionLevelId}`;
                      const canRemoveDirect = canManage;
                      return (
                        <div key={key} className={styles.permissionRow}>
                          <div className={styles.permissionRowLeft}>
                            <KeyRegular fontSize={14} />
                            <Text size={200}>{perm.permissionLevelName}</Text>
                          </div>
                          <Tooltip
                            content={canRemoveDirect
                              ? 'Remove this direct permission from the user.'
                              : 'Enabled when you have permission to manage permissions on this site.'}
                            relationship="label"
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={state.removingKey === key ? <Spinner size="tiny" /> : <DismissRegular />}
                              disabled={state.removingKey !== undefined || !canRemoveDirect}
                              onClick={() => {
                                if (!canRemoveDirect) {
                                  return;
                                }
                                handleRemoveDirectPermission(perm.permissionLevelId).catch(() =>
                                  setState(prev => ({ ...prev, feedback: 'Failed to remove permission.' }))
                                );
                              }}
                              aria-label="Remove permission"
                            />
                          </Tooltip>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Group memberships */}
                <div className={styles.section}>
                  <div className={styles.resultsTitle}>
                    <GroupRegular />
                    <Text weight="semibold">Group Memberships</Text>
                  </div>

                  <Text size={200} className={styles.groupDescription}>
                    Groups shown here are SharePoint groups that have permissions on this site and whose membership you are allowed to view. The Remove from group button is enabled only when: the selected user is a direct member of the group, the group allows you to edit its membership, and you have site-level manage permissions.
                  </Text>

                  {state.result.groupMemberships.length === 0 ? (
                    <Text className={styles.emptyHint}>Not a member of any SharePoint groups with site permissions.</Text>
                  ) : (
                    state.result.groupMemberships.map((grp) => {
                      const key = `group-${grp.groupId}`;
                      const canRemoveFromThisGroup = canManage && grp.isDirectMember && grp.canEditMembership;
                      const removeTooltip = (() => {
                        if (!grp.isDirectMember) return 'User is not a direct member of this group.';
                        if (!grp.canEditMembership) return 'You do not have permission to manage membership of this group.';
                        if (!canManage) return 'You do not have permission to manage permissions on this site.';
                        return `Remove ${state.result!.displayName} from ${grp.groupTitle}`;
                      })();
                      return (
                        <div key={key} className={styles.groupRow}>
                          <div className={styles.groupHeader}>
                            <div>
                              <div className={styles.groupName}>
                                <GroupRegular fontSize={14} style={{ marginRight: 4 }} />
                                {grp.groupTitle}
                              </div>
                              <div className={styles.groupPermLevels}>
                                {grp.permissionLevelNames.length > 0
                                  ? grp.permissionLevelNames.join(', ')
                                  : 'No permission levels assigned to this group'}
                              </div>
                            </div>
                            <Tooltip
                              content={removeTooltip}
                              relationship="label"
                            >
                              <Button
                                appearance="subtle"
                                size="small"
                                className={styles.groupActionDanger}
                                icon={state.removingKey === key ? <Spinner size="tiny" /> : <PersonDeleteRegular />}
                                disabled={state.removingKey !== undefined || !canRemoveFromThisGroup}
                                onClick={() => {
                                  if (!canRemoveFromThisGroup) {
                                    return;
                                  }
                                  setState(prev => ({ ...prev, confirmGroup: { groupId: grp.groupId, groupTitle: grp.groupTitle } }));
                                }}
                              >
                                Remove from group
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </DialogContent>

          <Dialog
            open={Boolean(state.confirmGroup)}
            onOpenChange={(_ev, data) => {
              if (!data.open) setState(prev => ({ ...prev, confirmGroup: undefined }));
            }}
          >
            <DialogSurface>
              <DialogBody>
                <DialogTitle
                  action={
                    <Button
                      appearance="subtle"
                      aria-label="Close"
                      icon={<DismissRegular />}
                      onClick={() => setState(prev => ({ ...prev, confirmGroup: undefined }))}
                    />
                  }
                >
                  Remove from group?
                </DialogTitle>
                <DialogContent>
                  <Text>
                    Are you sure you want to remove {state.result?.displayName ?? 'this user'} from
                    {' '}
                    {state.confirmGroup?.groupTitle}?
                  </Text>
                </DialogContent>
                <DialogActions>
                  <Button appearance="secondary" onClick={() => setState(prev => ({ ...prev, confirmGroup: undefined }))}>
                    Cancel
                  </Button>
                  <Button
                    appearance="primary"
                    className={styles.dangerPrimary}
                    icon={<PersonDeleteRegular />}
                    onClick={() => {
                      if (!state.confirmGroup) return;
                      const { groupId, groupTitle } = state.confirmGroup;
                      handleRemoveFromGroup(groupId, groupTitle).catch(() => {
                        setState(prev => ({ ...prev, feedback: 'Failed to remove from group.' }));
                      });
                      setState(prev => ({ ...prev, confirmGroup: undefined }));
                    }}
                  >
                    Remove
                  </Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>

          <DialogActions style={{ justifyContent: 'flex-end' }}>
            <Button appearance="secondary" icon={<DismissRegular />} onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

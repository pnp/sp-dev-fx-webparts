import * as React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Dropdown,
  Field,
  MessageBar,
  MessageBarBody,
  Option,
  Radio,
  RadioGroup,
  Spinner,
  Text
} from '@fluentui/react-components';
import {
  AddRegular,
  ArrowSwapRegular,
  DismissRegular,
  GroupRegular,
  KeyRegular
} from '@fluentui/react-icons';

import { PeoplePicker } from '../../../../common/components';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import {

  type IPrincipalListItem
} from '../../../../common/interfaces';
import type { TPermissionMode, IGrantPermissionsDialogProps, IGrantPermissionsDialogState } from './types';
import { principalToLoginName } from './utils';
import styles from './GrantPermissionsDialog.module.scss';

export const GrantPermissionsDialog: React.FC<IGrantPermissionsDialogProps> = ({
  open,
  mode,
  preSelectedUsers,
  spService,
  onClose,
  onCompleted
}) => {
  const [state, setState] = React.useState<IGrantPermissionsDialogState>({
    selectedPeople: [],
    permissionMode: 'group',
    groups: [],
    permissionLevels: [],
    selectedGroupIds: [],
    sharedPermLevelIds: [],
    sameForAll: true,
    individualPerms: new Map(),
    currentPermNames: new Map(),
    isLoading: false,
    isSubmitting: false,
    feedback: ''
  });

  // Reset + load reference data when dialog opens
  React.useEffect(() => {
    if (!open) return;

    const isEdit = mode === 'edit';
    const usersToFetch = isEdit ? (preSelectedUsers ?? []) : [];

    setState(prev => ({
      ...prev,
      feedback: '',
      selectedPeople: preSelectedUsers ?? [],
      permissionMode: isEdit ? 'direct' : 'group',
      selectedGroupIds: [],
      sharedPermLevelIds: [],
      sameForAll: true,
      individualPerms: new Map(),
      currentPermNames: new Map(),
      isLoading: true
    }));

    const basePromise = Promise.all([spService.getGroups(), spService.getPermissionLevels()]);
    const userPermsPromise: Promise<Array<{ loginName: string; directIds: number[]; permNames: string[] }>> =
      usersToFetch.length > 0
        ? Promise.all(
            usersToFetch.map(async (u) => {
              try {
                const result = await spService.getUserPermissionsOnSite(
                  u.loginName || u.email || String(u.id)
                );
                return {
                  loginName: u.loginName,
                  directIds: result.directPermissions.map((p) => p.permissionLevelId),
                  permNames: result.directPermissions.map((p) => p.permissionLevelName)
                };
              } catch {
                return { loginName: u.loginName, directIds: [], permNames: [] };
              }
            })
          )
        : Promise.resolve([]);

    Promise.all([basePromise, userPermsPromise])
      .then(([[g, pl], userPerms]) => {
        const filteredLevels = pl.filter((p) => p.roleTypeKind !== 0);
        const permNamesMap = new Map(userPerms.map((u) => [u.loginName, u.permNames]));

        let sharedPermLevelIds: number[] = [];
        const individualPerms = new Map<string, number[]>();

        if (isEdit && userPerms.length === 1) {
          sharedPermLevelIds = userPerms[0].directIds;
        } else if (isEdit && userPerms.length > 1) {
          for (const u of userPerms) {
            individualPerms.set(u.loginName, u.directIds);
          }
        }

        setState(prev => ({
          ...prev,
          groups: g,
          permissionLevels: filteredLevels,
          sharedPermLevelIds,
          individualPerms,
          sameForAll: !(isEdit && userPerms.length > 1),
          currentPermNames: permNamesMap
        }));
      })
      .catch(() => setState(prev => ({ ...prev, feedback: 'Failed to load groups and permission levels.' })))
      .finally(() => setState(prev => ({ ...prev, isLoading: false })));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Handles the 'direct' permission branch — extracted to keep handleSubmit complexity low. */
  const handleDirectSubmit = React.useCallback(async (loginNames: string[]): Promise<void> => {
    if (state.sameForAll || state.selectedPeople.length <= 1) {
      if (state.sharedPermLevelIds.length === 0) {
        setState(prev => ({ ...prev, feedback: 'Please select at least one permission level.' }));
        return;
      }
      await spService.grantPermissionsToUsers(loginNames, 'direct', state.sharedPermLevelIds);
    } else {
      for (const person of state.selectedPeople) {
        const loginName = principalToLoginName(person);
        const permIds = state.individualPerms.get(loginName) ?? [];
        if (permIds.length > 0) {
          await spService.grantPermissionsToUsers([loginName], 'direct', permIds);
        }
      }
    }
  }, [state.sameForAll, state.selectedPeople, state.sharedPermLevelIds, state.individualPerms, spService]);

  const handleSubmit = React.useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isSubmitting: true, feedback: '' }));

    try {
      const loginNames = state.selectedPeople.map(principalToLoginName);

      if (state.permissionMode === 'group') {
        if (state.selectedGroupIds.length === 0) {
          setState(prev => ({ ...prev, feedback: 'Please select at least one group.' }));
          return;
        }
        await spService.grantPermissionsToUsers(loginNames, 'group', state.selectedGroupIds);
      } else {
        await handleDirectSubmit(loginNames);
      }

      onCompleted();
      onClose();
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [
    state.selectedPeople,
    state.permissionMode,
    state.selectedGroupIds,
    handleDirectSubmit,
    spService,
    onCompleted,
    onClose
  ]);

  const handleSharedPermChange = React.useCallback((permId: number, checked: boolean): void => {
    setState((prev) => {
      const hasPerm = prev.sharedPermLevelIds.includes(permId);

      if (checked && !hasPerm) {
        return { ...prev, sharedPermLevelIds: [...prev.sharedPermLevelIds, permId] };
      }

      if (!checked && hasPerm) {
        return { ...prev, sharedPermLevelIds: prev.sharedPermLevelIds.filter((id) => id !== permId) };
      }

      return prev;
    });
  }, []);

  const handleIndividualPermChange = React.useCallback((loginName: string, permId: number, checked: boolean): void => {
    setState((prev) => {
      const current = prev.individualPerms.get(loginName) ?? [];
      const hasPerm = current.includes(permId);

      let nextPerms = current;
      if (checked && !hasPerm) {
        nextPerms = [...current, permId];
      } else if (!checked && hasPerm) {
        nextPerms = current.filter((id) => id !== permId);
      }

      if (nextPerms === current) {
        return prev;
      }

      const next = new Map(prev.individualPerms);
      next.set(loginName, nextPerms);
      return { ...prev, individualPerms: next };
    });
  }, []);

  const readyToSubmit = React.useMemo((): boolean => {
    if (state.isSubmitting || state.selectedPeople.length === 0) return false;
    if (state.permissionMode === 'group') return state.selectedGroupIds.length > 0;
    if (state.sameForAll || state.selectedPeople.length <= 1) return state.sharedPermLevelIds.length > 0;
    return state.selectedPeople.length > 1;
  }, [state.isSubmitting, state.selectedPeople, state.permissionMode, state.selectedGroupIds, state.sameForAll, state.sharedPermLevelIds]);

  let displayedUsers: IPrincipalListItem[];
  if (mode === 'edit') {
    displayedUsers = preSelectedUsers ?? [];
  } else {
    displayedUsers = state.selectedPeople;
  }

  // Extracted to avoid nested ternaries inside JSX
  let submitIcon: React.ReactElement;
  if (state.isSubmitting) {
    submitIcon = <Spinner size="tiny" />;
  } else if (mode === 'edit') {
    submitIcon = <ArrowSwapRegular />;
  } else {
    submitIcon = <AddRegular />;
  }

  let submitLabel: string;
  if (state.isSubmitting) {
    submitLabel = 'Processing\u2026';
  } else if (mode === 'edit') {
    submitLabel = 'Update Permissions';
  } else {
    const count = state.selectedPeople.length > 0 ? state.selectedPeople.length : '\u2026';
    submitLabel = `Grant to ${count} user(s)`;
  }

  return (
    <Dialog open={open} onOpenChange={(_ev, data) => { if (!data.open) onClose(); }}>
      <DialogSurface style={{ maxWidth: 560 }}>
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={onClose}
                disabled={state.isSubmitting}
              />
            }
          >
            {mode === 'edit' ? 'Edit User Permissions' : 'Grant Permissions'}
          </DialogTitle>

          <DialogContent className={styles.content}>
            {state.feedback && (
              <MessageBar intent="error" className={styles.section}>
                <MessageBarBody>{state.feedback}</MessageBarBody>
              </MessageBar>
            )}

            {/* People picker — only shown in 'grant' mode */}
            {mode === 'grant' && (
              <div className={styles.section}>
                <PeoplePicker
                  spService={spService}
                  label="Select users to grant permissions to"
                  placeholder="Search users"
                  mode="multiple"
                  allowUsers
                  allowGroups={false}
                  selectedItems={state.selectedPeople}
                  onSelectionChange={(items) => setState(prev => ({ ...prev, selectedPeople: items }))}
                />
              </div>
            )}

            {/* Pre-selected user chips for edit mode */}
            {mode === 'edit' && displayedUsers.length > 0 && (
              <div className={styles.section}>
                <Text weight="semibold" size={200}>Editing permissions for:</Text>
                <div className={styles.userChipList}>
                  {displayedUsers.map((p) => {
                    const ln = principalToLoginName(p);
                    const currentPerms = state.currentPermNames.get(ln) ?? [];
                    return (
                      <div key={ln} className={styles.userChipRow}>
                        <span className={styles.userChip}>
                          {p.displayName || ln}
                        </span>
                        {currentPerms.length > 0 && (
                          <span className={styles.currentPermBadge}>
                            Currently: {currentPerms.join(', ')}
                          </span>
                        )}
                        {currentPerms.length === 0 && !state.isLoading && (
                          <span className={styles.currentPermBadgeNone}>
                            No direct permissions assigned
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {state.isLoading ? (
              <Spinner label="Loading options..." />
            ) : (
              <>
                {/* Permission mode toggle */}
                <div className={styles.section}>
                  <Field label="How to grant permissions">
                    <RadioGroup
                      value={state.permissionMode}
                      onChange={(_ev, data) => {
                        setState(prev => ({ ...prev, permissionMode: data.value as TPermissionMode, feedback: '' }));
                      }}
                      layout="horizontal"
                    >
                      <Radio value="group" label={<><GroupRegular style={{ marginRight: 4 }} />Add to Group</>} />
                      <Radio value="direct" label={<><KeyRegular style={{ marginRight: 4 }} />Direct Permission</>} />
                    </RadioGroup>
                  </Field>
                </div>

                {/* Group mode */}
                {state.permissionMode === 'group' && (
                  <div className={styles.section}>
                    <Field label="Select Group(s)">
                      <Dropdown
                        multiselect
                        placeholder="Choose one or more groups…"
                        selectedOptions={state.selectedGroupIds.map(String)}
                        value={state.selectedGroupIds
                          .map((id) => state.groups.find((g) => g.Id === id)?.Title ?? '')
                          .filter(Boolean)
                          .join(', ')}
                        onOptionSelect={(_ev, data) => {
                          setState(prev => ({ ...prev, selectedGroupIds: data.selectedOptions.map(Number) }));
                        }}
                      >
                        {state.groups.map((g) => (
                          <Option key={g.Id} value={String(g.Id)}>
                            {g.Title}
                          </Option>
                        ))}
                      </Dropdown>
                    </Field>
                  </div>
                )}

                {/* Direct permission mode */}
                {state.permissionMode === 'direct' && (
                  <div className={styles.section}>
                    {displayedUsers.length > 1 && (
                      <div className={styles.checkRow}>
                        <Checkbox
                          checked={state.sameForAll}
                          onChange={(_ev, data) => setState(prev => ({ ...prev, sameForAll: Boolean(data.checked) }))}
                          label="Use same permission level for all selected users"
                        />
                      </div>
                    )}

                    {(state.sameForAll || displayedUsers.length <= 1) ? (
                      <Field label="Permission Level(s)">
                        <div className={styles.permLevelList}>
                          {state.permissionLevels.map((pl) => (
                            <Checkbox
                              key={pl.id}
                              id={`shared-perm-${pl.id}`}
                              checked={state.sharedPermLevelIds.includes(pl.id)}
                              onChange={(_ev, data) => handleSharedPermChange(pl.id, Boolean(data.checked))}
                              label={pl.name}
                            />
                          ))}
                        </div>
                      </Field>
                    ) : (
                      /* Individual permissions per user */
                      <div>
                        {displayedUsers.map((person) => {
                          const loginName = principalToLoginName(person);
                          const perms = state.individualPerms.get(loginName) ?? [];
                          return (
                            <div key={loginName} className={styles.individualUser}>
                              <Text weight="semibold" size={200}>
                                {person.displayName || loginName}
                              </Text>
                              <div className={styles.permLevelList}>
                                {state.permissionLevels.map((pl) => (
                                  <Checkbox
                                    key={pl.id}
                                    id={`user-${loginName.replaceAll(/[^a-zA-Z0-9_-]/g, '-')}-perm-${pl.id}`}
                                    checked={perms.includes(pl.id)}
                                    onChange={(_ev, data) => handleIndividualPermChange(loginName, pl.id, Boolean(data.checked))}
                                    label={pl.name}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              appearance="secondary"
              icon={<DismissRegular />}
              onClick={onClose}
              disabled={state.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              icon={submitIcon}
              disabled={!readyToSubmit}
              onClick={() => {
                handleSubmit().catch(() => setState(prev => ({ ...prev, feedback: 'Operation failed.' })));
              }}
            >
              {submitLabel}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

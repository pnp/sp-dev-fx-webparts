import * as React from 'react';

import {
  Button,
  Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  Field,
  Input,
  Option,
  OverlayDrawer,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  Textarea,
  MessageBar,
  MessageBarBody
} from '@fluentui/react-components';
import { DeleteRegular, DismissRegular } from '@fluentui/react-icons';
import { PeoplePicker } from '../../../../common/components';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import { GroupDeleteDialog } from '../GroupDeleteDialog';
import type { IGroupListViewItem } from '../SPPermissionManagerLayout/types';
import type {  IGroupEditorPanelProps, IGroupEditorPanelState } from './types';
import { createInitialState, getPermissionLevelId, getDrawerTitle, getSubmitButtonLabel } from './utils';
import styles from './GroupEditorPanel.module.scss';

export const GroupEditorPanel: React.FC<IGroupEditorPanelProps> = ({
  open,
  mode,
  spService,
  group,
  readOnly = false,
  canDelete,
  onClose,
  onSaved
}) => {
  const canDeleteGroup = canDelete ?? !readOnly;
  const [state, setState] = React.useState<IGroupEditorPanelState>(() => ({
    isLoading: false,
    isSaving: false,
    errorMessage: '',
    hasTriedToSubmit: false,
    isDeleteDialogOpen: false,
    permissionLevels: [],
    selectedOwner: [],
    formState: createInitialState(group)
  }));
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    let isDisposed = false;

    const load = async (): Promise<void> => {
      setState(prev => ({
        ...prev,
        isLoading: true,
        errorMessage: '',
        hasTriedToSubmit: false,
        formState: createInitialState(group),
        selectedOwner: []
      }));

      try {
        const allPermissionLevels = await spService.getPermissionLevels();

        if (isDisposed) {
          return;
        }

        setState(prev => ({ ...prev, permissionLevels: allPermissionLevels }));

        if (mode === 'edit' && group) {
          const [currentPermissions, owner] = await Promise.all([
            spService.getGroupPermissions(group.Id),
            spService.getGroupOwner(group.Id)
          ]);

          if (isDisposed) {
            return;
          }

          setState((prev) => ({
            ...prev,
            formState: { ...prev.formState, permissionLevelIds: currentPermissions.map(getPermissionLevelId) }
          }));

          if (owner) {
            setState(prev => ({ ...prev, selectedOwner: [owner] }));
          }
        }
      } catch (error) {
        if (!isDisposed) {
          setState(prev => ({ ...prev, errorMessage: getErrorMessage(error) }));
        }
      } finally {
        if (!isDisposed) {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    load().catch(() => {
      setState(prev => ({ ...prev, errorMessage: 'Failed to load group data.', isLoading: false }));
    });

    return () => {
      isDisposed = true;
    };
  }, [group, mode, open, spService]);

  const isNameValid = state.formState.name.trim().length > 0;
  const isOwnerSelected = state.selectedOwner.length > 0;
  const isPermissionSelected = state.formState.permissionLevelIds.length > 0;
  const canSubmit = !state.isLoading && !state.isSaving && isNameValid && isOwnerSelected && isPermissionSelected;
  const selectedPermissionDisplayValue = React.useMemo(() => {
    if (state.formState.permissionLevelIds.length === 0) {
      return '';
    }

    const permissionNameById = new Map<number, string>();

    state.permissionLevels.forEach((permissionLevel) => {
      permissionNameById.set(permissionLevel.id, permissionLevel.name);
    });

    return state.formState.permissionLevelIds
      .map((permissionLevelId) => permissionNameById.get(permissionLevelId) ?? '')
      .filter((permissionName) => permissionName.length > 0)
      .join(', ');
  }, [state.formState.permissionLevelIds, state.permissionLevels]);

  const submitButtonLabel = getSubmitButtonLabel(state.isSaving, mode);
  const drawerTitle = getDrawerTitle(mode, readOnly, group?.Title);

  const handleSave = React.useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, hasTriedToSubmit: true }));

    if (!canSubmit) {
      return;
    }

    setState(prev => ({ ...prev, isSaving: true, errorMessage: '' }));

    try {
      const ownerPrincipal = state.selectedOwner[0];
      const owner = ownerPrincipal
        ? { id: ownerPrincipal.id, principalType: ownerPrincipal.principalType, loginName: ownerPrincipal.loginName }
        : undefined;
      const payload = {
        name: state.formState.name.trim(),
        description: state.formState.description.trim(),
        owner,
        permissionLevelIds: state.formState.permissionLevelIds,
        onlyAllowMembersViewMembership: state.formState.onlyAllowMembersViewMembership,
        allowMembersEditMembership: state.formState.allowMembersEditMembership,
        allowRequestToJoinLeave: state.formState.allowRequestToJoinLeave,
        autoAcceptRequestToJoinLeave: state.formState.autoAcceptRequestToJoinLeave
      };

      if (mode === 'add') {
        await spService.createGroup(payload);
      } else if (group) {
        await spService.updateGroup(group.Id, payload);
      }

      onSaved();
      onClose();
    } catch (error) {
      setState(prev => ({ ...prev, errorMessage: getErrorMessage(error) }));
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  }, [canSubmit, state.formState, group, mode, onClose, onSaved, state.selectedOwner, spService]);

  const handleSaveClick = React.useCallback((): void => {
    handleSave().catch(() => undefined);
  }, [handleSave]);

  React.useEffect(() => {
    if (!open || state.isLoading) {
      return;
    }

    nameInputRef.current?.focus();
  }, [state.isLoading, open]);

  return (
    <OverlayDrawer
      position="end"
      size="medium"
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
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              aria-label="Close group panel"
              onClick={onClose}
            />
          }
        >
          {drawerTitle}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={styles.dialogContent}>
            {state.errorMessage && (
              <MessageBar intent="error" className={styles.section}>
                <MessageBarBody>{state.errorMessage}</MessageBarBody>
              </MessageBar>
            )}

            {readOnly && (
              <MessageBar intent="error" className={styles.section}>
                <MessageBarBody>Access Denied: You don&apos;t have sufficient permissions to edit this group. Details are shown as read-only.</MessageBarBody>
              </MessageBar>
            )}

            {state.isLoading ? (
              <Spinner label="Loading group details..." />
            ) : (
              <>
                <div className={styles.section}>
                  <Text as="h4" block weight="semibold" className={styles.sectionTitle}>Name and Description</Text>
                  <Text block className={styles.sectionDescription}>Provide a name and description for this group.</Text>
                  <div className={styles.grid}>
                    <Field label="Name" required>
                      <Input
                        ref={nameInputRef}
                        value={state.formState.name}
                        disabled={readOnly}
                        onChange={(_event, data) => setState((prev) => ({ ...prev, formState: { ...prev.formState, name: data.value } }))}
                      />
                    </Field>

                    <Field label="Description" className={styles.fullWidth}>
                      <Textarea
                        resize="vertical"
                        rows={3}
                        value={state.formState.description}
                        disabled={readOnly}
                        onChange={(_event, data) => setState((prev) => ({ ...prev, formState: { ...prev.formState, description: data.value } }))}
                      />
                    </Field>
                  </div>
                </div>

                <div className={styles.section}>
                  <Text as="h4" block weight="semibold" className={styles.sectionTitle}>Owner and Permissions</Text>
                  <Text block className={styles.sectionDescription}>Choose owner and permission levels for this group.</Text>

                  {mode === 'edit' && group?.OwnerTitle && (
                    <Text block className={styles.currentOwner}>Current owner: {group.OwnerTitle}</Text>
                  )}

                  <div className={styles.grid}>
                    <div className={styles.fullWidth}>
                      <PeoplePicker
                        spService={spService}
                        mode="single"
                        allowUsers
                        allowSpGroupsOnly
                        disabled={readOnly}
                        required
                        label="Group owner"
                        placeholder="Search users or SP groups"
                        selectedItems={state.selectedOwner}
                        onSelectionChange={(items) => setState(prev => ({ ...prev, selectedOwner: items }))}
                      />
                      {state.hasTriedToSubmit && !isOwnerSelected && !readOnly && (
                        <Text size={200} style={{ color: 'var(--colorPaletteRedForeground1)', marginTop: 2, display: 'block' }}>
                          Group owner is required.
                        </Text>
                      )}
                    </div>

                    <Field
                      label="Permission levels"
                      required
                      className={styles.fullWidth}
                      validationMessage={state.hasTriedToSubmit && !isPermissionSelected && !readOnly ? 'At least one permission level is required.' : undefined}
                      validationState={state.hasTriedToSubmit && !isPermissionSelected && !readOnly ? 'error' : 'none'}
                    >
                      <Dropdown
                        multiselect
                        disabled={readOnly}
                        value={selectedPermissionDisplayValue}
                        selectedOptions={state.formState.permissionLevelIds.map((id) => id.toString())}
                        onOptionSelect={(_event, data) => {
                          const permissionIds = data.selectedOptions
                            .map(Number)
                            .filter((value) => !Number.isNaN(value));

                          setState((prev) => ({ ...prev, formState: { ...prev.formState, permissionLevelIds: permissionIds } }));
                        }}
                        placeholder="Select permission levels"
                      >
                        {state.permissionLevels.map((permissionLevel) => (
                          <Option
                            key={permissionLevel.id}
                            value={permissionLevel.id.toString()}
                            text={permissionLevel.name}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <Text>{permissionLevel.name}</Text>
                              {permissionLevel.description ? (
                                <Text size={200} className={styles.sectionDescription}>
                                  {permissionLevel.description}
                                </Text>
                              ) : null}
                            </div>
                          </Option>
                        ))}
                      </Dropdown>
                    </Field>
                  </div>
                </div>

                <div className={styles.section}>
                  <Text as="h4" block weight="semibold" className={styles.sectionTitle}>Group Settings</Text>
                  <Text block className={styles.sectionDescription}>Configure membership visibility and editing options.</Text>

                  <div className={styles.grid}>
                    <Field label="Who can view group membership?" className={styles.fullWidth}>
                      <RadioGroup
                        layout="horizontal"
                        value={state.formState.onlyAllowMembersViewMembership ? 'members' : 'everyone'}
                        onChange={(_event, data) => setState((prev) => ({
                          ...prev,
                          formState: { ...prev.formState, onlyAllowMembersViewMembership: data.value === 'members' }
                        }))}
                        className={styles.inlineOptions}
                      >
                        <Radio value="everyone" label="Everyone" disabled={readOnly} />
                        <Radio value="members" label="Group Members" disabled={readOnly} />
                      </RadioGroup>
                    </Field>

                    <Field label="Who can edit membership?" className={styles.fullWidth}>
                      <RadioGroup
                        layout="horizontal"
                        value={state.formState.allowMembersEditMembership ? 'members' : 'owner'}
                        onChange={(_event, data) => setState((prev) => ({
                          ...prev,
                          formState: { ...prev.formState, allowMembersEditMembership: data.value === 'members' }
                        }))}
                        className={styles.inlineOptions}
                      >
                        <Radio value="owner" label="Group Owner" disabled={readOnly} />
                        <Radio value="members" label="Group Members" disabled={readOnly} />
                      </RadioGroup>
                    </Field>
                  </div>
                </div>

                <div className={styles.section}>
                  <Text as="h4" block weight="semibold" className={styles.sectionTitle}>Membership Requests</Text>
                  <Text block className={styles.sectionDescription}>Control join/leave requests for this group.</Text>

                  <div className={styles.grid}>
                    <Field label="Allow join/leave requests?" className={styles.fullWidth}>
                      <RadioGroup
                        layout="horizontal"
                        value={state.formState.allowRequestToJoinLeave ? 'yes' : 'no'}
                        onChange={(_event, data) => setState((prev) => ({
                          ...prev,
                          formState: { ...prev.formState, allowRequestToJoinLeave: data.value === 'yes' }
                        }))}
                        className={styles.inlineOptions}
                      >
                        <Radio value="yes" label="Yes" disabled={readOnly} />
                        <Radio value="no" label="No" disabled={readOnly} />
                      </RadioGroup>
                    </Field>

                    <Field label="Auto-accept requests?" className={styles.fullWidth}>
                      <Checkbox
                        id="group-editor-auto-accept-requests"
                        checked={state.formState.autoAcceptRequestToJoinLeave}
                        disabled={readOnly || !state.formState.allowRequestToJoinLeave}
                        onChange={(_event, data) => setState((prev) => ({
                          ...prev,
                          formState: { ...prev.formState, autoAcceptRequestToJoinLeave: Boolean(data.checked) }
                        }))}
                        label="Automatically accept requests"
                      />
                    </Field>


                  </div>
                </div>
              </>
            )}
        </div>
      </DrawerBody>

      <DrawerFooter className={styles.actions}>
        {mode === 'edit' && (
          <Button
            appearance="primary"
            icon={<DeleteRegular />}
            onClick={() => setState(prev => ({ ...prev, isDeleteDialogOpen: true }))}
            disabled={!canDeleteGroup || state.isSaving}
            className={styles.dangerPrimary}
            style={{ marginRight: 'auto' }}
          >
            Delete Group
          </Button>
        )}
        <Button appearance="secondary" onClick={onClose} disabled={state.isSaving}>
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {!readOnly && (
          <Button appearance="primary" onClick={handleSaveClick} disabled={!canSubmit}>
            {submitButtonLabel}
          </Button>
        )}
      </DrawerFooter>

      {mode === 'edit' && group && (
        <GroupDeleteDialog
          open={state.isDeleteDialogOpen}
          groups={[{ ...group, permissionLevels: '' } as IGroupListViewItem]}
          canManageGroups={canDeleteGroup}
          spService={spService}
          onClose={() => setState(prev => ({ ...prev, isDeleteDialogOpen: false }))}
          onCompleted={() => {
            setState(prev => ({ ...prev, isDeleteDialogOpen: false }));
            onSaved();
            onClose();
          }}
        />
      )}
    </OverlayDrawer>
  );
};

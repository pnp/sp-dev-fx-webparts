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
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  OverlayDrawer,
  Spinner,
  Text,
  Textarea
} from '@fluentui/react-components';
import { DeleteRegular, DismissRegular, SaveRegular } from '@fluentui/react-icons';

import {
  SP_PERMISSIONS,
  isPermissionEnabled,
  togglePermission
} from './spPermissions';
import type { IPermissionLevelEditorPanelProps, IPermissionLevelEditorPanelState } from './types';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import styles from './PermissionLevelEditorPanel.module.scss';

export const PermissionLevelEditorPanel: React.FC<IPermissionLevelEditorPanelProps> = ({
  open,
  mode,
  sourcePermissionLevel,
  spService,
  canManage,
  onClose,
  onSaved
}) => {
  const [state, setState] = React.useState<IPermissionLevelEditorPanelState>({
    name: '',
    description: '',
    permLow: 0,
    permHigh: 0,
    isSaving: false,
    feedback: '',
    showDeleteConfirm: false
  });

  // Initialise state whenever the panel opens or source changes
  React.useEffect(() => {
    if (!open) {
      setState(prev => ({ ...prev, feedback: '', isSaving: false, showDeleteConfirm: false }));
      return;
    }

    if (mode === 'new' || !sourcePermissionLevel) {
      setState({ name: '', description: '', permLow: 0, permHigh: 0, isSaving: false, feedback: '', showDeleteConfirm: false });
      return;
    }

    setState({
      name: mode === 'copy' ? `Copy of ${sourcePermissionLevel.name}` : sourcePermissionLevel.name,
      description: sourcePermissionLevel.description ?? '',
      permLow: sourcePermissionLevel.basePermissionsLow,
      permHigh: sourcePermissionLevel.basePermissionsHigh,
      isSaving: false,
      feedback: '',
      showDeleteConfirm: false
    });
  }, [open, sourcePermissionLevel, mode]);

  const handleToggle = React.useCallback(
    (key: string, enabled: boolean) => {
      const def = SP_PERMISSIONS.find((p) => p.key === key);
      if (!def) return;
      const { low, high } = togglePermission(def, state.permLow, state.permHigh, enabled);
      setState(prev => ({ ...prev, permLow: low, permHigh: high }));
    },
    [state.permLow, state.permHigh]
  );

  const handleSave = React.useCallback(async (): Promise<void> => {
    const trimmedName = state.name.trim();
    if (!trimmedName) {
      setState(prev => ({ ...prev, feedback: 'Permission level name is required.' }));
      return;
    }

    setState(prev => ({ ...prev, isSaving: true, feedback: '' }));

    try {
      if (mode === 'edit' && sourcePermissionLevel) {
        await spService.updatePermissionLevel(
          sourcePermissionLevel.id,
          trimmedName,
          state.description.trim(),
          state.permLow,
          state.permHigh
        );
      } else {
        await spService.createPermissionLevel(
          trimmedName,
          state.description.trim(),
          state.permLow,
          state.permHigh
        );
      }
      onSaved();
      onClose();
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  }, [mode, state.name, state.description, state.permLow, state.permHigh, sourcePermissionLevel, spService, onSaved, onClose]);

  const categories: Array<'List' | 'Site' | 'Personal'> = ['List', 'Site', 'Personal'];

  const handleDelete = React.useCallback(async (): Promise<void> => {
    if (!sourcePermissionLevel) return;

    setState(prev => ({ ...prev, isSaving: true, feedback: '', showDeleteConfirm: false }));

    try {
      await spService.deletePermissionLevel(sourcePermissionLevel.id);
      onSaved();
      onClose();
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  }, [onClose, onSaved, sourcePermissionLevel, spService]);

  return (
    <>
    <OverlayDrawer
      open={open}
      position="end"
      size="medium"
      onOpenChange={(_ev, data) => { if (!data.open) onClose(); }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<DismissRegular />}
              onClick={onClose}
              disabled={state.isSaving}
            />
          }
        >
          {mode === 'edit'
            ? 'Edit Permission Level'
            : mode === 'copy'
              ? 'Copy Permission Level'
              : 'New Permission Level'}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        <div className={styles.scrollContent}>
          {state.feedback && (
            <MessageBar intent="error" className={styles.feedback}>
              <MessageBarBody>{state.feedback}</MessageBarBody>
            </MessageBar>
          )}

          <div className={styles.nameField}>
            <Field label="Name" required>
              <Input
                value={state.name}
                onChange={(_ev, data) => setState(prev => ({ ...prev, name: data.value }))}
                placeholder="Enter permission level name"
                disabled={state.isSaving}
              />
            </Field>
          </div>

          <div className={styles.descriptionField}>
            <Field label="Description">
              <Textarea
                value={state.description}
                onChange={(_ev, data) => setState(prev => ({ ...prev, description: data.value }))}
                placeholder="Describe this permission level"
                rows={2}
                disabled={state.isSaving}
              />
            </Field>
          </div>

          {categories.map((cat) => {
            const perms = SP_PERMISSIONS.filter((p) => p.category === cat);
            return (
              <div key={cat} className={styles.section}>
                <Text block className={styles.sectionTitle} size={300}>
                  {cat} Permissions
                </Text>
                {perms.map((perm) => {
                  const enabled = isPermissionEnabled(perm, state.permLow, state.permHigh);
                  return (
                    <div key={perm.key} className={styles.permissionRow}>
                      <Checkbox
                        id={`perm-level-${perm.key}`}
                        checked={enabled}
                        label={perm.label}
                        disabled={state.isSaving}
                        onChange={(_ev, data) => handleToggle(perm.key, Boolean(data.checked))}
                      />
                      <Text block className={styles.permDescription}>
                        {perm.description}
                      </Text>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
          <Button appearance="secondary" onClick={onClose} disabled={state.isSaving} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          {mode === 'edit' && canManage && sourcePermissionLevel && (
            <Button
              appearance="primary"
              className={styles.dangerPrimary}
              icon={state.isSaving ? <Spinner size="tiny" /> : <DeleteRegular />}
              disabled={state.isSaving}
              onClick={() => setState(prev => ({ ...prev, showDeleteConfirm: true }))}
              style={{ marginRight: 8 }}
            >
              Delete
            </Button>
          )}
          <Button
            appearance="primary"
            icon={state.isSaving ? <Spinner size="tiny" /> : <SaveRegular />}
            disabled={state.isSaving || !state.name.trim()}
            onClick={() => { handleSave().catch(() => setState(prev => ({ ...prev, feedback: 'Failed to save.' }))); }}
          >
            {mode === 'edit' ? 'Update permission level' : 'Create permission level'}
          </Button>
        </div>
      </DrawerBody>
    </OverlayDrawer>

    <Dialog
      open={state.showDeleteConfirm}
      onOpenChange={(_ev, data) => { if (!data.open) setState(prev => ({ ...prev, showDeleteConfirm: false })); }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setState(prev => ({ ...prev, showDeleteConfirm: false }))}
              />
            }
          >
            Delete Permission Level
          </DialogTitle>
          <DialogContent>
            Are you sure you want to delete the permission level &ldquo;{sourcePermissionLevel?.name}&rdquo;? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => setState(prev => ({ ...prev, showDeleteConfirm: false }))}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              className={styles.dangerPrimary}
              icon={<DeleteRegular />}
              onClick={() => { handleDelete().catch(() => setState(prev => ({ ...prev, feedback: 'Failed to delete permission level.' }))); }}
            >
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </>
  );
};

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
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Tooltip
} from '@fluentui/react-components';
import {
  AddRegular,
  CopyRegular,
  DeleteRegular,
  DismissRegular,
  EditRegular
} from '@fluentui/react-icons';
import { type IPermissionLevel } from '../../../../common/interfaces';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import { PermissionLevelEditorPanel } from './PermissionLevelEditorPanel';
import type { IPermissionLevelsDialogProps, IPermissionLevelsDialogState } from './types';
import styles from './PermissionLevelsDialog.module.scss';

export const PermissionLevelsDialog: React.FC<IPermissionLevelsDialogProps> = ({
  open,
  spService,
  canManage,
  onClose
}) => {
  const [state, setState] = React.useState<IPermissionLevelsDialogState>({
    permissionLevels: [],
    isLoading: false,
    feedback: '',
    editorOpen: false,
    editorMode: 'copy',
    editorSource: undefined,
    confirmDeleteItem: undefined
  });

  const loadPermissionLevels = React.useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, feedback: '' }));
    try {
      const levels = await spService.getPermissionLevels();
      // Filter out system levels (roleTypeKind 0 = None, 255 = Guest)
      setState(prev => ({ ...prev, permissionLevels: levels.filter((pl) => pl.roleTypeKind !== 0) }));
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [spService]);

  React.useEffect(() => {
    if (!open) return;
    loadPermissionLevels().catch(() => setState(prev => ({ ...prev, feedback: 'Failed to load permission levels.' })));
  }, [open, loadPermissionLevels]);

  const handleCopy = React.useCallback((pl: IPermissionLevel): void => {
    setState(prev => ({ ...prev, editorSource: pl, editorMode: 'copy', editorOpen: true }));
  }, []);

  const handleEdit = React.useCallback((pl: IPermissionLevel): void => {
    setState(prev => ({ ...prev, editorSource: pl, editorMode: 'edit', editorOpen: true }));
  }, []);

  const handleNew = React.useCallback((): void => {
    setState(prev => ({ ...prev, editorSource: undefined, editorMode: 'new', editorOpen: true }));
  }, []);

  const handleEditorSaved = React.useCallback((): void => {
    loadPermissionLevels().catch(() => setState(prev => ({ ...prev, feedback: 'Failed to reload permission levels.' })));
  }, [loadPermissionLevels]);

  const handleDelete = React.useCallback(async (pl: IPermissionLevel): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, feedback: '', confirmDeleteItem: undefined }));
      await spService.deletePermissionLevel(pl.id);
      await loadPermissionLevels();
    } catch (err) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(err) }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [loadPermissionLevels, spService]);

  const handleDeleteClick = React.useCallback((pl: IPermissionLevel): void => {
    setState(prev => ({ ...prev, confirmDeleteItem: pl }));
  }, []);

  // Extracted to avoid nested ternaries in JSX
  let permissionLevelsContent: React.ReactNode;
  if (state.isLoading) {
    permissionLevelsContent = (
      <div className={styles.spinner}>
        <Spinner label="Loading permission levels…" />
      </div>
    );
  } else if (state.permissionLevels.length === 0) {
    permissionLevelsContent = (
      <Text className={styles.emptyText}>No permission levels found.</Text>
    );
  } else {
    permissionLevelsContent = (
      <div className={styles.tableWrapper}>
        <Table aria-label="Permission Levels" size="small">
          <TableHeader>
            <TableRow>
              <TableHeaderCell style={{ minWidth: 160 }}>Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              {canManage && (
                <TableHeaderCell className={styles.actionsHeader}>
                  <div className={styles.actionsHeaderContent}>Actions</div>
                </TableHeaderCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.permissionLevels.map((pl) => (
              <TableRow key={pl.id}>
                <TableCell>
                  <TableCellLayout>
                    <Text weight="semibold" size={200}>{pl.name}</Text>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>
                    <Text size={200} className={styles.descriptionText}>
                      {pl.description || '—'}
                    </Text>
                  </TableCellLayout>
                </TableCell>
                {canManage && (
                  <TableCell>
                    <div className={styles.actionsCell}>
                      <Tooltip content="Delete this permission level" relationship="label">
                        <Button
                          appearance="subtle"
                          size="small"
                          className={styles.dangerIconButton}
                          icon={<DeleteRegular />}
                          onClick={() => handleDeleteClick(pl)}
                          aria-label={`Delete ${pl.name}`}
                        />
                      </Tooltip>
                      <Tooltip content="Copy this permission level" relationship="label">
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<CopyRegular />}
                          onClick={() => handleCopy(pl)}
                          aria-label={`Copy ${pl.name}`}
                        />
                      </Tooltip>
                      <Tooltip content="Edit this permission level" relationship="label">
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<EditRegular />}
                          onClick={() => handleEdit(pl)}
                          aria-label={`Edit ${pl.name}`}
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(_ev, data) => { if (!data.open) onClose(); }}>
        <DialogSurface style={{ maxWidth: 700, minWidth: 480 }}>
          <DialogBody>
            <DialogTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<DismissRegular />}
                  onClick={onClose}
                />
              }
            >
              Permission Levels
            </DialogTitle>

            <DialogContent className={styles.content}>
              {canManage && (
                <div className={styles.toolbarRow}>
                  <Button
                    appearance="primary"
                    size="medium"
                    icon={<AddRegular />}
                    onClick={handleNew}
                  >
                    New permission level
                  </Button>
                </div>
              )}

              {state.feedback && (
                <MessageBar intent="error">
                  <MessageBarBody>{state.feedback}</MessageBarBody>
                </MessageBar>
              )}

              {permissionLevelsContent}
            </DialogContent>

            <DialogActions style={{ justifyContent: 'flex-end' }}>
              <Button appearance="secondary" icon={<DismissRegular />} onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <PermissionLevelEditorPanel
        open={state.editorOpen}
        mode={state.editorMode}
        sourcePermissionLevel={state.editorSource}
        spService={spService}
        canManage={canManage}
        onClose={() => setState(prev => ({ ...prev, editorOpen: false }))}
        onSaved={handleEditorSaved}
      />

      <Dialog
        open={Boolean(state.confirmDeleteItem)}
        onOpenChange={(_ev, data) => { if (!data.open) setState(prev => ({ ...prev, confirmDeleteItem: undefined })); }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<DismissRegular />}
                  onClick={() => setState(prev => ({ ...prev, confirmDeleteItem: undefined }))}
                />
              }
            >
              Delete Permission Level
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete the permission level &ldquo;{state.confirmDeleteItem?.name}&rdquo;? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                onClick={() => setState(prev => ({ ...prev, confirmDeleteItem: undefined }))}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                className={styles.dangerPrimary}
                icon={<DeleteRegular />}
                onClick={() => {
                  if (!state.confirmDeleteItem) return;
                  handleDelete(state.confirmDeleteItem).catch(() =>
                    setState(prev => ({ ...prev, feedback: 'Failed to delete permission level.' }))
                  );
                }}
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

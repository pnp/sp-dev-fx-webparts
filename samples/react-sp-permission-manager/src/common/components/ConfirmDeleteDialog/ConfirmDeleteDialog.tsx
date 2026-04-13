import * as React from 'react';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text
} from '@fluentui/react-components';
import {
  CheckmarkCircleRegular,
  DismissCircleRegular,
  DismissRegular,
  LockClosedRegular
} from '@fluentui/react-icons';
import type { IDeleteResult, IConfirmDeleteDialogProps, IConfirmDeleteDialogState } from './types';
import { CONFIRM_DELETE_DIALOG_STRINGS } from './constants';
import { getErrorMessage } from '../../utils/errorUtils';
import styles from './ConfirmDeleteDialog.module.scss';

export const ConfirmDeleteDialog: React.FC<IConfirmDeleteDialogProps> = ({
  open,
  items,
  canDelete,
  entityName = 'item',
  entityNamePlural,
  accessDeniedMessage,
  onDelete,
  onClose,
  onCompleted,
  suppressSuccessModal = false
}) => {
  const pluralName = entityNamePlural ?? `${entityName}s`;
  const capitalEntity = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const capitalPlural = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);

  const [state, setState] = React.useState<IConfirmDeleteDialogState>({
    mode: 'confirm',
    deleteResults: [],
    deletingLabel: ''
  });

  React.useEffect(() => {
    if (!open) return;
    setState({ mode: canDelete ? 'confirm' : 'access-denied', deleteResults: [], deletingLabel: '' });
  }, [open, canDelete]);

  const handleDelete = React.useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, mode: 'deleting' }));

    const results: IDeleteResult[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setState(prev => ({
        ...prev,
        deletingLabel: items.length === 1
          ? CONFIRM_DELETE_DIALOG_STRINGS.DELETING_SINGLE.replace('{itemTitle}', item.title)
          : CONFIRM_DELETE_DIALOG_STRINGS.DELETING_MULTIPLE
              .replace('{itemTitle}', item.title)
              .replace('{current}', (i + 1).toString())
              .replace('{total}', items.length.toString())
      }));

      try {
        await onDelete(item);
        results.push({ item, success: true });
      } catch (error) {
        results.push({
          item,
          success: false,
          error: getErrorMessage(error)
        });
      }
    }

    // store results first
    setState(prev => ({ ...prev, deleteResults: results }));

    const hasSuccess = results.some((r) => r.success);
    // if suppression is requested and we deleted exactly one item successfully,
    // bypass the results view entirely and just close the dialog immediately.
    if (suppressSuccessModal && hasSuccess && results.length === 1) {
      onCompleted();
      onClose();
      return;
    }

    // otherwise show results as before
    setState(prev => ({ ...prev, mode: 'result' }));

    if (hasSuccess) {
      onCompleted();
    }
  }, [items, onDelete, onCompleted, onClose, suppressSuccessModal]);

  const handleDeleteClick = React.useCallback((): void => {
    handleDelete().catch(() => undefined);
  }, [handleDelete]);

  const isSingle = items.length === 1;
  const succeededCount = state.deleteResults.filter((r) => r.success).length;
  const failedCount = state.deleteResults.filter((r) => !r.success).length;

  const renderDialogContent = (): React.ReactNode => {
    if (state.mode === 'access-denied') {
      return (
        <div className={styles.accessDeniedBody}>
          <LockClosedRegular className={styles.lockIcon} />
          <Text size={400} weight="semibold">{CONFIRM_DELETE_DIALOG_STRINGS.ACCESS_DENIED_TITLE}</Text>
          <Text>
            {accessDeniedMessage
              ?? CONFIRM_DELETE_DIALOG_STRINGS.DEFAULT_ACCESS_DENIED_MESSAGE.replace('{pluralName}', pluralName)}
          </Text>
        </div>
      );
    }

    if (state.mode === 'confirm') {
      return isSingle ? (
        <Text>
          {/* build message manually so that title can be styled without injecting HTML */}
          Are you sure you want to delete the {entityName} <Text as="span" weight="semibold">{items[0].title}</Text>? This action cannot be undone.
        </Text>
      ) : (
        <>
          <Text>
            {CONFIRM_DELETE_DIALOG_STRINGS.CONFIRM_MULTIPLE_DELETE
              .replace('{count}', items.length.toString())
              .replace('{pluralName}', pluralName)}
          </Text>
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id}><Text>{item.title}</Text></li>
            ))}
          </ul>
        </>
      );
    }

    if (state.mode === 'deleting') {
      return (
        <div className={styles.deletingBody}>
          <Spinner size="medium" label={state.deletingLabel} />
        </div>
      );
    }

    // result mode
    return (
      <>
        <div className={styles.resultSummary}>
          {succeededCount > 0 && (
            <Badge appearance="filled" color="success" icon={<CheckmarkCircleRegular />}>
              {succeededCount} {CONFIRM_DELETE_DIALOG_STRINGS.DELETED}
            </Badge>
          )}
          {failedCount > 0 && (
            <Badge appearance="filled" color="danger" icon={<DismissCircleRegular />}>
              {failedCount} {CONFIRM_DELETE_DIALOG_STRINGS.FAILED}
            </Badge>
          )}
        </div>
        <Table className={styles.resultTable} aria-label="Delete results" size="small">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{capitalEntity}</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Details</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.deleteResults.map((result) => (
              <TableRow key={result.item.id}>
                <TableCell><TableCellLayout>{result.item.title}</TableCellLayout></TableCell>
                <TableCell>
                  <TableCellLayout>
                    {result.success
                      ? <Badge appearance="filled" color="success">{CONFIRM_DELETE_DIALOG_STRINGS.STATUS_DELETED}</Badge>
                      : <Badge appearance="filled" color="danger">{CONFIRM_DELETE_DIALOG_STRINGS.STATUS_FAILED}</Badge>
                    }
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>
                    <Text size={200} className={result.success ? styles.successText : styles.errorText}>
                      {result.success ? CONFIRM_DELETE_DIALOG_STRINGS.SUCCESSFULLY_DELETED : (result.error ?? CONFIRM_DELETE_DIALOG_STRINGS.UNKNOWN_ERROR)}
                    </Text>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  const renderDialogActions = (): React.ReactNode => {
    if (state.mode === 'access-denied' || state.mode === 'result') {
      return (
        <DialogActions>
          <Button appearance="primary" onClick={onClose}>{CONFIRM_DELETE_DIALOG_STRINGS.CLOSE}</Button>
        </DialogActions>
      );
    }

    if (state.mode === 'confirm') {
      return (
        <DialogActions>
          <Button appearance="secondary" onClick={onClose}>{CONFIRM_DELETE_DIALOG_STRINGS.CANCEL}</Button>
          <Button appearance="primary" className={styles.dangerPrimary} onClick={handleDeleteClick}>{CONFIRM_DELETE_DIALOG_STRINGS.DELETE}</Button>
        </DialogActions>
      );
    }

    return null;
  };

  const getTitle = (): string => {
    if (state.mode === 'access-denied') return `Delete ${capitalEntity}`;
    if (state.mode === 'confirm') {
      return isSingle
        ? `Delete ${capitalEntity}`
        : `Delete ${capitalPlural} (${items.length})`;
    }
    if (state.mode === 'deleting') return CONFIRM_DELETE_DIALOG_STRINGS.DELETING_TITLE;
    return CONFIRM_DELETE_DIALOG_STRINGS.RESULTS_TITLE;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_event, data) => {
        if (!data.open && state.mode !== 'deleting') {
          onClose();
        }
      }}
    >
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label={CONFIRM_DELETE_DIALOG_STRINGS.CLOSE}
                icon={<DismissRegular />}
                disabled={state.mode === 'deleting'}
                onClick={() => {
                  if (state.mode !== 'deleting') onClose();
                }}
              />
            }
          >
            {getTitle()}
          </DialogTitle>
          <DialogContent>
            {renderDialogContent()}
          </DialogContent>
          {renderDialogActions()}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

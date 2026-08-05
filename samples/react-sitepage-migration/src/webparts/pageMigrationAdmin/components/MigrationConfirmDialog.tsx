import * as React from 'react';
import {
  Body1,
  Button,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  MessageBar,
  MessageBarBody,
  MessageBarTitle
} from '@fluentui/react-components';
import { SiteReference } from '../../../models/SiteReference';
import { ConflictMode } from '../../../models/OperationalTypes';
import { formatString } from '../../../utilities/formatString';
import { conflictModeLabel } from './localization';
import { usePortalMountNode } from './portalMount';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface MigrationConfirmDialogProps {
  readonly isOpen: boolean;
  readonly sourceSite?: SiteReference;
  readonly targetSite?: SiteReference;
  readonly selectedCount: number;
  readonly commentCount: number;
  readonly conflictMode: ConflictMode;
  readonly publishOnComplete: boolean;
  readonly onConfirm: () => void;
  readonly onDismiss: () => void;
}

export const MigrationConfirmDialog: React.FC<MigrationConfirmDialogProps> = (props) => {
  const styles = useAppStyles();
  const mountNode = usePortalMountNode();

  return (
    <Dialog
      open={props.isOpen}
      modalType="alert"
      onOpenChange={(_, data) => {
        if (!data.open) {
          props.onDismiss();
        }
      }}
    >
      <DialogSurface mountNode={mountNode}>
        <DialogBody>
          <DialogTitle>{strings.ConfirmTitle}</DialogTitle>
          <DialogContent>
            <Body1 block>{strings.ConfirmDescription}</Body1>

            <dl className={styles.dialogSummary}>
              <dt><Caption1>{strings.ConfirmSourceLabel}</Caption1></dt>
              <dd className={styles.definitionValue}><Body1>{props.sourceSite?.displayName ?? ''}</Body1></dd>

              <dt><Caption1>{strings.ConfirmTargetLabel}</Caption1></dt>
              <dd className={styles.definitionValue}><Body1>{props.targetSite?.displayName ?? ''}</Body1></dd>

              <dt><Caption1>{strings.ConfirmPagesLabel}</Caption1></dt>
              <dd className={styles.definitionValue}><Body1>{props.selectedCount.toString()}</Body1></dd>

              <dt><Caption1>{strings.ConfirmConflictLabel}</Caption1></dt>
              <dd className={styles.definitionValue}><Body1>{conflictModeLabel(props.conflictMode)}</Body1></dd>

              <dt><Caption1>{strings.ConfirmPublishLabel}</Caption1></dt>
              <dd className={styles.definitionValue}>
                <Body1>{props.publishOnComplete ? strings.ConfirmPublishOn : strings.ConfirmPublishOff}</Body1>
              </dd>
            </dl>

            <MessageBar intent="warning">
              <MessageBarBody>
                <MessageBarTitle>{strings.DataLossTitle}</MessageBarTitle>
                <ul className={styles.dialogList}>
                  <li>{strings.DataLossVersions}</li>
                  <li>
                    {props.commentCount > 0
                      ? formatString(strings.DataLossCommentsCounted, props.commentCount)
                      : strings.DataLossComments}
                  </li>
                  <li>{strings.DataLossAnalytics}</li>
                  <li>{strings.DataLossAuthorship}</li>
                  <li>{strings.DataLossCustomColumns}</li>
                </ul>
              </MessageBarBody>
            </MessageBar>

            {props.conflictMode === 'Replace' ? (
              <MessageBar intent="error" politeness="assertive">
                <MessageBarBody>{strings.ConfirmReplaceWarning}</MessageBarBody>
              </MessageBar>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={props.onDismiss}>{strings.CancelLabel}</Button>
            <Button appearance="primary" onClick={props.onConfirm}>{strings.ConfirmButton}</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

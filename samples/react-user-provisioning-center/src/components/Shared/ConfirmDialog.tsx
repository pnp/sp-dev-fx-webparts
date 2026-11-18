import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle
} from '@fluentui/react-components';

export interface IConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = (props) => (
  <Dialog
    modalType="alert"
    open={props.open}
    onOpenChange={(_, data) => {
      if (!data.open) {
        props.onCancel();
      }
    }}
  >
    <DialogSurface>
      <DialogBody>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button appearance="secondary" onClick={props.onCancel}>
            {props.cancelLabel}
          </Button>
        <Button appearance="primary" onClick={props.onConfirm} disabled={props.confirmDisabled}>
          {props.confirmLabel}
        </Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

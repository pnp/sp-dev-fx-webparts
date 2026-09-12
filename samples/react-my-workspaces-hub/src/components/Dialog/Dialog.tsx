import * as React from 'react';
import {
  Dialog as FluentDialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle
} from '@fluentui/react-components';
import type { IDialogProps } from './Dialog.types';

export const Dialog: React.FC<IDialogProps> = ({ open, onOpenChange, modalType, title, body }) => (
  <FluentDialog open={open} onOpenChange={onOpenChange} modalType={modalType}>
    <DialogSurface>
      <DialogBody>
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        {body ? <DialogContent>{body}</DialogContent> : null}
      </DialogBody>
    </DialogSurface>
  </FluentDialog>
);

Dialog.displayName = 'Dialog';

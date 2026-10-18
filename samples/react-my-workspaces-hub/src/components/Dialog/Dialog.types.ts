import type * as React from 'react';
import type { DialogProps as FluentDialogProps } from '@fluentui/react-components';

export interface IDialogProps {
  open?: FluentDialogProps['open'];
  onOpenChange?: FluentDialogProps['onOpenChange'];
  modalType?: FluentDialogProps['modalType'];
  title?: React.ReactNode;
  body?: React.ReactNode;
}

import type * as React from 'react';

export interface IDrawerProps {
  open?: boolean;
  onClose?: () => void;
  position?: 'start' | 'end' | 'bottom';
  size?: 'small' | 'medium' | 'large' | 'full';
  title?: React.ReactNode;
  children?: React.ReactNode;
  closeButtonAriaLabel?: string;
}

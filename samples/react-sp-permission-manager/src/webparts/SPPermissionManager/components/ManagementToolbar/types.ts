import type * as React from 'react';

/** Re-exported for consumers that still reference this type */
export type TManagementArea = 'manage-groups' | 'manage-users' | 'manage-permissions';

export interface IManagementToolbarProps {
  onActionClick?: (actionKey: string) => void;
  disabledActionKeys?: Set<string>;
  visibleActionKeys?: Set<string>;
  isExportDisabled?: boolean;
}

export interface IRibbonButtonProps {
  icon: React.ReactElement;
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  iconColor?: string;
}

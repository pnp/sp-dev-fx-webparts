import * as React from 'react';
import type { IRibbonButtonProps } from './types';
import styles from './ManagementToolbar.module.scss';

export const RibbonButton = React.forwardRef<HTMLButtonElement, IRibbonButtonProps>(
  ({ icon, label, onClick, disabled, iconColor }, ref) => (
    <button
      ref={ref}
      type="button"
      className={[
        styles.ribbonButton,
        disabled ? styles.ribbonButtonDisabled : ''
      ].filter(Boolean).join(' ')}
      style={iconColor ? { '--ribbon-icon-color': iconColor } as React.CSSProperties : undefined}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={styles.ribbonButtonIcon}>{icon}</span>
      <span className={styles.ribbonButtonLabel}>{label}</span>
    </button>
  )
);

RibbonButton.displayName = 'RibbonButton';

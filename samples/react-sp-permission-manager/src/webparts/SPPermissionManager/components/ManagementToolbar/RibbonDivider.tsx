import * as React from 'react';
import styles from './ManagementToolbar.module.scss';

export const RibbonDivider: React.FC = () => (
  <div className={styles.ribbonDivider} aria-hidden="true" />
);

import * as React from 'react';
import styles from './PhoneMockup.module.scss';

export interface IPhoneMockupProps {
  children: React.ReactNode;
}

export const PhoneMockup: React.FunctionComponent<IPhoneMockupProps> = ({ children }) => {
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.notch}>
        <div className={styles.cameraDot} />
      </div>
      <div className={styles.statusBar}>
        <span>9:41</span>
        <span className={styles.statusIcons}>
          <span>5G</span>
          <span>100%</span>
        </span>
      </div>
      <div className={styles.screen}>
        {children}
      </div>
      <div className={styles.homeIndicator} />
    </div>
  );
};

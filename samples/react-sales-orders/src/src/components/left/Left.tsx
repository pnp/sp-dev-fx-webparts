import * as React from 'react';

import { BACKGROUND } from '../../constants/constants';
import { useLeftStyles } from './useLeftStyles';

export interface ILeftProps {}

export const Left: React.FunctionComponent<ILeftProps> = (props: React.PropsWithChildren<ILeftProps>) => {
  const { children } = props;
  const styles = useLeftStyles();
  return (
    <>
      <div className={styles.leftContainer} style={{ background: BACKGROUND }}>
        {children}
      </div>
    </>
  );
};

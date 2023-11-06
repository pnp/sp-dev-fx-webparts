import * as React from 'react';

import { useRightStyles } from './useRightStyles';

export interface ILeftProps {}

export const Right: React.FunctionComponent<ILeftProps> = (props: React.PropsWithChildren<ILeftProps>) => {
  const { children } = props;
  const styles = useRightStyles();
  return (
    <>
      <div
        className={styles.rightContainer}>
        {children}
      </div>
    </>
  );
};

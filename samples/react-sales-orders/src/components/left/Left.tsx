import * as React from 'react';

import { useLeftStyles } from './useLeftStyles';

export interface ILeftProps {}

export const Left: React.FunctionComponent<ILeftProps> = (props: React.PropsWithChildren<ILeftProps>) => {
  const { children } = props;
  const styles = useLeftStyles();
  return (
    <>
      <div
        className={styles.leftContainer}
        style={{ background: "linear-gradient(122.54deg, rgba(19, 29, 255, 0.2) 0%, rgba(97, 217, 149, 0.2) 100%)" }}
      >
        {children}
      </div>
    </>
  );
};

import * as React from 'react';

import { useRightStyles } from './useRightStyles';

export interface ILeftProps {
  children?: React.ReactNode;
}

export const Right: React.FunctionComponent<ILeftProps> = (props: React.PropsWithChildren<ILeftProps>) => {
  const rightStyles = useRightStyles();
  const { children } = props;
  return (
    <>
      <div className={rightStyles.root}>{children}</div>
    </>
  );
};

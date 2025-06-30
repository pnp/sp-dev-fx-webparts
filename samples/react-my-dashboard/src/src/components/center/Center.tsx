import * as React from 'react';

import { useCenterStyles } from './useCenterStyles';

export interface IHeaderProps {
  children?: React.ReactNode;
}

export const Center: React.FunctionComponent<IHeaderProps> = (props: React.PropsWithChildren<IHeaderProps>) => {
  const centerStyles = useCenterStyles();
  return (
    <>
      <div className={centerStyles.root}>{props.children}</div>
    </>
  );
};

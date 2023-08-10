import * as React from 'react';

import { useHeaderStyles } from './useHeaderStyles';

export interface IHeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FunctionComponent<IHeaderProps> = (props: React.PropsWithChildren<IHeaderProps>) => {
  const headerStyles = useHeaderStyles();
  return (
    <>
      <div className={headerStyles.root}>{props.children}</div>
    </>
  );
};

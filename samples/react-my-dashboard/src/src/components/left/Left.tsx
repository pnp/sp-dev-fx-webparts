import * as React from 'react';

import { useLeftStyles } from './useLeftStyles';

export interface ILeftProps {
  children?: React.ReactNode;
}

export const Left: React.FunctionComponent<ILeftProps> = (props: React.PropsWithChildren<ILeftProps>) => {
  const leftStyles = useLeftStyles();
  const { children } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={leftStyles.root} ref={divRef}>
        {children}
      </div>
    </>
  );
};

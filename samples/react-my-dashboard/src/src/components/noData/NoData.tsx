import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { Body1 } from '@fluentui/react-components';

import { useNoDataStyles } from './useNoDataStyles';

export interface INoDataProps {
  children?: React.ReactNode;
  message?: string;
}

export const NoData: React.FunctionComponent<INoDataProps> = (props: React.PropsWithChildren<INoDataProps>) => {
  const styles = useNoDataStyles();
  const { children, message } = props;
  return (
    <>
      <div className={styles.noData}>
        {children}
        <Body1>{message ?? strings.NoData}</Body1>
      </div>
    </>
  );
};

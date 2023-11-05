import * as React from 'react';

import {
  Body2,
  tokens,
} from '@fluentui/react-components';
import { Icon } from '@iconify/react';

import { useNoOrdersStyles } from './useNoOrdersStyles';

export interface INoOrdersProps {}

export const NoOrders: React.FunctionComponent<INoOrdersProps> = (props: React.PropsWithChildren<INoOrdersProps>) => {
  const styles = useNoOrdersStyles();
  return (
    <>
      <div className={styles.container}>
        <Icon icon="fluent:cloud-database-20-regular" width={82} height={82} color={tokens.colorBrandForeground1} />
        <Body2>No orders found</Body2>
      </div>
    </>
  );
};

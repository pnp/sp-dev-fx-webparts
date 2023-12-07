import * as React from 'react';

import {
  Body2,
  Card,
  CardHeader,
  Title2,
  tokens,
} from '@fluentui/react-components';

import { useStatusOrdersInfoStyles } from './useStatusOrdersInfoStyles';

export interface IStatusOrdersInfoProps {
  totalOrders: number;
  totalDelivered: number;
  pendingOrders: number;
  processingOrders: number;
}

export const StatusOrdersInfo: React.FunctionComponent<IStatusOrdersInfoProps> = (
  props: React.PropsWithChildren<IStatusOrdersInfoProps>
) => {
  const styles = useStatusOrdersInfoStyles();
  const { totalOrders, totalDelivered, pendingOrders, processingOrders } = props;
  return (
    <>
      <div >
        <Card className={styles.card} appearance="outline">
          <CardHeader
           key={1}
            header={<Title2 style={{ color: tokens.colorPaletteBlueBorderActive }}>{totalOrders}</Title2>}
            description={<Body2>Total Orders</Body2>}
          />
          <CardHeader
            key={2}
            header={<Title2 style={{ color: tokens.colorStatusSuccessForegroundInverted }}>{totalDelivered}</Title2>}
            description={<Body2>Total Delivered</Body2>}
          />
          <CardHeader
            key={3}
            header={<Title2 style={{ color: tokens.colorStatusDangerForegroundInverted }}>{pendingOrders}</Title2>}
            description={<Body2>Pending Orders</Body2>}
          />
          <CardHeader
            key={4}
            header={<Title2 style={{ color: tokens.colorPalettePeachBorderActive }}>{processingOrders}</Title2>}
            description={<Body2>Processing orders</Body2>}
          />
        </Card>
      </div>
    </>
  );
};

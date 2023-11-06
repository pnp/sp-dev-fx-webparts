/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { useAtomValue } from 'jotai';

import {
  Avatar,
  Badge,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  Link,
  TableCellLayout,
  TableColumnDefinition,
  tokens,
} from '@fluentui/react-components';

import { appGlobalStateAtom } from '../../atoms/appGlobalStateAtom';
import { IOrder } from '../../models/IOrder';
import { useOrdersGridStyles } from './useOrdersGridStyles';

const columns: TableColumnDefinition<IOrder>[] = [
  createTableColumn<IOrder>({
    columnId: "customer",
    compare: (a, b) => {
      return a.customer.localeCompare(b.customer);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Customer</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout appearance="primary" truncate media={<Avatar name={item.customer} color="colorful" />}>
          {item.customer}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<IOrder>({
    columnId: "email",
    compare: (a, b) => {
      const customerEmailA = a?.custmoerEmail ?? "";
      const customerEmailB = b?.custmoerEmail ?? "";
      return customerEmailA.localeCompare(customerEmailB);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Email</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          <Link href={`mailto:${item.custmoerEmail}`}>{item.custmoerEmail} </Link>
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<IOrder>({
    columnId: "city",
    compare: (a, b) => {
      return a.city.localeCompare(b.city);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 600 }}>City</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.city} </TableCellLayout>;
    },
  }),
  createTableColumn<IOrder>({
    columnId: "order",
    compare: (a, b) => {
      return a.order < b.order ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 600 }}>Order</span>;
    },

    renderCell: (item) => {
      return <TableCellLayout truncate>{item.order} </TableCellLayout>;
    },
  }),
  createTableColumn<IOrder>({
    columnId: "total",
    compare: (a, b) => {
      return a.total < b.total ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Total</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout style={{ color: tokens.colorBrandForeground1, fontWeight: tokens.fontWeightMedium }} truncate>
          {` $ ${item.total} `}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<IOrder>({
    columnId: "orderDate",
    compare: (a, b) => {
      return a.orderDate.localeCompare(b.orderDate);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Order Date</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.orderDate} </TableCellLayout>;
    },
  }),
  createTableColumn<IOrder>({
    columnId: "status",
    compare: (a, b) => {
      return a.status.localeCompare(b.status);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Status</span>;
    },
    renderCell: (item) => {
      const getColor = (status: string) => {
        switch (status) {
          case "In-Process":
            return "severe";
          case "Shipped":
            return "success";
          case "New":
            return "warning";
          default:
            return "brand";
        }
      };
      return (
        <TableCellLayout
          truncate
          media={
            <Badge appearance="filled" color={getColor(item.status)}>
              {item.status}
            </Badge>
          }
        />
      );
    },
  }),
];

const columnSizingOptions = {
  customer: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  email: {
    defaultWidth: 200,
    minWidth: 180,
    idealWidth: 200,
  },
  city: {
    defaultWidth: 100,
    minWidth: 120,
    idealWidth: 100,
  },
  order: {
    defaultWidth: 70,
    minWidth: 70,
    idealWidth: 70,
  },
  total: {
    defaultWidth: 100,
    minWidth: 100,
    idealWidth: 100,
  },
  orderDate: {
    defaultWidth: 100,
    minWidth: 100,
    idealWidth: 120,
  },
  status: {
    defaultWidth: 120,
    minWidth: 120,
    idealWidth: 120,
  },
};

interface IOrdersGridProps {
  items: IOrder[];
}

export const OrdersGrid: React.FunctionComponent<IOrdersGridProps> = (
  props: React.PropsWithChildren<IOrdersGridProps>
) => {
  const { items } = props;
  const appGlobalState = useAtomValue(appGlobalStateAtom);
   const {hasTeamsContext } = appGlobalState;
  const [sortState, setSortState] = React.useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
    sortColumn: "customer",
    sortDirection: "ascending",
  });
  const onSortChange = React.useCallback((e, nextSortState) => {
    setSortState(nextSortState);
  }, []);

  const styles = useOrdersGridStyles();

  return (
      <div className={styles.gridContainer} style={{height: !hasTeamsContext ? 'calc(100vh - 420px': 'calc(100vh - 240px' }}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
        columnSizingOptions={columnSizingOptions}
        resizableColumns
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<IOrder>>
          {({ item, rowId }) => (
            <DataGridRow<IOrder> key={rowId}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      </div>
  );
};

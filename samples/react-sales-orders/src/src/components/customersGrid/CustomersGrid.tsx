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
import { ICustomer } from '../../models/ICustomer';
import { useCustomerGridStyles } from './useCustomerGridStyles';

const columns: TableColumnDefinition<ICustomer>[] = [
  createTableColumn<ICustomer>({
    columnId: "code",
    compare: (a, b) => {
      return a.customerCode < b.customerCode ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Id</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.customerCode}</TableCellLayout>;
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "customer",
    compare: (a, b) => {
      return a.customerName.localeCompare(b.customerName);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Customer</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout appearance="primary" truncate media={<Avatar name={item.customerName} color="colorful" />}>
          {item.customerName}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "state",
    compare: (a, b) => {
      return a.customerState.localeCompare(b.customerState);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 600 }}>State</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.customerState}</TableCellLayout>;
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "country",
    compare: (a, b) => {
      return a.customerCountry.localeCompare(b.customerCountry);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 600 }}>Country</span>;
    },

    renderCell: (item) => {
      return <TableCellLayout truncate>{item.customerCountry}</TableCellLayout>;
    },
  }),

  createTableColumn<ICustomer>({
    columnId: "email",
    compare: (a, b) => {
      return a.customerEmail.localeCompare(b.customerEmail);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Email</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          <Link href={`mailto:${item.customerEmail}`}>{item.customerEmail} </Link>
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "totalOrders",
    compare: (a, b) => {
      return a.totalOrders < b.totalOrders ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Total Orders</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.totalOrders}</TableCellLayout>;
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "lastOrder",
    compare: (a, b) => {
      return a.lastOrder < b.lastOrder ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Last Order</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.lastOrder}</TableCellLayout>;
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "lastOrderDate",
    compare: (a, b) => {
      return a.lastOrderDate.localeCompare(b.lastOrderDate);
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Last Order date</span>;
    },
    renderCell: (item) => {
      return <TableCellLayout truncate>{item.lastOrderDate}</TableCellLayout>;
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "lastOrderTotal",
    compare: (a, b) => {
      return a.lastOrderTotal < b.lastOrderTotal ? -1 : 1;
    },
    renderHeaderCell: () => {
      return <span style={{ fontWeight: 700 }}>Last Order Total</span>;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate>
          <span style={{ color: tokens.colorBrandForeground1 }}>$ {item.lastOrderTotal}</span>
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<ICustomer>({
    columnId: "status",
    compare: (a, b) => {
      return a.lastOrderStatus.localeCompare(b.lastOrderStatus);
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
            <Badge appearance="filled" color={getColor(item.lastOrderStatus)}>
              {item.lastOrderStatus}
            </Badge>
          }
        />
      );
    },
  }),
];

const columnSizingOptions = {
  code: {
    minWidth: 50,
    defaultWidth: 50,
    idealWidth: 50,
    maxWidth: 50,
  },
  customer: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  email: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
  state: {
    defaultWidth: 50,
    minWidth: 50,
    idealWidth: 50,
  },
  country: {
    defaultWidth: 50,
    minWidth: 50,
    idealWidth: 50,
  },
  totalOrders: {
    defaultWidth: 60,
    minWidth: 60,
    idealWidth: 60,
  },
};

interface ICustomersGridProps {
  items: ICustomer[];
}

export const CustomersGrid: React.FunctionComponent<ICustomersGridProps> = (
  props: React.PropsWithChildren<ICustomersGridProps>
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

  const styles = useCustomerGridStyles();

  return (
    <div className={styles.gridContainer} style={{height: !hasTeamsContext ? 'calc(100vh - 397px': 'calc(100vh - 240px' }}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        size="medium"
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<ICustomer>>
          {({ item, rowId }) => (
            <DataGridRow<ICustomer> key={rowId}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
 


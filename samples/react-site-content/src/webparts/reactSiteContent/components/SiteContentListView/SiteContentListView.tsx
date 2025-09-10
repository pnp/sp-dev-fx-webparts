/* eslint-disable @rushstack/no-new-null */
import {
  FluentProvider,
  IdPrefixProvider,
  InputOnChangeData,
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SearchBox,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  webLightTheme,
} from "@fluentui/react-components";
import * as React from "react";
import { IListViewItem } from "../../models/IListViewItem";
import { getItemThumbnail } from "../../services/HelperService";
import { DocumentRegular } from "@fluentui/react-icons";

const columnsDef = (): TableColumnDefinition<IListViewItem>[] => {
  return [
    createTableColumn<IListViewItem>({
      columnId: "Name",
      renderHeaderCell: () => (
        <>
          <DocumentRegular />
          Name
        </>
      ),
    }),
    createTableColumn<IListViewItem>({
      columnId: "Type",
      renderHeaderCell: () => <>Type</>,
    }),
    createTableColumn<IListViewItem>({
      columnId: "Items",
      renderHeaderCell: () => <>Items</>,
    }),
    createTableColumn<IListViewItem>({
      columnId: "Modified",
      renderHeaderCell: () => <>Modified</>,
    }),
    createTableColumn<IListViewItem>({
      columnId: "Description",
      renderHeaderCell: () => <>Description</>,
    }),
  ];
};

interface ISiteContentListViewProps {
  items: IListViewItem[];
  onFilter: (searchValue: string | undefined | null) => void;
}

export const SiteContentListView = (props: ISiteContentListViewProps): JSX.Element => {
  const [columns] = React.useState<TableColumnDefinition<IListViewItem>[]>(columnsDef);
  const { items, onFilter } = props;

  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    name: {
      idealWidth: 500,
    },
    type: {
      minWidth: 110,
    },
    items: {
      minWidth: 150,
    },
    modified: {
      minWidth: 110,
    },
    description: {
      minWidth: 400,
    },
  });

  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableColumnSizing_unstable({
        columnSizingOptions,
        autoFitColumns: false,
      }),
    ]
  );
  const rows = getRows();

  return (
    <IdPrefixProvider value="react-site-content">
      <FluentProvider theme={webLightTheme}>
        <div style={{ display: "Flex", marginTop: 10, justifyContent: "flex-end" }}>
          <div style={{ width: 250 }}>
            <SearchBox onChange={(_, data: InputOnChangeData) => onFilter(data.value)} />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table ref={tableRef} {...columnSizing_unstable.getTableProps()} noNativeElements={true}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <Menu openOnContext key={column.columnId}>
                    <MenuTrigger>
                      <TableHeaderCell key={column.columnId} {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}>
                        {column.renderHeaderCell()}
                      </TableHeaderCell>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem onClick={columnSizing_unstable.enableKeyboardMode(column.columnId)}>Keyboard Column Resizing</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ item }) => (
                <TableRow key={item.Name}>
                  <TableCell {...columnSizing_unstable.getTableCellProps("Name")}>
                    <TableCellLayout media={<img src={getItemThumbnail(item.Thumbnail)} alt="" />}>
                      <Link target="_blank" data-interception="off" href={item.Target} style={{ color: "inherit" }}>
                        {item.Name}
                      </Link>
                    </TableCellLayout>
                  </TableCell>
                  <TableCell {...columnSizing_unstable.getTableCellProps("Type")}>
                    <TableCellLayout>{item.Type}</TableCellLayout>
                  </TableCell>
                  <TableCell {...columnSizing_unstable.getTableCellProps("Items")}>
                    <TableCellLayout>{item.Items !== null && item.Items !== undefined && item.Items > -1 ? `${item.Items}` : ""}</TableCellLayout>
                  </TableCell>
                  <TableCell {...columnSizing_unstable.getTableCellProps("Modified")}>
                    <TableCellLayout>{item.Modified ?? ""}</TableCellLayout>
                  </TableCell>
                  <TableCell {...columnSizing_unstable.getTableCellProps("Description")}>
                    <TableCellLayout>{item.Description ?? ""}</TableCellLayout>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </FluentProvider>
    </IdPrefixProvider>
  );
};

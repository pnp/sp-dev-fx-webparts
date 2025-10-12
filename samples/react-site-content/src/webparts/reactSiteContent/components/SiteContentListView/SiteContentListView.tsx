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
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnId,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  webLightTheme,
} from "@fluentui/react-components";
import * as React from "react";
import { IListViewItem } from "../../models/IListViewItem";
import { getItemThumbnail } from "../../services/HelperService";
import { DocumentRegular } from "@fluentui/react-icons";
import { ListItemMenu } from "../ListItemMenu/ListItemMenu";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { GraphService } from "../../services/GraphService";
import { Drive } from "@microsoft/microsoft-graph-types";
import { DriveInfo } from "../DriveInfo/DriveInfo";

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
      compare: (a, b) => {
        return a.Name.localeCompare(b.Name);
      },
    }),
    createTableColumn<IListViewItem>({
      columnId: "Type",
      renderHeaderCell: () => <>Type</>,
      compare: (a, b) => {
        return a.Type.localeCompare(b.Type);
      },
    }),
    createTableColumn<IListViewItem>({
      columnId: "Items",
      renderHeaderCell: () => <>Items</>,
      compare: (a, b) => {
        return a.Items && b.Items ? a.Items?.toString().localeCompare(b.Items?.toString()) : -1;
      },
    }),
    createTableColumn<IListViewItem>({
      columnId: "Modified",
      renderHeaderCell: () => <>Modified</>,
      compare: (a, b) => {
        return a.Modified.localeCompare(b.Modified);
      },
    }),
    createTableColumn<IListViewItem>({
      columnId: "Description",
      renderHeaderCell: () => <>Description</>,
      compare: (a, b) => {
        return a.Description.localeCompare(b.Description);
      },
    }),
  ];
};

interface ISiteContentListViewProps {
  items: IListViewItem[];
  context: WebPartContext;
  onFilter: (searchValue: string | undefined | null) => void;
}

export const SiteContentListView = (props: ISiteContentListViewProps): JSX.Element => {
  const [columns] = React.useState<TableColumnDefinition<IListViewItem>[]>(columnsDef);
  const { items, onFilter } = props;
  const [showDriveDetails, setShowDriveDetails] = React.useState<boolean>(false);
  const [driveDetails, setDriveDetails] = React.useState<Drive | undefined>(undefined);
  const [graphService] = React.useState<GraphService>(() => new GraphService(props.context));

  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    name: {
      idealWidth: 500,
      minWidth: 350,
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

  const {
    getRows,
    columnSizing_unstable,
    tableRef,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableColumnSizing_unstable({
        columnSizingOptions,
        autoFitColumns: false,
      }),
      useTableSort({
        defaultSortState: { sortColumn: "file", sortDirection: "ascending" },
      }),
    ]
  );

  const headerSortProps = (
    columnId: TableColumnId
  ): {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  } => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });
  const rows = sort(getRows());

  const handleDriveInfoClick = async (name: string): Promise<void> => {
    try {
      const response = await graphService.getDriveDetails(name);
      setShowDriveDetails(true);
      setDriveDetails(response);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDriveInfoClose = (): void => {
    setShowDriveDetails(false);
  };

  return (
    <IdPrefixProvider value="react-site-content">
      <FluentProvider theme={webLightTheme}>
        <div style={{ display: "flex", marginTop: 10, justifyContent: "flex-end" }}>
          <div style={{ width: 250 }}>
            <SearchBox onChange={(_, data: InputOnChangeData) => onFilter(data.value)} />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table ref={tableRef} {...columnSizing_unstable.getTableProps()} noNativeElements={true} sortable>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <Menu openOnContext key={column.columnId}>
                    <MenuTrigger>
                      <TableHeaderCell
                        key={column.columnId}
                        {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}
                        {...headerSortProps(column.columnId)}
                      >
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
                    <TableCellActions>
                      <ListItemMenu item={item} context={props.context} onDriveInfoClick={() => handleDriveInfoClick(item.Name)} />
                    </TableCellActions>
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
        {showDriveDetails && driveDetails && <DriveInfo driveDetails={driveDetails} onClose={handleDriveInfoClose} />}
      </FluentProvider>
    </IdPrefixProvider>
  );
};

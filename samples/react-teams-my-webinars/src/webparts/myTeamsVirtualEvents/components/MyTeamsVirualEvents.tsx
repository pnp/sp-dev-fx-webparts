/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import styles from './MyTeamsVirtualEvents.module.scss';
import type { IMyTeamsVirtualEventsProps } from './IMyTeamsVirtualEventsProps';
import {
  DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridProps, DataGridRow, Skeleton, SkeletonItem, Spinner,
  TableColumnDefinition, createTableColumn, makeStyles, shorthands, tokens, Text, Toolbar, ToolbarButton, TableRowId, Tooltip, Link, Button,
  DrawerBody, DrawerHeader, DrawerHeaderTitle, OverlayDrawer
} from '@fluentui/react-components';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { GraphError } from '@microsoft/microsoft-graph-client';
import RegistrantCounts from './RegistrantCounts';
import { ApprovalsAppRegular, ApprovalsAppFilled, bundleIcon, FilterSyncRegular, FilterSyncFilled, DismissRegular, DismissFilled } from '@fluentui/react-icons';
import TeamApprove from './TeamApprove';
import * as strings from 'MyTeamsVirtualEventsWebPartStrings';
import Sync from './Sync';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  skeletonRow: {
    alignItems: "center",
    display: "grid",
    paddingBottom: "10px",
    width: "100%",
    position: "relative",
    ...shorthands.gap("10px"),
    gridTemplateColumns: "min-content 20% 20% 15% 15%",
  },
});

const ApprovalIcon = bundleIcon(ApprovalsAppFilled, ApprovalsAppRegular);
const SyncListIcon = bundleIcon(FilterSyncFilled, FilterSyncRegular);
const DismissIcon = bundleIcon(DismissRegular, DismissFilled);

enum DrawState { Closed, OpenTeam, OpenSync }

export default function MyTeamsVirtualEvents(props: IMyTeamsVirtualEventsProps): React.ReactElement<IMyTeamsVirtualEventsProps> {
  const { context } = props;
  const styles2 = useStyles();
  const [events, setEvents] = React.useState<MicrosoftGraphBeta.VirtualEventWebinar[]>();
  const [selectedRows, setSelectedRows] = React.useState(new Set<TableRowId>([]));
  const [drawState, setDrawState] = React.useState<DrawState>(DrawState.Closed);

  const processGraph = (client: MSGraphClientV3, err: GraphError, res: { '@odata.nextlink'?: string, value: MicrosoftGraphBeta.VirtualEventWebinar[] }): void => {
    if (err) {
      console.error(err);
      return;
    }
    setEvents((events ?? []).concat(res.value.filter(e => e.startDateTime?.dateTime && new Date(e.startDateTime.dateTime) > new Date())));
    if (res['@odata.nextlink'])
      client.api(res['@odata.nextlink'])
        .get((err1: GraphError, res1: { '@odata.nextlink'?: string, value: MicrosoftGraphBeta.VirtualEventWebinar[] }) => processGraph(client, err1, res1))
        .catch(console.error);
  };

  React.useEffect(() => {
    context.msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3) => {
        client
          .api(`/solutions/virtualEvents/webinars/getByUserRole(role='organizer')`)
          .version("Beta")
          .filter(`status eq 'published' and startDateTime/dateTime gt '${new Date().toJSON()}'`)
          .get((err: GraphError, res: { '@odata.nextlink'?: string, value: MicrosoftGraphBeta.VirtualEventWebinar[] }) => processGraph(client, err, res))
          .catch(console.error);
      }).catch(console.error);
  }, [context]);

  const columns: TableColumnDefinition<MicrosoftGraphBeta.VirtualEventWebinar>[] = [
    createTableColumn<MicrosoftGraphBeta.VirtualEventWebinar>({
      columnId: "name",
      compare: (a, b) => (a.displayName ?? "").localeCompare(b.displayName ?? ""),
      renderHeaderCell: () => strings.Name,
      renderCell: (item) => <Link href={`https://events.teams.microsoft.com/event/${item.id}`} target='_blank'>{item.displayName}</Link>,

    }),
    createTableColumn<MicrosoftGraphBeta.VirtualEventWebinar>({
      columnId: "createdBy",
      compare: (a, b) => (a.createdBy?.user?.displayName ?? "").localeCompare(b.createdBy?.user?.displayName ?? ""),
      renderHeaderCell: () => strings.CreatedBy,
      renderCell: (item) => item.createdBy?.user?.displayName ?? JSON.stringify(item.createdBy)
    }),
    createTableColumn<MicrosoftGraphBeta.VirtualEventWebinar>({
      columnId: "start",
      compare: (a, b) => (new Date(a.startDateTime!.dateTime!) as unknown as number) - (new Date(b.startDateTime!.dateTime!) as unknown as number),
      renderHeaderCell: () => strings.Start,
      renderCell: (item) => <Text size={100}>{new Date(item.startDateTime!.dateTime!).toLocaleString()}</Text>
    }),
    createTableColumn<MicrosoftGraphBeta.VirtualEventWebinar>({
      columnId: "end",
      compare: (a, b) => (new Date(a.endDateTime!.dateTime!) as unknown as number) - (new Date(b.endDateTime!.dateTime!) as unknown as number),
      renderHeaderCell: () => strings.End,
      renderCell: (item) => <Text size={100}>{new Date(item.endDateTime!.dateTime!).toLocaleString()}</Text>
    }),
    createTableColumn<MicrosoftGraphBeta.VirtualEventWebinar>({
      columnId: "registrants",
      renderHeaderCell: () => strings.Registrants,
      renderCell: (item) => <RegistrantCounts id={item.id!} context={context} />
    })
  ];

  const defaultSortState = React.useMemo<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>(() => ({ sortColumn: "start", sortDirection: "ascending" }), []);
  const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => setSelectedRows(data.selectedItems);

  return (
    <section className={styles.myTeamsVirualEvents}>
      <Toolbar size="medium">
        <Tooltip content={strings.DrawHeaderSync} relationship='description'>
          <ToolbarButton icon={<SyncListIcon />} disabled={selectedRows.size === 0} onClick={() => setDrawState(DrawState.OpenSync)}>{strings.SyncFieldLabel}</ToolbarButton>
        </Tooltip>
        <Tooltip content={strings.DrawHeaderApprove} relationship='description'>
          <ToolbarButton icon={<ApprovalIcon />} disabled={selectedRows.size !== 1} onClick={() => setDrawState(DrawState.OpenTeam)}>{strings.ApproveButton}</ToolbarButton>
        </Tooltip>
      </Toolbar>
      {!events && <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'stretch', 'gap': '10px' }}>
        <Spinner size='extra-large' label={strings.LoadingTeamsWebinars} />
        <div className={styles2.invertedWrapper}>
          <Skeleton>
            {[0, 1, 2, 3, 4].map(v => (<div key={`skeleton-${v}`} className={styles2.skeletonRow}>
              <SkeletonItem size={16} />
              <SkeletonItem size={16} />
              <SkeletonItem size={16} />
              <SkeletonItem size={16} />
            </div>))}
          </Skeleton>
        </div>
      </div>}
      <OverlayDrawer className={styles.myTeamsVirualEventsDrawer} size='medium' open={drawState !== DrawState.Closed} onOpenChange={(_, { open }) => !open && setDrawState(DrawState.Closed)}>
        <DrawerHeader>
          <DrawerHeaderTitle action={<Button appearance="subtle" aria-label={strings.Close} icon={<DismissIcon />} onClick={() => setDrawState(DrawState.Closed)} />}>
            {drawState === DrawState.OpenSync ? strings.DrawHeaderSync : strings.DrawHeaderApprove}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          {drawState === DrawState.OpenTeam && <TeamApprove id={[...selectedRows][0] as string} context={context} />}
          {drawState === DrawState.OpenSync && <Sync context={context} webinars={events?.filter(e => selectedRows.has(e.id!)) ?? []} />}
        </DrawerBody>
      </OverlayDrawer>
      {events && <DataGrid items={events} columns={columns} sortable selectionMode="multiselect" getRowId={(item) => item.id} selectedItems={selectedRows}
        onSelectionChange={onSelectionChange} focusMode="composite" defaultSortState={defaultSortState} resizableColumns>
        <DataGridHeader>
          <DataGridRow selectionCell={{ "aria-label": strings.SelectAllRows }}>
            {({ renderHeaderCell }) => (<DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>)}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<MicrosoftGraphBeta.VirtualEventWebinar>>
          {({ item, rowId }) => (
            <DataGridRow<MicrosoftGraphBeta.VirtualEventWebinar> key={rowId} selectionCell={{ "aria-label": strings.SelectRow }}>
              {({ renderCell }) => (<DataGridCell>{renderCell(item)}</DataGridCell>)}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>}
    </section>
  );
}

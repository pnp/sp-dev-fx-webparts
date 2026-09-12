import * as React from 'react';
import { MessageBar, MessageBarBody, Spinner } from '@fluentui/react-components';
import { ListView } from '../../../../components/ListView';
import { GraphSitesService } from '../../../../common/services';
import { IAsyncState, IGroupInfo } from '../../../../common/types';
import type { IRecentFilesDrawerProps } from '../panels/RecentFilesDrawer/IRecentFilesDrawerProps';
import GroupDetailsDrawer from './GroupDetailsDrawer';
import { getGroupColumns } from './groupColumns';

type GroupsViewProps = Omit<IRecentFilesDrawerProps, 'open' | 'onClose'>;

function GroupsView({ context, sp, graph }: Readonly<GroupsViewProps>): JSX.Element {
  const service = React.useMemo(
    () => new GraphSitesService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<IGroupInfo[]>>({
    data: [],
    isLoading: true
  });
  const [selectedGroup, setSelectedGroup] = React.useState<IGroupInfo | undefined>(undefined);

  React.useEffect(() => {
    let cancelled = false;
    setLoad({ data: [], isLoading: true });

    service
      .getMyGroups()
      .then((result) => {
        if (!cancelled) {
          setLoad({ data: result, isLoading: false });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setLoad({ data: [], isLoading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [service]);

  const columns = React.useMemo(() => getGroupColumns(setSelectedGroup), []);

  return (
    <>
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {load.isLoading ? (
        <Spinner appearance="primary" label="Loading your groups..." labelPosition="after" />
      ) : (
        <ListView<IGroupInfo>
          items={load.data}
          columns={columns}
          getRowId={(item) => item.id}
          enableGlobalSearch
          enableCommonFilter
          enableBuiltInExport
          enableBuiltInExcelExport
          exportFilename="My Groups"
          strings={{ searchPlaceholder: 'Search groups' }}
        />
      )}

      <GroupDetailsDrawer
        group={selectedGroup}
        open={selectedGroup !== undefined}
        context={context}
        sp={sp}
        graph={graph}
        onClose={() => setSelectedGroup(undefined)}
      />
    </>
  );
}

export default GroupsView;

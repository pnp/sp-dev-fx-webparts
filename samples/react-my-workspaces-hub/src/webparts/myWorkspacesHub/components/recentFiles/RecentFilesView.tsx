import * as React from 'react';
import { MessageBar, MessageBarBody, Spinner } from '@fluentui/react-components';
import { ListView } from '../../../../components/ListView';
import { InsightsService } from '../../../../common/services';
import { IAsyncState, IRecentFile } from '../../../../common/types';
import type { IRecentFilesDrawerProps } from '../panels/RecentFilesDrawer/IRecentFilesDrawerProps';
import { RECENT_FILE_COLUMNS } from '../panels/RecentFilesDrawer/recentFilesColumns';

type RecentFilesViewProps = Omit<IRecentFilesDrawerProps, 'open' | 'onClose'>;

function RecentFilesView({ context, sp, graph }: Readonly<RecentFilesViewProps>): JSX.Element {
  const service = React.useMemo(
    () => new InsightsService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<IRecentFile[]>>({
    data: [],
    isLoading: true
  });

  React.useEffect(() => {
    let cancelled = false;
    setLoad({ data: [], isLoading: true });

    service
      .getRecentFiles()
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

  if (load.error) {
    return (
      <MessageBar intent="error">
        <MessageBarBody>{load.error}</MessageBarBody>
      </MessageBar>
    );
  }

  if (load.isLoading) {
    return <Spinner appearance="primary" label="Loading recent files..." labelPosition="after" />;
  }

  return (
    <ListView<IRecentFile>
      items={load.data}
      columns={RECENT_FILE_COLUMNS}
      getRowId={(item) => item.id}
      enableGlobalSearch
      enableCommonFilter
      strings={{ searchPlaceholder: 'Search files' }}
    />
  );
}

export default RecentFilesView;

import * as React from 'react';
import { Spinner, MessageBar, MessageBarBody } from '@fluentui/react-components';
import { Drawer } from '../../../../../components/Drawer';
import { ListView } from '../../../../../components/ListView';
import { InsightsService } from '../../../../../common/services';
import { IRecentFile, IAsyncState } from '../../../../../common/types';
import { IRecentFilesDrawerProps } from './IRecentFilesDrawerProps';
import { RECENT_FILE_COLUMNS } from './recentFilesColumns';

const RecentFilesDrawer: React.FC<IRecentFilesDrawerProps> = ({
  open,
  context,
  sp,
  graph,
  onClose
}) => {
  const service = React.useMemo(
    () => new InsightsService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<IRecentFile[]>>({
    data: [],
    isLoading: false
  });

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }
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
  }, [open, service]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="end"
      size="large"
      title="Recent files"
    >
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {load.isLoading ? (
        <Spinner appearance="primary" label="Loading recent files…" labelPosition="after" />
      ) : (
        <ListView<IRecentFile>
          items={load.data}
          columns={RECENT_FILE_COLUMNS}
          getRowId={(item) => item.id}
          enableGlobalSearch
          enableCommonFilter
          strings={{ searchPlaceholder: 'Search files' }}
        />
      )}
    </Drawer>
  );
};

export default RecentFilesDrawer;

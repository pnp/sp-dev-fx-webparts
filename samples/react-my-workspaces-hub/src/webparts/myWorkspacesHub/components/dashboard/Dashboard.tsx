import * as React from 'react';
import { Body1, MessageBar, MessageBarBody, Spinner } from '@fluentui/react-components';
import styles from './dashboard.module.scss';
import { IDashboardProps } from './IDashboardProps';
import ChartPanel from './ChartPanel';
import { SearchService } from '../../../../common/services';
import { IAsyncState, IFileInfo } from '../../../../common/types';
import { StatCards, TypeDonut, TypeBar, ActivityTrend, TopSites, RecentFiles, CheckedOutFilesChart } from './charts';

interface IDashboardFiles {
  recent: IFileInfo[];
  checkedOut: IFileInfo[];
}

const Dashboard: React.FC<IDashboardProps> = ({ analytics, sp, graph, onSelectType }) => {
  const service = React.useMemo(() => new SearchService({ sp, graph }), [sp, graph]);
  const [files, setFiles] = React.useState<IAsyncState<IDashboardFiles>>({
    data: { recent: [], checkedOut: [] },
    isLoading: true
  });

  React.useEffect(() => {
    let cancelled = false;
    setFiles({ data: { recent: [], checkedOut: [] }, isLoading: true });
    Promise.all([
      service.getRecentlyModifiedFiles(5),
      service.getCheckedOutFiles()
    ])
      .then(([recent, checkedOut]) => {
        if (!cancelled) {
          setFiles({ data: { recent, checkedOut }, isLoading: false });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setFiles({ data: { recent: [], checkedOut: [] }, isLoading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [service]);

  if (analytics.total === 0) {
    return (
      <div className={styles.empty}>
        <Body1>No sites to analyze yet.</Body1>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <StatCards analytics={analytics} />

      <div className={styles.chartGrid}>
        <ChartPanel title="Sites by type">
          <TypeDonut analytics={analytics} onSelectType={onSelectType} />
        </ChartPanel>
        <ChartPanel title="Volume by type">
          <TypeBar analytics={analytics} onSelectType={onSelectType} />
        </ChartPanel>
        <ChartPanel title="Activity trend (12 months)">
          <ActivityTrend analytics={analytics} />
        </ChartPanel>
        <ChartPanel title="Recently modified">
          <TopSites analytics={analytics} />
        </ChartPanel>
        <ChartPanel title="Last modified files">
          {files.isLoading ? (
            <Spinner appearance="primary" label="Loading file activity..." labelPosition="after" />
          ) : files.error ? (
            <MessageBar intent="warning">
              <MessageBarBody>{files.error}</MessageBarBody>
            </MessageBar>
          ) : (
            <RecentFiles files={files.data.recent} />
          )}
        </ChartPanel>
        {files.data.checkedOut.length > 0 && (
          <ChartPanel title="Checked-out files">
            <CheckedOutFilesChart files={files.data.checkedOut} />
          </ChartPanel>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

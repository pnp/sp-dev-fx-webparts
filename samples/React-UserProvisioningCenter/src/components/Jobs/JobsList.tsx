import * as React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  Option,
  SearchBox,
  Spinner,
  Subtitle2,
  Text,
  ToolbarButton,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { ArrowClockwise16Regular, ArrowDownload16Regular, CheckmarkRegular } from '@fluentui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useAppRoles, useJobSummaries, useJobsChangeToken } from '../../hooks/useReferenceData';
import { useServices } from '../../contexts/ServicesContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { QK_JOB_SUMMARIES } from '../../constants/queryKeys';
import type { IJobQuery, IJobSummary, JobStatus, JobType } from '../../models';
import { isJobStalled } from '../../models';
import { downloadCsv, toCsv } from '../../services/util/csv';
import { DataState } from '../Shared/DataState';
import { DiagnosticsPanel } from '../Shared/DiagnosticsPanel';
import { useAppToast } from '../Shared/AppToaster';
import { JobStatusBadge, jobStatusLabel, jobTypeLabel } from '../Shared/StatusBadge';
import { JobDetailDrawer } from './JobDetailDrawer';
import type { KpiFilterKey } from './DashboardOverview';

const DashboardOverview = React.lazy(() =>
  import(/* webpackChunkName: 'upc-charts' */ './DashboardOverview').then((m) => ({
    default: m.DashboardOverview
  }))
);

const ROW_HEIGHT = 44;
const OVERSCAN_ROWS = 6;
const VIRTUALIZE_THRESHOLD = 60;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: tokens.spacingVerticalXS
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    alignItems: 'center',
    '@container (max-width: 560px)': {
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  },
  search: {
    minWidth: '220px',
    flexGrow: 1,
    maxWidth: '360px',
    '@container (max-width: 560px)': {
      maxWidth: 'none'
    }
  },
  searchStale: {
    marginLeft: tokens.spacingHorizontalXS
  },
  tableWrap: {
    overflowX: 'auto',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  headerRow: {
    textAlign: 'left',
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2
  },
  headerCell: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    whiteSpace: 'nowrap'
  },
  scrollBody: {
    maxHeight: '560px',
    overflowY: 'auto'
  },
  row: {
    cursor: 'pointer',
    height: `${ROW_HEIGHT}px`,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  cell: {
    padding: `0 ${tokens.spacingHorizontalM}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  targetButton: {
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: tokens.fontWeightSemibold
  },
  noMatches: {
    color: tokens.colorNeutralForeground3,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM
  },
  loadMoreRow: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: tokens.spacingVerticalM
  }
});

const JOB_TYPES: readonly JobType[] = ['Onboard', 'Offboard', 'Transfer', 'Clone', 'Bulk'];
const STATUS_FILTERS: readonly JobStatus[] = [
  'PendingApproval',
  'Approved',
  'Running',
  'PartiallyFailed',
  'Failed',
  'Completed',
  'Cancelled',
  'Rejected'
];

type KpiKey = 'pending' | 'running' | 'failed7' | 'completedToday';

function kpiToQueryPatch(kpi: KpiKey | null): Partial<IJobQuery> {
  switch (kpi) {
    case 'pending':
      return { status: ['PendingApproval'] };
    case 'running':
      return { status: ['Running'] };
    case 'failed7':
      return { status: ['Failed', 'PartiallyFailed'] };
    case 'completedToday':
      return { status: ['Completed'] };
    default:
      return {};
  }
}

function createdLabel(job: IJobSummary): string {
  if (!job.createdUtc) {
    return '';
  }
  const date: Date = new Date(job.createdUtc);
  return isNaN(date.getTime()) ? '' : date.toLocaleString();
}

function targetOf(job: IJobSummary): string {
  return job.targetUpn || job.jobId.slice(0, 8);
}

export interface IJobsListProps {
  onCreateNew: () => void;
}

export const JobsList: React.FC<IJobsListProps> = ({ onCreateNew }) => {
  const styles = useStyles();
  const roles = useAppRoles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null);
  const [approvingItemId, setApprovingItemId] = React.useState<number | null>(null);
  const [kpi, setKpi] = React.useState<KpiKey | null>(null);
  const [search, setSearch] = React.useState<string>('');
  const [typeFilter, setTypeFilter] = React.useState<JobType | 'all'>('all');
  const [statusFilter, setStatusFilter] = React.useState<JobStatus | 'all'>('all');
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const [batchFilter, setBatchFilter] = React.useState<string | null>(null);
  const [isRetryingBatch, setIsRetryingBatch] = React.useState<boolean>(false);
  const [mineOnly, setMineOnly] = React.useState<boolean>(false);

  const canApprove: boolean = roles.data?.permissions.has('approveJobs') ?? false;

  const deferredSearch: string = useDebouncedValue(search, 300);
  const isSearchStale: boolean = search !== deferredSearch;

  const query: IJobQuery = React.useMemo(() => {
    const patch = kpiToQueryPatch(kpi);
    const status: JobStatus[] | undefined = patch.status ?? (statusFilter !== 'all' ? [statusFilter] : undefined);
    return {
      search: deferredSearch.trim() || undefined,
      status,
      jobType: typeFilter !== 'all' ? [typeFilter] : undefined,
      batchId: batchFilter ?? undefined,
      // RequestedBy is a SharePoint people field, so the server-side filter
      // matches on display name rather than UPN.
      requestedBy: mineOnly ? services.operatorDisplayName : undefined
    };
  }, [kpi, statusFilter, typeFilter, deferredSearch, batchFilter, mineOnly, services.operatorDisplayName]);

  const jobs = useJobSummaries(query, false);
  const changeToken = useJobsChangeToken(true);
  const lastTokenRef = React.useRef<string>('');
  React.useEffect(() => {
    const token = changeToken.data?.latestModifiedUtc ?? '';
    if (token && token !== lastTokenRef.current) {
      lastTokenRef.current = token;
      void queryClient.invalidateQueries(QK_JOB_SUMMARIES);
    }
  }, [changeToken.data?.latestModifiedUtc, queryClient]);

  const [tailPages, setTailPages] = React.useState<IJobSummary[]>([]);
  const [tailTruncated, setTailTruncated] = React.useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
  const lastPageRef = React.useRef<Awaited<ReturnType<typeof services.data.getJobSummariesPaged>> | null>(null);

  React.useEffect(() => {
    if (jobs.data) {
      lastPageRef.current = jobs.data;
      setTailPages([]);
      setTailTruncated(false);
    }
  }, [jobs.data]);

  const loadMore = React.useCallback(async (): Promise<void> => {
    const next = lastPageRef.current?.next;
    if (!next || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const page = await next();
      setTailPages((prev) => [...prev, ...page.items]);
      setTailTruncated(page.truncated);
      lastPageRef.current = page;
    } catch {
      toast(strings.JobActionFailed, 'error');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, toast]);

  const refresh = React.useCallback((): void => {
    setTailPages([]);
    setTailTruncated(false);
    lastPageRef.current = null;
    void jobs.refetch();
  }, [jobs]);

  const approveInline = React.useCallback(
    async (itemId: number): Promise<void> => {
      setApprovingItemId(itemId);
      try {
        await services.engine.approveJob(itemId);
        toast(strings.JobApprovedToast);
      } catch {
        toast(strings.JobActionFailed, 'error');
      } finally {
        setApprovingItemId(null);
        void queryClient.invalidateQueries(QK_JOB_SUMMARIES);
      }
    },
    [services.engine, queryClient, toast]
  );

  const retryFailedInBatch = React.useCallback(async (): Promise<void> => {
    if (!batchFilter || isRetryingBatch) {
      return;
    }
    setIsRetryingBatch(true);
    try {
      const summary = await services.data.getBatchSummary(batchFilter);
      let succeeded: number = 0;
      let stillFailing: number = 0;
      for (const failedItemId of summary.failedItemIds) {
        try {
          const job = await services.engine.runJob(failedItemId);
          if (job.status === 'Completed') {
            succeeded++;
          } else {
            stillFailing++;
          }
        } catch {
          stillFailing++;
        }
      }
      toast(
        stillFailing === 0
          ? strings.BatchRetryAllSucceeded
          : `${strings.BatchRetryPartial} (${succeeded}/${succeeded + stillFailing})`,
        stillFailing === 0 ? 'success' : 'warning'
      );
    } catch {
      toast(strings.JobActionFailed, 'error');
    } finally {
      setIsRetryingBatch(false);
      void queryClient.invalidateQueries(QK_JOB_SUMMARIES);
    }
  }, [batchFilter, isRetryingBatch, services.data, services.engine, queryClient, toast]);

  const items: IJobSummary[] = [...(jobs.data?.items ?? []), ...tailPages];
  const truncated: boolean = tailTruncated || (tailPages.length === 0 && (jobs.data?.truncated ?? false));
  const hasActiveFilters: boolean =
    !!kpi || typeFilter !== 'all' || statusFilter !== 'all' || !!query.search || !!batchFilter || mineOnly;

  const exportCsv = (): void => {
    const csv: string = toCsv(
      [strings.JobColumnTarget, strings.JobColumnType, strings.JobColumnStatus, strings.JobColumnRequestedBy, strings.ApprovedByLabel, strings.JobColumnCreated, strings.CorrelationIdLabel],
      items.map((job) => [
        targetOf(job),
        jobTypeLabel(job.jobType),
        job.status,
        job.requestedBy ?? '',
        job.approvedBy ?? '',
        createdLabel(job),
        job.correlationId
      ])
    );
    downloadCsv(`upc-jobs-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const shouldVirtualize: boolean = items.length > VIRTUALIZE_THRESHOLD;
  const visibleCount: number = Math.ceil(560 / ROW_HEIGHT) + OVERSCAN_ROWS * 2;
  const startIndex: number = shouldVirtualize ? Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_ROWS) : 0;
  const endIndex: number = shouldVirtualize ? Math.min(items.length, startIndex + visibleCount) : items.length;
  const windowed: IJobSummary[] = shouldVirtualize ? items.slice(startIndex, endIndex) : items;
  const topPad: number = shouldVirtualize ? startIndex * ROW_HEIGHT : 0;
  const bottomPad: number = shouldVirtualize ? (items.length - endIndex) * ROW_HEIGHT : 0;

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Subtitle2 as="h3" block>
          {strings.JobsTitle}
        </Subtitle2>
        <ToolbarButton icon={<ArrowClockwise16Regular />} onClick={() => refresh()} aria-label={strings.RefreshLabel}>
          {strings.RefreshLabel}
        </ToolbarButton>
        <ToolbarButton icon={<ArrowDownload16Regular />} disabled={items.length === 0} onClick={exportCsv} aria-label={strings.ExportCsvLabel}>
          {strings.ExportCsvLabel}
        </ToolbarButton>
      </div>
      {jobs.isLoading || jobs.error ? <DiagnosticsPanel /> : undefined}
      <DataState
        isLoading={jobs.isLoading}
        isPaused={jobs.fetchStatus === 'paused'}
        error={jobs.error}
        isEmpty={!jobs.isLoading && items.length === 0 && !hasActiveFilters}
        emptyTitle={strings.JobsEmptyTitle}
        emptyBody={strings.JobsEmptyBody}
        emptyAction={
          <Button appearance="secondary" onClick={onCreateNew}>
            {strings.JobsEmptyCta}
          </Button>
        }
        onRetry={() => refresh()}
      >
        {items.length > 0 || hasActiveFilters ? (
          <React.Suspense fallback={<Spinner aria-label={strings.LoadingLabel} />}>
            <DashboardOverview jobs={items} activeKpi={kpi as KpiFilterKey} onKpiClick={(key) => setKpi(key as KpiKey)} />
          </React.Suspense>
        ) : undefined}
        {truncated ? (
          <MessageBar intent="warning">
            <MessageBarBody>{strings.JobsTruncatedWarning}</MessageBarBody>
          </MessageBar>
        ) : undefined}
        {truncated && !hasActiveFilters ? (
          <div className={styles.loadMoreRow}>
            <Button
              appearance="secondary"
              disabled={isLoadingMore}
              onClick={() => {
                void loadMore();
              }}
            >
              {isLoadingMore ? strings.LoadingLabel : strings.LoadMoreLabel}
            </Button>
          </div>
        ) : undefined}
        {batchFilter ? (
          <MessageBar intent="info" layout="multiline">
            <MessageBarBody>
              {strings.BatchFilterActive}
              {' '}
              {(() => {
                const counts: Record<string, number> = {};
                for (const job of items) {
                  counts[job.status] = (counts[job.status] ?? 0) + 1;
                }
                return Object.keys(counts)
                  .map((k) => `${jobStatusLabel(k as JobStatus)}: ${counts[k]}`)
                  .join(' · ');
              })()}
            </MessageBarBody>
            <MessageBarActions>
              <Button
                appearance="primary"
                size="small"
                disabled={isRetryingBatch || !items.some((j) => j.status === 'Failed' || j.status === 'PartiallyFailed')}
                onClick={() => {
                  void retryFailedInBatch();
                }}
              >
                {isRetryingBatch ? strings.LoadingLabel : strings.BatchRetryAllFailed}
              </Button>
              <Button appearance="secondary" size="small" onClick={() => setBatchFilter(null)}>
                {strings.BatchClearFilter}
              </Button>
            </MessageBarActions>
          </MessageBar>
        ) : undefined}
        <div className={styles.filterRow}>
          <SearchBox
            className={styles.search}
            placeholder={strings.SearchJobsPlaceholder}
            aria-label={strings.SearchJobsPlaceholder}
            value={search}
            onChange={(_, data) => setSearch(data.value)}
          />
          {isSearchStale || jobs.isFetching ? <Spinner size="tiny" className={styles.searchStale} aria-label={strings.LoadingLabel} /> : undefined}
          <Dropdown
            value={statusFilter === 'all' ? strings.FilterTypeAll : statusFilter}
            selectedOptions={[statusFilter]}
            onOptionSelect={(_, data) => setStatusFilter((data.optionValue as JobStatus | 'all') ?? 'all')}
            aria-label={strings.JobColumnStatus}
          >
            <Option value="all" text={strings.FilterTypeAll}>
              {strings.FilterTypeAll}
            </Option>
            {STATUS_FILTERS.map((s) => (
              <Option key={s} value={s} text={s}>
                {s}
              </Option>
            ))}
          </Dropdown>
          <Dropdown
            value={typeFilter === 'all' ? strings.FilterTypeAll : jobTypeLabel(typeFilter)}
            selectedOptions={[typeFilter]}
            onOptionSelect={(_, data) => setTypeFilter((data.optionValue as JobType | 'all') ?? 'all')}
            aria-label={strings.JobColumnType}
          >
            <Option value="all" text={strings.FilterTypeAll}>
              {strings.FilterTypeAll}
            </Option>
            {JOB_TYPES.map((t) => (
              <Option key={t} value={t} text={jobTypeLabel(t)}>
                {jobTypeLabel(t)}
              </Option>
            ))}
          </Dropdown>
          <Checkbox
            label={strings.MyRequestsFilterLabel}
            checked={mineOnly}
            onChange={(_, data) => setMineOnly(!!data.checked)}
          />
        </div>
        <div aria-busy={jobs.isFetching}>
          {items.length === 0 ? (
            <Text className={styles.noMatches}>{strings.JobsNoMatches}</Text>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table} aria-label={strings.JobsTitle}>
                <thead>
                  <tr className={styles.headerRow}>
                    <th className={styles.headerCell} scope="col">
                      {strings.JobColumnTarget}
                    </th>
                    <th className={styles.headerCell} scope="col">
                      {strings.JobColumnType}
                    </th>
                    <th className={styles.headerCell} scope="col">
                      {strings.JobColumnStatus}
                    </th>
                    <th className={styles.headerCell} scope="col">
                      {strings.JobColumnRequestedBy}
                    </th>
                    <th className={styles.headerCell} scope="col">
                      {strings.JobColumnCreated}
                    </th>
                    {canApprove ? (
                      <th className={styles.headerCell} scope="col">
                        {strings.JobColumnActions}
                      </th>
                    ) : undefined}
                  </tr>
                </thead>
              </table>
              <div className={styles.scrollBody} onScroll={(ev) => shouldVirtualize && setScrollTop(ev.currentTarget.scrollTop)}>
                <table className={styles.table}>
                  <tbody>
                    {topPad > 0 ? (
                      <tr style={{ height: `${topPad}px` }} aria-hidden="true">
                        <td />
                      </tr>
                    ) : undefined}
                    {windowed.map((job) => {
                      return (
                        <tr
                          key={job.itemId}
                          className={styles.row}
                          onClick={() => setSelectedItemId(job.itemId)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Enter' || ev.key === ' ') {
                              ev.preventDefault();
                              setSelectedItemId(job.itemId);
                            }
                          }}
                        >
                          <td className={styles.cell}>
                            <Text className={styles.targetButton}>{targetOf(job)}</Text>
                          </td>
                          <td className={styles.cell}>
                            {jobTypeLabel(job.jobType)}
                            {job.batchId && !batchFilter ? (
                              <Button
                                appearance="transparent"
                                size="small"
                                title={strings.BatchViewTooltip}
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  setBatchFilter(job.batchId);
                                }}
                              >
                                {strings.BatchLabel}
                              </Button>
                            ) : undefined}
                          </td>
                          <td className={styles.cell}>
                            <JobStatusBadge status={job.status} />
                            {isJobStalled(job) ? (
                              <Badge appearance="outline" color="warning" title={strings.JobStalledTooltip}>
                                {strings.JobStalledLabel}
                              </Badge>
                            ) : undefined}
                          </td>
                          <td className={styles.cell}>{job.requestedBy ?? ''}</td>
                          <td className={styles.cell}>{createdLabel(job)}</td>
                          {canApprove ? (
                            <td className={styles.cell}>
                              {job.status === 'PendingApproval' ? (
                                <Button
                                  size="small"
                                  icon={<CheckmarkRegular />}
                                  disabled={approvingItemId !== null}
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    void approveInline(job.itemId);
                                  }}
                                >
                                  {strings.ApproveLabel}
                                </Button>
                              ) : undefined}
                            </td>
                          ) : undefined}
                        </tr>
                      );
                    })}
                    {bottomPad > 0 ? (
                      <tr style={{ height: `${bottomPad}px` }} aria-hidden="true">
                        <td />
                      </tr>
                    ) : undefined}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </DataState>
      {selectedItemId !== null ? <JobDetailDrawer itemId={selectedItemId} onClose={() => setSelectedItemId(null)} /> : undefined}
    </div>
  );
};

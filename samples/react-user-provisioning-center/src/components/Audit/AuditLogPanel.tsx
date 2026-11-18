import * as React from 'react';
import {
  Badge,
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  SearchBox,
  Subtitle2,
  Text,
  ToolbarButton,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { ArrowClockwise16Regular, ArrowDownload16Regular } from '@fluentui/react-icons';
import * as strings from 'UpcStrings';
import { useAuditSearch } from '../../hooks/useReferenceData';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import type { AuditResult, IAuditEntry, IAuditQuery } from '../../models';
import { downloadCsv, toCsv } from '../../services/util/csv';
import { DataState } from '../Shared/DataState';
import { useAppToast } from '../Shared/AppToaster';

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
    alignItems: 'flex-end',
    '@container (max-width: 560px)': {
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  },
  search: {
    minWidth: '200px',
    flexGrow: 1,
    maxWidth: '320px',
    '@container (max-width: 560px)': {
      maxWidth: 'none'
    }
  },
  narrowField: {
    minWidth: '150px'
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
    maxHeight: '600px',
    overflowY: 'auto'
  },
  row: {
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2
  },
  cell: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    verticalAlign: 'top',
    fontSize: tokens.fontSizeBase200
  },
  endpointCell: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    maxWidth: '280px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  loadMoreRow: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: tokens.spacingVerticalM
  }
});

const RESULT_FILTERS: readonly AuditResult[] = ['Success', 'Failure', 'Skipped'];

function resultColor(result: AuditResult): 'success' | 'danger' | 'informative' {
  if (result === 'Success') return 'success';
  if (result === 'Failure') return 'danger';
  return 'informative';
}

function timestampLabel(entry: IAuditEntry): string {
  if (!entry.timestampUtc) {
    return '';
  }
  const date: Date = new Date(entry.timestampUtc);
  return isNaN(date.getTime()) ? '' : date.toLocaleString();
}

export const AuditLogPanel: React.FC = () => {
  const styles = useStyles();
  const toast = useAppToast();
  const [actor, setActor] = React.useState<string>('');
  const [targetUser, setTargetUser] = React.useState<string>('');
  const [jobId, setJobId] = React.useState<string>('');
  const [result, setResult] = React.useState<AuditResult | 'all'>('all');
  const [fromUtc, setFromUtc] = React.useState<string>('');
  const [toUtc, setToUtc] = React.useState<string>('');

  const debouncedActor: string = useDebouncedValue(actor, 300);
  const debouncedTarget: string = useDebouncedValue(targetUser, 300);
  const debouncedJobId: string = useDebouncedValue(jobId, 300);

  const query: IAuditQuery = React.useMemo(
    () => ({
      actor: debouncedActor.trim() || undefined,
      targetUser: debouncedTarget.trim() || undefined,
      jobId: debouncedJobId.trim() || undefined,
      result: result !== 'all' ? [result] : undefined,
      fromUtc: fromUtc || undefined,
      toUtc: toUtc || undefined
    }),
    [debouncedActor, debouncedTarget, debouncedJobId, result, fromUtc, toUtc]
  );

  const audit = useAuditSearch(query, true);

  const [tail, setTail] = React.useState<IAuditEntry[]>([]);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
  const lastPageRef = React.useRef<typeof audit.data | null>(null);

  React.useEffect(() => {
    if (audit.data) {
      lastPageRef.current = audit.data;
      setTail([]);
    }
  }, [audit.data]);

  const items: IAuditEntry[] = React.useMemo(
    () => [...(audit.data?.items ?? []), ...tail],
    [audit.data, tail]
  );

  const loadMore = React.useCallback(async (): Promise<void> => {
    const next = lastPageRef.current?.next;
    if (!next || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const page = await next();
      setTail((prev) => [...prev, ...page.items]);
      lastPageRef.current = page;
    } catch {
      toast(strings.AuditLoadFailed, 'error');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, toast]);

  const exportCsv = React.useCallback((): void => {
    const csv: string = toCsv(
      [
        strings.AuditColumnTime,
        strings.AuditColumnActor,
        strings.AuditColumnAction,
        strings.AuditColumnTarget,
        strings.AuditColumnResult,
        strings.AuditColumnCode,
        strings.AuditColumnDuration,
        strings.AuditColumnEndpoint,
        strings.AuditColumnJob,
        strings.CorrelationIdLabel
      ],
      items.map((e) => [
        e.timestampUtc,
        e.actor,
        e.action,
        e.targetUser,
        e.result,
        String(e.responseCode),
        String(e.durationMs),
        e.graphEndpoint,
        e.jobId,
        e.correlationId
      ])
    );
    downloadCsv(`upc-audit-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }, [items]);

  const hasFilters: boolean =
    !!query.actor || !!query.targetUser || !!query.jobId || !!query.result || !!query.fromUtc || !!query.toUtc;

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Subtitle2 as="h3">{strings.AuditTitle}</Subtitle2>
        <div>
          <ToolbarButton
            icon={<ArrowClockwise16Regular />}
            onClick={() => {
              void audit.refetch();
            }}
            aria-label={strings.RefreshLabel}
          >
            {strings.RefreshLabel}
          </ToolbarButton>
          <ToolbarButton
            icon={<ArrowDownload16Regular />}
            disabled={items.length === 0}
            onClick={exportCsv}
            aria-label={strings.ExportCsvLabel}
          >
            {strings.ExportCsvLabel}
          </ToolbarButton>
        </div>
      </div>

      <div className={styles.filterRow}>
        <SearchBox
          className={styles.search}
          placeholder={strings.AuditFilterActorPlaceholder}
          value={actor}
          onChange={(_e, d) => setActor(d.value)}
          aria-label={strings.AuditColumnActor}
        />
        <SearchBox
          className={styles.search}
          placeholder={strings.AuditFilterTargetPlaceholder}
          value={targetUser}
          onChange={(_e, d) => setTargetUser(d.value)}
          aria-label={strings.AuditColumnTarget}
        />
        <SearchBox
          className={styles.search}
          placeholder={strings.AuditFilterJobPlaceholder}
          value={jobId}
          onChange={(_e, d) => setJobId(d.value)}
          aria-label={strings.AuditColumnJob}
        />
        <Field label={strings.AuditColumnResult} className={styles.narrowField}>
          <Dropdown
            value={result === 'all' ? strings.FilterTypeAll : result}
            selectedOptions={[result]}
            onOptionSelect={(_e, d) => setResult((d.optionValue as AuditResult | 'all') ?? 'all')}
          >
            <Option value="all">{strings.FilterTypeAll}</Option>
            {RESULT_FILTERS.map((r) => (
              <Option key={r} value={r}>
                {r}
              </Option>
            ))}
          </Dropdown>
        </Field>
        <Field label={strings.AuditFilterFromLabel} className={styles.narrowField}>
          <Input type="date" value={fromUtc} onChange={(_e, d) => setFromUtc(d.value)} />
        </Field>
        <Field label={strings.AuditFilterToLabel} className={styles.narrowField}>
          <Input type="date" value={toUtc} onChange={(_e, d) => setToUtc(d.value)} />
        </Field>
      </div>

      <DataState
        isLoading={audit.isLoading}
        error={audit.error}
        isEmpty={!audit.isLoading && items.length === 0 && !hasFilters}
        emptyTitle={strings.AuditEmptyTitle}
        emptyBody={strings.AuditEmptyBody}
        onRetry={() => {
          void audit.refetch();
        }}
      >
        {items.length === 0 && hasFilters ? (
          <Text>{strings.AuditNoMatches}</Text>
        ) : (
          <>
            <div className={styles.tableWrap}>
              <div className={styles.scrollBody}>
                <table className={styles.table}>
                  <caption className={styles.headerCell}>{strings.AuditTableCaption}</caption>
                  <thead>
                    <tr className={styles.headerRow}>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnTime}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnActor}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnAction}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnTarget}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnResult}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnCode}
                      </th>
                      <th scope="col" className={styles.headerCell}>
                        {strings.AuditColumnEndpoint}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((entry) => (
                      <tr key={entry.entryId} className={styles.row}>
                        <td className={styles.cell}>{timestampLabel(entry)}</td>
                        <td className={styles.cell}>{entry.actor}</td>
                        <td className={styles.cell}>{entry.action}</td>
                        <td className={styles.cell}>{entry.targetUser}</td>
                        <td className={styles.cell}>
                          <Badge appearance="tint" color={resultColor(entry.result)}>
                            {entry.result}
                          </Badge>
                        </td>
                        <td className={styles.cell}>{entry.responseCode || ''}</td>
                        <td className={`${styles.cell} ${styles.endpointCell}`} title={entry.graphEndpoint}>
                          {entry.graphEndpoint}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {lastPageRef.current?.next ? (
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
          </>
        )}
      </DataState>
    </div>
  );
};

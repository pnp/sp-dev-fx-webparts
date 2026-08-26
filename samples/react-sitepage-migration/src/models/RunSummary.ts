import {
  MigrationFinalStatus,
  PageMigrationReportEntry,
  successfulAssetStatuses
} from './MigrationReport';

export interface RunSummary {
  readonly totalPages: number;
  readonly byStatus: Readonly<Record<MigrationFinalStatus, number>>;
  readonly assetsCopied: number;
  readonly assetsFailed: number;
  readonly unsupportedWebParts: number;
  readonly warnings: number;
  readonly elapsedMs: number;
  readonly totalPageMs: number;
  readonly medianPageMs: number;
  readonly slowestPageMs: number;
  readonly slowestPageName?: string;
  readonly pagesPerMinute: number;
}

const emptyByStatus = (): Record<MigrationFinalStatus, number> => ({
  Completed: 0,
  CompletedWithWarnings: 0,
  Failed: 0,
  Cancelled: 0,
  Skipped: 0,
  Planned: 0
});

const median = (values: ReadonlyArray<number>): number => {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[middle];
};

export const summarizeRun = (reports: ReadonlyArray<PageMigrationReportEntry>): RunSummary => {
  const byStatus = emptyByStatus();
  const durations: number[] = [];

  let assetsCopied = 0;
  let assetsFailed = 0;
  let unsupportedWebParts = 0;
  let warnings = 0;
  let slowestPageMs = 0;
  let slowestPageName: string | undefined;
  let earliestStart = Number.POSITIVE_INFINITY;
  let latestEnd = Number.NEGATIVE_INFINITY;

  reports.forEach((report) => {
    byStatus[report.finalStatus] = (byStatus[report.finalStatus] ?? 0) + 1;

    assetsCopied += report.assets.filter((asset) => successfulAssetStatuses.has(asset.status)).length;
    assetsFailed += report.assets.filter((asset) => asset.status === 'Failed').length;
    unsupportedWebParts += report.unsupportedWebParts.length;
    warnings += report.warnings.length;

    const duration = report.durationMs ?? 0;
    if (duration > 0) {
      durations.push(duration);
      if (duration > slowestPageMs) {
        slowestPageMs = duration;
        slowestPageName = report.pageName;
      }
    }

    const started = Date.parse(report.startedAt);
    if (!Number.isNaN(started)) {
      earliestStart = Math.min(earliestStart, started);
    }

    const completed = report.completedAt ? Date.parse(report.completedAt) : Number.NaN;
    if (!Number.isNaN(completed)) {
      latestEnd = Math.max(latestEnd, completed);
    }
  });

  const elapsedMs = Number.isFinite(earliestStart) && Number.isFinite(latestEnd) && latestEnd > earliestStart
    ? latestEnd - earliestStart
    : 0;

  return {
    totalPages: reports.length,
    byStatus,
    assetsCopied,
    assetsFailed,
    unsupportedWebParts,
    warnings,
    elapsedMs,
    totalPageMs: durations.reduce((sum, value) => sum + value, 0),
    medianPageMs: median(durations),
    slowestPageMs,
    slowestPageName,
    pagesPerMinute: elapsedMs > 0 ? Math.round((reports.length / elapsedMs) * 60_000 * 10) / 10 : 0
  };
};

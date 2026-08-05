import { PageMigrationReportEntry, successfulAssetStatuses } from '../../models/MigrationReport';
import { summarizeRun } from '../../models/RunSummary';

const CSV_COLUMNS = [
  'PageName',
  'SourcePageUrl',
  'TargetPageUrl',
  'StartedAt',
  'CompletedAt',
  'DurationMs',
  'FinalStatus',
  'Warnings',
  'Errors',
  'UnsupportedWebParts',
  'AssetsCopied',
  'AssetsFailed'
] as const;

const formulaTriggers = /^[=+\-@\t\r]/;

const UTF8_BOM = '\uFEFF';

export const escapeCsvValue = (value: string | number | undefined): string => {
  const raw = value === undefined || value === null ? '' : String(value);
  const guarded = formulaTriggers.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
};

export const buildReportFileName = (extension: string, now: Date = new Date()): string => {
  const stamp = now.toISOString().replace(/[:.]/g, '-').replace(/Z$/, '');
  return `page-migration-report-${stamp}.${extension}`;
};

const triggerDownload = (fileName: string, content: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
};

export class ReportExportService {
  public buildJson(reportEntries: ReadonlyArray<PageMigrationReportEntry>): string {
    return JSON.stringify({
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      summary: summarizeRun(reportEntries),
      pages: reportEntries
    }, null, 2);
  }

  public buildCsv(reportEntries: ReadonlyArray<PageMigrationReportEntry>): string {
    const rows: string[] = [CSV_COLUMNS.join(',')];

    reportEntries.forEach((entry) => {
      const copied = entry.assets.filter((asset) => successfulAssetStatuses.has(asset.status)).length;
      const failed = entry.assets.filter((asset) => asset.status === 'Failed').length;

      rows.push([
        escapeCsvValue(entry.pageName),
        escapeCsvValue(entry.sourcePageUrl),
        escapeCsvValue(entry.targetPageUrl ?? ''),
        escapeCsvValue(entry.startedAt),
        escapeCsvValue(entry.completedAt ?? ''),
        escapeCsvValue(entry.durationMs ?? ''),
        escapeCsvValue(entry.finalStatus),
        escapeCsvValue(entry.warnings.map((warning) => warning.message).join(' | ')),
        escapeCsvValue(entry.errors.join(' | ')),
        escapeCsvValue(entry.unsupportedWebParts.map((item) => item.title ?? item.webPartId).join(' | ')),
        escapeCsvValue(copied),
        escapeCsvValue(failed)
      ].join(','));
    });

    return rows.join('\r\n');
  }

  public exportJson(reportEntries: ReadonlyArray<PageMigrationReportEntry>): void {
    triggerDownload(buildReportFileName('json'), this.buildJson(reportEntries), 'application/json;charset=utf-8');
  }

  public exportCsv(reportEntries: ReadonlyArray<PageMigrationReportEntry>): void {
    triggerDownload(
      buildReportFileName('csv'),
      `${UTF8_BOM}${this.buildCsv(reportEntries)}`,
      'text/csv;charset=utf-8'
    );
  }
}

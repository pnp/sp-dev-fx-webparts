import { MigrationFinalStatus, PageMigrationReportEntry, successfulAssetStatuses } from '../../models/MigrationReport';
import { MigrationHistoryEntry } from '../../models/MigrationHistory';
import { MigrationContext, ValidationCheckCode } from '../../models/OperationalTypes';
import { stringifyDetails, toMessage } from '../../utilities/ErrorSerialization';
import { isSharePointUrl } from '../../utilities/UrlUtilities';
import { Logger } from '../logging/Logger';
import { ISharePointPageService, ListFieldDefinition } from '../sharepoint/ISharePointPageService';
import { ReportExportService } from './ReportExportService';

export interface PersistedRunArtifacts {
  readonly runId: string;
  readonly jsonReportUrl: string;
  readonly csvReportUrl: string;
  readonly reportItemsStored: number;
  readonly logItemsStored: number;
  readonly warningMessage?: string;
}

export class ReportStorageValidationError extends Error {
  public readonly failedChecks: ReadonlyArray<ValidationCheckCode>;

  public constructor(failedChecks: ReadonlyArray<ValidationCheckCode>) {
    super(`Report storage validation failed: ${failedChecks.join(', ')}`);
    this.name = 'ReportStorageValidationError';
    this.failedChecks = failedChecks;
    Object.setPrototypeOf(this, ReportStorageValidationError.prototype);
  }
}

const reportFieldDefinitions: ReadonlyArray<ListFieldDefinition> = [
  { kind: 'Text', title: 'RunId' },
  { kind: 'Text', title: 'SourceSiteId' },
  { kind: 'Text', title: 'TargetSiteId' },
  { kind: 'Note', title: 'SourceSiteUrl', properties: { NumberOfLines: 4, RichText: false } },
  { kind: 'Note', title: 'TargetSiteUrl', properties: { NumberOfLines: 4, RichText: false } },
  { kind: 'Note', title: 'SourcePageUrl', properties: { NumberOfLines: 4, RichText: false } },
  { kind: 'Note', title: 'TargetPageUrl', properties: { NumberOfLines: 4, RichText: false } },
  { kind: 'Text', title: 'FinalStatus' },
  { kind: 'DateTime', title: 'StartedAt' },
  { kind: 'DateTime', title: 'CompletedAt' },
  { kind: 'Number', title: 'DurationMs' },
  { kind: 'Number', title: 'AssetsCopied' },
  { kind: 'Number', title: 'AssetsFailed' },
  { kind: 'Note', title: 'UnsupportedWebParts', properties: { NumberOfLines: 10, RichText: false } },
  { kind: 'Note', title: 'Warnings', properties: { NumberOfLines: 10, RichText: false } },
  { kind: 'Note', title: 'Errors', properties: { NumberOfLines: 10, RichText: false } },
  { kind: 'Note', title: 'JsonReportUrl', properties: { NumberOfLines: 4, RichText: false } },
  { kind: 'Note', title: 'CsvReportUrl', properties: { NumberOfLines: 4, RichText: false } }
];

const logFieldDefinitions: ReadonlyArray<ListFieldDefinition> = [
  { kind: 'Text', title: 'RunId' },
  { kind: 'Text', title: 'Level' },
  { kind: 'DateTime', title: 'TimestampUtc' },
  { kind: 'Note', title: 'DetailsJson', properties: { NumberOfLines: 10, RichText: false } }
];

const MAX_HISTORY_ROWS = 4000;

const escapeODataLiteral = (value: string): string => value.replace(/'/g, "''");

interface AuditRow {
  readonly SourcePageUrl?: string;
  readonly TargetPageUrl?: string;
  readonly FinalStatus?: string;
  readonly CompletedAt?: string;
  readonly StartedAt?: string;
  readonly RunId?: string;
}

const MAX_TITLE_LENGTH = 255;
const MAX_NOTE_LENGTH = 30_000;

const truncate = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

export class SharePointReportStorageService {
  private readonly _sharePointPageService: ISharePointPageService;
  private readonly _reportExportService: ReportExportService;
  private readonly _logger: Logger;

  public constructor(
    sharePointPageService: ISharePointPageService,
    reportExportService: ReportExportService,
    logger: Logger
  ) {
    this._sharePointPageService = sharePointPageService;
    this._reportExportService = reportExportService;
    this._logger = logger;
  }

  public async validateStorage(context: MigrationContext): Promise<void> {
    if (!context.persistence.persistReports) {
      return;
    }

    const storageSiteUrl = this.resolveStorageSiteUrl(context);
    const validation = await this._sharePointPageService.validateReportStorageAccess(storageSiteUrl);

    const blocking = validation.checks
      .filter((check) => !check.passed && check.severity === 'blocking')
      .map((check) => check.code);

    if (blocking.length > 0) {
      throw new ReportStorageValidationError(blocking);
    }
  }

  public async provisionLists(
    siteUrl: string,
    auditListName: string,
    logListName: string
  ): Promise<void> {
    await this._sharePointPageService.ensureList(
      siteUrl, auditListName, 'Page migration audit trail.', reportFieldDefinitions
    );
    await this._sharePointPageService.ensureList(
      siteUrl, logListName, 'Page migration diagnostic log.', logFieldDefinitions
    );

    await this._sharePointPageService.ensureIndexedFields(
      siteUrl, auditListName, ['SourceSiteId', 'TargetSiteId']
    );

    this._logger.info('Reporting lists provisioned.', { siteUrl, auditListName, logListName });
  }

  public async persistRun(
    context: MigrationContext,
    reports: ReadonlyArray<PageMigrationReportEntry>
  ): Promise<PersistedRunArtifacts | undefined> {
    if (!context.persistence.persistReports || reports.length === 0) {
      return undefined;
    }

    const storageSiteUrl = this.resolveStorageSiteUrl(context);
    const runId = `run-${new Date().toISOString().replace(/[:.]/g, '-')}`;
    const folderPath = await this._sharePointPageService.ensureFolderPath(
      storageSiteUrl,
      `${new URL(storageSiteUrl).pathname.replace(/\/$/, '')}/SiteAssets/PageMigration/Reports`
    );

    const jsonReportUrl = await this._sharePointPageService.uploadTextAsset(
      storageSiteUrl, folderPath, `${runId}.json`, this._reportExportService.buildJson(reports), true
    );
    const csvReportUrl = await this._sharePointPageService.uploadTextAsset(
      storageSiteUrl, folderPath, `${runId}.csv`, this._reportExportService.buildCsv(reports), true
    );

    let reportItemsStored = 0;
    let logItemsStored = 0;
    let warningMessage: string | undefined;

    try {
      await this._sharePointPageService.ensureList(
        storageSiteUrl, context.persistence.auditListName, 'Page migration audit trail.', reportFieldDefinitions
      );
      await this._sharePointPageService.ensureList(
        storageSiteUrl, context.persistence.logListName, 'Page migration diagnostic log.', logFieldDefinitions
      );

      reportItemsStored = await this._sharePointPageService.addListItemsBatch(
        storageSiteUrl,
        context.persistence.auditListName,
        reports.map((report) => this.toAuditItem(context, report, runId, jsonReportUrl, csvReportUrl))
      );

      const logEntries = this._logger.snapshot();
      logItemsStored = await this._sharePointPageService.addListItemsBatch(
        storageSiteUrl,
        context.persistence.logListName,
        logEntries.map((entry) => ({
          Title: truncate(entry.message, MAX_TITLE_LENGTH),
          RunId: runId,
          Level: entry.level,
          TimestampUtc: entry.timestamp,
          DetailsJson: truncate(stringifyDetails(entry.details), MAX_NOTE_LENGTH)
        }))
      );
    } catch (error) {
      warningMessage = toMessage(error, 'Audit and log list persistence failed.');
      this._logger.warning('Report artifacts uploaded, but list persistence failed.', { error, runId });
    }

    return { runId, jsonReportUrl, csvReportUrl, reportItemsStored, logItemsStored, warningMessage };
  }

  private toAuditItem(
    context: MigrationContext,
    report: PageMigrationReportEntry,
    runId: string,
    jsonReportUrl: string,
    csvReportUrl: string
  ): Record<string, unknown> {
    return {
      Title: truncate(report.pageName, MAX_TITLE_LENGTH),
      RunId: runId,
      SourceSiteId: truncate(context.sourceSite.id, MAX_TITLE_LENGTH),
      TargetSiteId: truncate(context.targetSite.id, MAX_TITLE_LENGTH),
      SourceSiteUrl: context.sourceSite.webUrl,
      TargetSiteUrl: context.targetSite.webUrl,
      SourcePageUrl: report.sourcePageUrl,
      TargetPageUrl: report.targetPageUrl ?? '',
      FinalStatus: report.finalStatus,
      StartedAt: report.startedAt,
      CompletedAt: report.completedAt ?? null,
      DurationMs: report.durationMs ?? 0,
      AssetsCopied: report.assets.filter((asset) => successfulAssetStatuses.has(asset.status)).length,
      AssetsFailed: report.assets.filter((asset) => asset.status === 'Failed').length,
      UnsupportedWebParts: truncate(stringifyDetails(report.unsupportedWebParts), MAX_NOTE_LENGTH),
      Warnings: truncate(stringifyDetails(report.warnings), MAX_NOTE_LENGTH),
      Errors: truncate(stringifyDetails(report.errors), MAX_NOTE_LENGTH),
      JsonReportUrl: jsonReportUrl,
      CsvReportUrl: csvReportUrl
    };
  }

  public async readHistory(context: MigrationContext): Promise<ReadonlyArray<MigrationHistoryEntry>> {
    if (!context.persistence.persistReports) {
      return [];
    }

    const storageSiteUrl = this.resolveStorageSiteUrl(context);

    try {
      const rows = await this._sharePointPageService.getListItems<AuditRow>(
        storageSiteUrl,
        context.persistence.auditListName,
        {
          filter: `SourceSiteId eq '${escapeODataLiteral(context.sourceSite.id)}'`
            + ` and TargetSiteId eq '${escapeODataLiteral(context.targetSite.id)}'`,
          select: ['SourcePageUrl', 'TargetPageUrl', 'FinalStatus', 'CompletedAt', 'StartedAt', 'RunId'],
          orderByDescending: 'Created',
          top: MAX_HISTORY_ROWS
        }
      );

      return rows
        .filter((row) => !!row.SourcePageUrl)
        .map((row) => ({
          sourcePageUrl: row.SourcePageUrl as string,
          targetPageUrl: row.TargetPageUrl || undefined,
          migratedAt: row.CompletedAt || row.StartedAt || '',
          finalStatus: (row.FinalStatus ?? 'Completed') as MigrationFinalStatus,
          runId: row.RunId
        }))
        .filter((entry) => !!entry.migratedAt);
    } catch (error) {
      this._logger.info('Migration history is unavailable for this pair.', { storageSiteUrl, error });
      return [];
    }
  }

  private resolveStorageSiteUrl(context: MigrationContext): string {
    const configured = context.persistence.reportStorageSiteUrl?.trim();
    if (!configured) {
      return context.targetSite.webUrl;
    }

    if (!isSharePointUrl(configured)) {
      this._logger.warning('Configured report storage URL is not a SharePoint URL; using the target site.', {
        configured
      });
      return context.targetSite.webUrl;
    }

    const targetHost = new URL(context.targetSite.webUrl).hostname.toLowerCase();
    if (new URL(configured).hostname.toLowerCase() !== targetHost) {
      this._logger.warning('Configured report storage URL is on a different host; using the target site.', {
        configured
      });
      return context.targetSite.webUrl;
    }

    return configured;
  }
}

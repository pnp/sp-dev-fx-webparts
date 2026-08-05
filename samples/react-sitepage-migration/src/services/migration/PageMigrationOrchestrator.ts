import { PageInventoryItem } from '../../models/PageInventoryItem';
import {
  MigrationProgressSnapshot,
  PageMigrationReportEntry,
  successfulAssetStatuses
} from '../../models/MigrationReport';
import {
  MigrationContext,
  MigrationRunResult,
  PageValidationResult,
  SitePermissionValidationResult
} from '../../models/OperationalTypes';
import { MigrationCancellationToken } from '../../utilities/CancellationToken';
import { ConcurrencyLimiter } from '../../utilities/ConcurrencyLimiter';
import { toMessage } from '../../utilities/ErrorSerialization';
import { OperationCancelledError } from '../../utilities/RetryHelper';
import { NormalizedPage } from '../../models/NormalizedPage';
import { Logger } from '../logging/Logger';
import {
  ISharePointPageService,
  SiteIdentifiers,
  TargetPageHandle
} from '../sharepoint/ISharePointPageService';
import { AssetMigrationService } from './AssetMigrationService';
import { PageNormalizationService } from './PageNormalizationService';
import { buildGuidMappings, PageTransformService } from './PageTransformService';

export interface MigrationCallbacks {
  readonly onProgress?: (snapshot: MigrationProgressSnapshot) => void;
  readonly onPageStatusChange?: (
    pageId: string,
    status: PageInventoryItem['migrationStatus'],
    targetPageUrl?: string,
    warningCount?: number
  ) => void;
}

const PAGE_CONCURRENCY = 3;

const PUBLISH_COMMENT = 'Migrated by Page Migration Admin';

const MAX_CACHED_PAGES = 50;

interface PreparedPage {
  readonly item: PageInventoryItem;
  readonly normalizedPage: NormalizedPage;
  readonly target: TargetPageHandle;
}

interface PreparationFailure {
  readonly item: PageInventoryItem;
  readonly message: string;
}

export class PageMigrationOrchestrator {
  private readonly _sharePointPageService: ISharePointPageService;
  private readonly _pageNormalizationService: PageNormalizationService;
  private readonly _assetMigrationService: AssetMigrationService;
  private readonly _pageTransformService: PageTransformService;
  private readonly _logger: Logger;

  private readonly _pageCache = new Map<string, NormalizedPage>();

  private _activeToken?: MigrationCancellationToken;

  public constructor(
    sharePointPageService: ISharePointPageService,
    pageNormalizationService: PageNormalizationService,
    assetMigrationService: AssetMigrationService,
    pageTransformService: PageTransformService,
    logger: Logger
  ) {
    this._sharePointPageService = sharePointPageService;
    this._pageNormalizationService = pageNormalizationService;
    this._assetMigrationService = assetMigrationService;
    this._pageTransformService = pageTransformService;
    this._logger = logger;
  }

  public cancelActiveRun(): void {
    this._activeToken?.cancel();
  }

  public clearCache(): void {
    this._pageCache.clear();
  }

  public async validateSites(context: MigrationContext): Promise<ReadonlyArray<SitePermissionValidationResult>> {
    return Promise.all([
      this._sharePointPageService.validateSiteAccess(context.sourceSite.webUrl, 'SourceRead'),
      this._sharePointPageService.validateSiteAccess(context.targetSite.webUrl, 'TargetWrite')
    ]);
  }

  public async validatePages(
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    cancellationToken: MigrationCancellationToken,
    callbacks?: MigrationCallbacks
  ): Promise<ReadonlyArray<PageValidationResult>> {
    const limiter = new ConcurrencyLimiter(PAGE_CONCURRENCY);
    let processed = 0;

    const results = await limiter.map(pages, async (page): Promise<PageValidationResult> => {
      cancellationToken.throwIfCancelled();
      callbacks?.onPageStatusChange?.(page.id, 'Validating');

      try {
        const normalizedPage = await this.loadNormalizedPage(context, page, cancellationToken);
        const status = normalizedPage.unsupportedControls.length > 0 ? 'Warning' : 'Ready';

        callbacks?.onPageStatusChange?.(page.id, status, undefined, normalizedPage.warnings.length);
        return {
          page,
          normalizedPage,
          status,
          warnings: normalizedPage.warnings.map((warning) => warning.message),
          errors: []
        };
      } catch (error) {
        if (error instanceof OperationCancelledError) {
          throw error;
        }

        this._logger.error('Page validation failed.', { pageUrl: page.webUrl, error });
        callbacks?.onPageStatusChange?.(page.id, 'Failed');
        return {
          page,
          status: 'Failed',
          warnings: [],
          errors: [toMessage(error, 'Unknown validation error.')]
        };
      } finally {
        processed += 1;
        callbacks?.onProgress?.({
          totalPages: pages.length,
          processedPages: processed,
          currentPageName: page.name,
          percentComplete: Math.round((processed / Math.max(pages.length, 1)) * 100),
          phase: 'Validating',
          detail: page.name
        });
      }
    });

    callbacks?.onProgress?.({
      totalPages: pages.length,
      processedPages: pages.length,
      percentComplete: 100,
      phase: 'ValidationComplete'
    });

    return results;
  }

  public async migratePages(
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    cancellationToken: MigrationCancellationToken,
    callbacks?: MigrationCallbacks
  ): Promise<MigrationRunResult> {
    this._activeToken = cancellationToken;
    const runPhase = context.dryRun ? 'Planning' : 'Migrating';
    const completePhase = context.dryRun ? 'DryRunComplete' : 'MigrationComplete';

    try {
      callbacks?.onProgress?.({
        totalPages: pages.length,
        processedPages: 0,
        percentComplete: 0,
        phase: 'ResolvingTargets'
      });

      const runStartedAt = new Date().toISOString();

      let prepared: ReadonlyArray<PreparedPage>;
      let failures: ReadonlyArray<PreparationFailure>;
      try {
        ({ prepared, failures } = await this.prepareTargets(context, pages, cancellationToken, callbacks));
      } catch (error) {
        if (error instanceof OperationCancelledError) {
          callbacks?.onProgress?.({
            totalPages: pages.length,
            processedPages: 0,
            percentComplete: 0,
            phase: 'MigrationCancelled'
          });
          return { reports: [], cancelled: true };
        }
        throw error;
      }

      const pageMappings = new Map<string, string>();
      prepared.forEach(({ item, target }) => pageMappings.set(item.webUrl, target.pageUrl));

      const [sourceIdentifiers, targetIdentifiers] = await Promise.all([
        this._sharePointPageService.getSiteIdentifiers(context.sourceSite.webUrl),
        this._sharePointPageService.getSiteIdentifiers(context.targetSite.webUrl)
      ]);

      const limiter = new ConcurrencyLimiter(PAGE_CONCURRENCY);
      let processed = 0;

      const siteIdentifiers = { source: sourceIdentifiers, target: targetIdentifiers };

      const reports = await limiter.map(prepared, async (entry): Promise<PageMigrationReportEntry> => {
        const startedAt = new Date().toISOString();

        try {
          cancellationToken.throwIfCancelled();
          callbacks?.onPageStatusChange?.(entry.item.id, 'Migrating');

          return await this.migrateSinglePage(
            context, entry, pageMappings, siteIdentifiers, startedAt, cancellationToken, callbacks
          );
        } catch (error) {
          const cancelled = error instanceof OperationCancelledError || cancellationToken.isCancelled;
          const completedAt = new Date().toISOString();

          callbacks?.onPageStatusChange?.(entry.item.id, cancelled ? 'NotStarted' : 'Failed');
          if (!cancelled) {
            this._logger.error('Page migration failed.', { pageUrl: entry.item.webUrl, error });
          }

          return {
            pageId: entry.item.pageId,
            pageName: entry.item.name,
            sourcePageUrl: entry.item.webUrl,
            startedAt,
            completedAt,
            durationMs: Date.parse(completedAt) - Date.parse(startedAt),
            finalStatus: cancelled ? 'Cancelled' : 'Failed',
            assets: [],
            unsupportedWebParts: [],
            warnings: [],
            errors: [toMessage(error, 'Unknown migration error.')]
          };
        } finally {
          processed += 1;
          callbacks?.onProgress?.({
            totalPages: prepared.length,
            processedPages: processed,
            currentPageName: entry.item.name,
            percentComplete: Math.round((processed / Math.max(prepared.length, 1)) * 100),
            phase: runPhase,
            detail: entry.item.name
          });
        }
      });

      callbacks?.onProgress?.({
        totalPages: prepared.length,
        processedPages: prepared.length,
        percentComplete: 100,
        phase: cancellationToken.isCancelled ? 'MigrationCancelled' : completePhase
      });

      const failureReports = failures.map((failure) => this.toFailedReport(failure, runStartedAt));

      return {
        reports: [...reports, ...failureReports],
        cancelled: cancellationToken.isCancelled
      };
    } finally {
      this._activeToken = undefined;
    }
  }

  private async prepareTargets(
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    cancellationToken: MigrationCancellationToken,
    callbacks?: MigrationCallbacks
  ): Promise<{ prepared: ReadonlyArray<PreparedPage>; failures: ReadonlyArray<PreparationFailure> }> {
    const prepared: PreparedPage[] = [];
    const failures: PreparationFailure[] = [];

    for (let index = 0; index < pages.length; index += 1) {
      cancellationToken.throwIfCancelled();
      const item = pages[index];

      try {
        const normalizedPage = await this.loadNormalizedPage(context, item, cancellationToken);
        const target = await this._sharePointPageService.createOrLoadTargetPage(
          context,
          normalizedPage.metadata.pageName,
          normalizedPage.metadata.folderPath
        );

        prepared.push({ item, normalizedPage, target });
      } catch (error) {
        if (error instanceof OperationCancelledError) {
          throw error;
        }

        this._logger.error('Target page preparation failed.', { pageUrl: item.webUrl, error });
        callbacks?.onPageStatusChange?.(item.id, 'Failed');
        failures.push({ item, message: toMessage(error, 'Could not prepare the destination page.') });
      }

      callbacks?.onProgress?.({
        totalPages: pages.length,
        processedPages: index + 1,
        currentPageName: item.name,
        percentComplete: Math.round(((index + 1) / Math.max(pages.length, 1)) * 100),
        phase: 'ResolvingTargets',
        detail: item.name
      });
    }

    return { prepared, failures };
  }

  private toFailedReport(failure: PreparationFailure, startedAt: string): PageMigrationReportEntry {
    const completedAt = new Date().toISOString();
    return {
      pageId: failure.item.pageId,
      pageName: failure.item.name,
      sourcePageUrl: failure.item.webUrl,
      startedAt,
      completedAt,
      durationMs: Date.parse(completedAt) - Date.parse(startedAt),
      finalStatus: 'Failed',
      assets: [],
      unsupportedWebParts: [],
      warnings: [],
      errors: [failure.message]
    };
  }

  private async migrateSinglePage(
    context: MigrationContext,
    entry: PreparedPage,
    pageMappings: ReadonlyMap<string, string>,
    siteIdentifiers: {
      readonly source: SiteIdentifiers | undefined;
      readonly target: SiteIdentifiers | undefined;
    },
    startedAt: string,
    cancellationToken: MigrationCancellationToken,
    callbacks?: MigrationCallbacks
  ): Promise<PageMigrationReportEntry> {
    const { item, normalizedPage, target } = entry;

    if (target.skipped) {
      const completedAt = new Date().toISOString();
      callbacks?.onPageStatusChange?.(
        item.id,
        normalizedPage.warnings.length > 0 ? 'Warning' : 'Ready',
        target.pageUrl,
        normalizedPage.warnings.length
      );
      return {
        pageId: item.pageId,
        pageName: target.pageName,
        sourcePageUrl: normalizedPage.metadata.sourcePageUrl,
        targetPageUrl: target.pageUrl,
        startedAt,
        completedAt,
        durationMs: Date.parse(completedAt) - Date.parse(startedAt),
        finalStatus: 'Skipped',
        assets: [],
        unsupportedWebParts: [],
        warnings: normalizedPage.warnings,
        errors: []
      };
    }

    const assetResults = await this._assetMigrationService.migrateAssets(
      context,
      normalizedPage.metadata.pageName,
      normalizedPage.assets,
      cancellationToken
    );
    const assetMap = this._pageTransformService.buildAssetReplacementMap(normalizedPage.assets, assetResults);
    const guidMap = buildGuidMappings(siteIdentifiers.source, siteIdentifiers.target, assetResults);

    const transformedPage = this._pageTransformService.transformPage(
      normalizedPage,
      context.sourceSite.webUrl,
      context.targetSite.webUrl,
      assetMap,
      pageMappings,
      guidMap
    );

    cancellationToken.throwIfCancelled();

    if (context.dryRun) {
      const plannedAt = new Date().toISOString();
      callbacks?.onPageStatusChange?.(
        item.id,
        normalizedPage.warnings.length > 0 ? 'Warning' : 'Ready',
        target.pageUrl,
        normalizedPage.warnings.length
      );

      return {
        pageId: item.pageId,
        pageName: target.pageName,
        sourcePageUrl: normalizedPage.metadata.sourcePageUrl,
        targetPageUrl: target.pageUrl,
        startedAt,
        completedAt: plannedAt,
        durationMs: Date.parse(plannedAt) - Date.parse(startedAt),
        finalStatus: 'Planned',
        assets: assetResults,
        unsupportedWebParts: normalizedPage.unsupportedControls.map((control) => ({
          webPartId: control.webPartId,
          title: control.title,
          compatibility: 'Unsupported' as const,
          serializedConfiguration: control.serializedConfiguration
        })),
        warnings: normalizedPage.warnings,
        errors: []
      };
    }

    try {
      await this._sharePointPageService.updatePageCanvas(context.targetSite.webUrl, target.pagePath, transformedPage);
    } catch (updateError) {
      if (target.wasCreated) {
        try {
          await this._sharePointPageService.deleteFile(context.targetSite.webUrl, target.pagePath);
          this._logger.info('Rolled back partially created target page.', { pagePath: target.pagePath });
        } catch (rollbackError) {
          this._logger.error('Failed to roll back partially created target page.', {
            pagePath: target.pagePath,
            error: rollbackError
          });
        }
      }
      throw updateError;
    }

    if (context.publishOnComplete) {
      await this._sharePointPageService.publishPage(context.targetSite.webUrl, target.pagePath, PUBLISH_COMMENT);
    }

    const failedAssets = assetResults.filter((result) => result.status === 'Failed');
    const completedAt = new Date().toISOString();
    const finalStatus = normalizedPage.warnings.length > 0 || failedAssets.length > 0
      ? 'CompletedWithWarnings'
      : 'Completed';

    callbacks?.onPageStatusChange?.(
      item.id,
      finalStatus === 'Completed' ? 'Completed' : 'Warning',
      target.pageUrl,
      normalizedPage.warnings.length
    );

    return {
      pageId: item.pageId,
      pageName: target.pageName,
      sourcePageUrl: normalizedPage.metadata.sourcePageUrl,
      targetPageUrl: target.pageUrl,
      startedAt,
      completedAt,
      durationMs: Date.parse(completedAt) - Date.parse(startedAt),
      finalStatus,
      assets: assetResults,
      unsupportedWebParts: normalizedPage.unsupportedControls.map((control) => ({
        webPartId: control.webPartId,
        title: control.title,
        compatibility: 'Unsupported' as const,
        serializedConfiguration: control.serializedConfiguration
      })),
      warnings: normalizedPage.warnings,
      errors: failedAssets.map((asset) => asset.message ?? 'Asset migration failed.')
    };
  }

  private async loadNormalizedPage(
    context: MigrationContext,
    page: PageInventoryItem,
    cancellationToken: MigrationCancellationToken
  ): Promise<NormalizedPage> {
    const cacheKey = `${context.sourceSite.id}|${page.webUrl}`;
    const cached = this._pageCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const rawPage = await this._sharePointPageService.loadPage(
      context.sourceSite.webUrl,
      page.webUrl,
      { maxAttempts: 4, baseDelayMs: 750, signal: cancellationToken },
      { name: page.authorName, email: page.authorEmail }
    );
    const normalizedPage = this._pageNormalizationService.normalize(context.sourceSite.webUrl, rawPage);
    if (this._pageCache.size >= MAX_CACHED_PAGES) {
      const oldest = this._pageCache.keys().next().value;
      if (oldest !== undefined) {
        this._pageCache.delete(oldest);
      }
    }
    this._pageCache.set(cacheKey, normalizedPage);
    return normalizedPage;
  }
}

export const assetWasMigrated = (status: string): boolean =>
  successfulAssetStatuses.has(status as never);

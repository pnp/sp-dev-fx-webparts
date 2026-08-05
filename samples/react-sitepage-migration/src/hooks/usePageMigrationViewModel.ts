import * as React from 'react';
import { PageInventoryItem } from '../models/PageInventoryItem';
import { NormalizedPage } from '../models/NormalizedPage';
import { idleProgress, MigrationProgressSnapshot, PageMigrationReportEntry } from '../models/MigrationReport';
import {
  ConflictMode,
  MigrationContext,
  SitePermissionValidationResult
} from '../models/OperationalTypes';
import { SiteReference } from '../models/SiteReference';
import {
  applyMigrationHistory,
  countPreviouslyMigrated,
  MigrationHistory,
  mergeHistoryEntries,
  selectPagesNeedingMigration
} from '../models/MigrationHistory';
import { MigrationHistoryStore } from '../services/reporting/MigrationHistoryStore';
import { GraphDiscoveryService } from '../services/graph/GraphDiscoveryService';
import { Logger } from '../services/logging/Logger';
import { PageMigrationOrchestrator } from '../services/migration/PageMigrationOrchestrator';
import { PageNormalizationService } from '../services/migration/PageNormalizationService';
import { ReportExportService } from '../services/reporting/ReportExportService';
import { SharePointReportStorageService } from '../services/reporting/SharePointReportStorageService';
import { ISharePointPageService } from '../services/sharepoint/ISharePointPageService';
import { toMessage } from '../utilities/ErrorSerialization';
import { useNotifications, NotificationMessage, UseNotificationsResult } from './useNotifications';
import { useSiteSearch } from './useSiteSearch';
import { ColumnKey, GroupByKey, PageGroup, usePageSelection } from './usePageSelection';
import { useMigrationRunner } from './useMigrationRunner';

export interface PageMigrationServices {
  readonly graphDiscoveryService: GraphDiscoveryService;
  readonly sharePointPageService: ISharePointPageService;
  readonly pageNormalizationService: PageNormalizationService;
  readonly pageMigrationOrchestrator: PageMigrationOrchestrator;
  readonly reportExportService: ReportExportService;
  readonly reportStorageService: SharePointReportStorageService;
  readonly logger: Logger;
}

export interface ViewModelOptions {
  readonly services: PageMigrationServices;
  readonly storageScope: string;
  readonly defaultPublishOnComplete: boolean;
  readonly defaultConflictMode: ConflictMode;
  readonly persistReports: boolean;
  readonly includePageTemplates: boolean;
  readonly reportStorageSiteUrl: string;
  readonly auditListName: string;
  readonly logListName: string;
}

export interface SiteSlotViewModel {
  readonly options: ReadonlyArray<SiteReference>;
  readonly recentSites: ReadonlyArray<SiteReference>;
  readonly isSearching: boolean;
  readonly selectedSite?: SiteReference;
  readonly search: (query: string) => Promise<void>;
  readonly select: (site?: SiteReference) => void;
}

export interface InventoryViewModel {
  readonly pages: ReadonlyArray<PageInventoryItem>;
  readonly visiblePages: ReadonlyArray<PageInventoryItem>;
  readonly groups: ReadonlyArray<PageGroup> | undefined;
  readonly selectedPageIds: ReadonlySet<string>;
  readonly filterText: string;
  readonly sortColumn: keyof PageInventoryItem;
  readonly sortDescending: boolean;
  readonly groupBy: GroupByKey;
  readonly visibleColumns: ReadonlySet<ColumnKey>;
  readonly isLoading: boolean;
  readonly isIncomplete: boolean;
  readonly checkedOutCount: number;
  readonly selectedCommentCount: number;
  readonly previouslyMigratedCount: number;
  readonly setFilterText: (value: string) => void;
  readonly setSelectedPageIds: (pageIds: ReadonlyArray<string>) => void;
  readonly togglePageSelected: (pageId: string) => void;
  readonly setSorting: (column: keyof PageInventoryItem) => void;
  readonly setGroupBy: (key: GroupByKey) => void;
  readonly toggleColumnVisibility: (key: ColumnKey) => void;
  readonly selectAllVisible: () => void;
  readonly clearSelection: () => void;
}

export interface RunViewModel {
  readonly isValidating: boolean;
  readonly isMigrating: boolean;
  readonly isBusy: boolean;
  readonly progress: MigrationProgressSnapshot;
  readonly reportEntries: ReadonlyArray<PageMigrationReportEntry>;
  readonly publishOnComplete: boolean;
  readonly conflictMode: ConflictMode;
  readonly validations: ReadonlyArray<SitePermissionValidationResult>;
  readonly setPublishOnComplete: (value: boolean) => void;
  readonly setConflictMode: (value: ConflictMode) => void;
  readonly validateSelected: () => Promise<void>;
  readonly planSelected: () => Promise<void>;
  readonly migrateSelected: () => Promise<void>;
  readonly cancelRun: () => void;
  readonly exportReport: (format: 'json' | 'csv') => void;
  readonly failedCount: number;
  readonly selectFailed: () => void;
  readonly needingMigrationCount: number;
  readonly selectNeedingMigration: () => void;
}

export interface PageMigrationViewModel {
  readonly source: SiteSlotViewModel;
  readonly target: SiteSlotViewModel;
  readonly inventory: InventoryViewModel;
  readonly run: RunViewModel;
  readonly notifications: ReadonlyArray<NotificationMessage>;
  readonly pushNotification: UseNotificationsResult['pushNotification'];
  readonly dismissNotification: (id: string) => void;
  readonly detail: {
    readonly page?: NormalizedPage;
    readonly pageId?: string;
    readonly isLoading: boolean;
    readonly open: (page: PageInventoryItem) => Promise<void>;
    readonly close: () => void;
  };
  readonly loadPages: () => Promise<void>;
  readonly refreshPages: () => Promise<void>;
  readonly validatePage: (page: PageInventoryItem) => Promise<void>;
}

const VALIDATION_TTL_MS = 5 * 60 * 1000;

interface CachedValidation {
  readonly results: ReadonlyArray<SitePermissionValidationResult>;
  readonly isValid: boolean;
  readonly checkedAt: number;
}

export const usePageMigrationViewModel = (options: ViewModelOptions): PageMigrationViewModel => {
  const { services, storageScope } = options;
  const isMountedRef = React.useRef(true);

  React.useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  const notifications = useNotifications(isMountedRef);
  const siteSearch = useSiteSearch(storageScope, services.graphDiscoveryService, services.logger, notifications, isMountedRef);
  const selection = usePageSelection(storageScope);
  const runner = useMigrationRunner(
    services.pageMigrationOrchestrator,
    services.reportStorageService,
    services.logger,
    notifications,
    isMountedRef
  );

  const [sourceSite, setSourceSiteState] = React.useState<SiteReference | undefined>();
  const [targetSite, setTargetSiteState] = React.useState<SiteReference | undefined>();
  const [isLoadingPages, setIsLoadingPages] = React.useState(false);
  const [isInventoryIncomplete, setIsInventoryIncomplete] = React.useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = React.useState(false);
  const [detailPageId, setDetailPageId] = React.useState<string | undefined>();
  const [publishOnComplete, setPublishOnComplete] = React.useState(options.defaultPublishOnComplete);
  const [conflictMode, setConflictMode] = React.useState<ConflictMode>(options.defaultConflictMode);
  const [validations, setValidations] = React.useState<ReadonlyArray<SitePermissionValidationResult>>([]);

  const validationCacheRef = React.useRef(new Map<string, CachedValidation>());
  const historyStore = React.useMemo(() => new MigrationHistoryStore(storageScope), [storageScope]);
  const [history, setHistory] = React.useState<MigrationHistory>(new Map());

  const refreshHistory = React.useCallback(async (context: MigrationContext): Promise<void> => {
    const local = [...historyStore.read(context.sourceSite.id, context.targetSite.id).values()];
    const remote = await services.reportStorageService.readHistory(context);
    const merged = mergeHistoryEntries([...local, ...remote]);

    if (!isMountedRef.current || merged.size === 0) {
      return;
    }

    setHistory(merged);
    selection.setPages((pages) => applyMigrationHistory(pages, merged));
  }, [historyStore, services.reportStorageService, selection, isMountedRef]);

  const setSourceSite = React.useCallback((site?: SiteReference) => {
    if (sourceSite?.id === site?.id) {
      return;
    }

    setSourceSiteState(site);
    siteSearch.source.setOptions(site ? [site] : []);
    if (site) {
      siteSearch.source.addRecentSite(site);
    }
    selection.resetPages();
    services.pageMigrationOrchestrator.clearCache();
    runner.setProgress(idleProgress);
    setIsInventoryIncomplete(false);
    setDetailPageId(undefined);
  }, [sourceSite, siteSearch.source, selection, runner, services.pageMigrationOrchestrator]);

  const setTargetSite = React.useCallback((site?: SiteReference) => {
    if (targetSite?.id === site?.id) {
      return;
    }

    setTargetSiteState(site);
    siteSearch.target.setOptions(site ? [site] : []);
    if (site) {
      siteSearch.target.addRecentSite(site);
    }

    selection.setPages((pages) => pages.map((page) => ({
      ...page,
      migrationStatus: page.warningCount > 0 ? 'Warning' : 'NotStarted',
      targetPageUrl: undefined
    })));
    runner.setProgress(idleProgress);
  }, [targetSite, siteSearch.target, selection, runner]);

  const tryBuildContextQuietly = React.useCallback(
    (source: SiteReference | undefined, target: SiteReference | undefined): MigrationContext | undefined => {
      if (!source || !target || source.id === target.id) {
        return undefined;
      }
      return {
        sourceSite: source,
        targetSite: target,
        publishOnComplete,
        overwriteMode: conflictMode,
        persistence: {
          persistReports: options.persistReports,
          reportStorageSiteUrl: options.reportStorageSiteUrl,
          auditListName: options.auditListName,
          logListName: options.logListName
        },
        dryRun: false
      };
    },
    [publishOnComplete, conflictMode, options.persistReports, options.reportStorageSiteUrl,
      options.auditListName, options.logListName]
  );

  const tryBuildContext = React.useCallback((dryRun = false): MigrationContext | undefined => {
    if (!sourceSite || !targetSite) {
      notifications.pushNotification('warning', 'Choose both a source and a destination site first.');
      return undefined;
    }

    if (sourceSite.id === targetSite.id) {
      notifications.pushNotification('error', 'The source and destination sites must be different.');
      return undefined;
    }

    return {
      sourceSite,
      targetSite,
      publishOnComplete,
      overwriteMode: conflictMode,
      persistence: {
        persistReports: options.persistReports,
        reportStorageSiteUrl: options.reportStorageSiteUrl,
        auditListName: options.auditListName,
        logListName: options.logListName
      },
      dryRun
    };
  }, [
    sourceSite, targetSite, publishOnComplete, conflictMode, notifications,
    options.persistReports, options.reportStorageSiteUrl, options.auditListName, options.logListName
  ]);

  const ensureSitesValidated = React.useCallback(async (context: MigrationContext): Promise<boolean> => {
    const cacheKey = `${context.sourceSite.id}|${context.targetSite.id}|${String(context.persistence.persistReports)}`;
    const cached = validationCacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.checkedAt < VALIDATION_TTL_MS) {
      setValidations(cached.results);
      return cached.isValid;
    }

    try {
      const results = await services.pageMigrationOrchestrator.validateSites(context);
      await services.reportStorageService.validateStorage(context);

      const isValid = results.every((result) => result.isValid);
      validationCacheRef.current.set(cacheKey, { results, isValid, checkedAt: Date.now() });

      if (!isMountedRef.current) {
        return isValid;
      }

      setValidations(results);
      if (!isValid) {
        notifications.pushNotification('error', 'Permission checks failed. Review the site access details before continuing.');
      }
      return isValid;
    } catch (error) {
      validationCacheRef.current.delete(cacheKey);
      if (isMountedRef.current) {
        notifications.pushNotification('error', toMessage(error, 'Site validation failed.'));
      }
      return false;
    }
  }, [services.pageMigrationOrchestrator, services.reportStorageService, notifications]);

  const loadPages = React.useCallback(async () => {
    if (!sourceSite) {
      notifications.pushNotification('warning', 'Choose a source site first.');
      return;
    }

    setIsLoadingPages(true);
    setIsInventoryIncomplete(false);
    runner.setProgress({ ...idleProgress, phase: 'LoadingPages' });

    try {
      const result = await services.graphDiscoveryService.getSitePages(sourceSite.id, {
        onProgress: (loaded) => runner.setProgress({
          totalPages: loaded,
          processedPages: loaded,
          percentComplete: 0,
          phase: 'LoadingPages'
        })
      });

      const templates = options.includePageTemplates
        ? await services.graphDiscoveryService.getPageTemplates(sourceSite.id)
        : [];

      if (!isMountedRef.current) {
        return;
      }

      const ordered = [...result.items, ...templates].sort(
        (left, right) => right.lastModifiedDateTime.localeCompare(left.lastModifiedDateTime)
      );

      selection.setPages(ordered);
      selection.setSelectedPageIds([]);
      selection.setPageDetailsById({});
      services.pageMigrationOrchestrator.clearCache();
      runner.setReportEntries([]);
      setIsInventoryIncomplete(!result.isComplete);

      const templateSuffix = templates.length > 0
        ? ` (including ${templates.length.toString()} template(s))`
        : '';

      if (result.isComplete) {
        notifications.pushNotification(
          'success',
          `Loaded ${ordered.length.toString()} page(s)${templateSuffix}.`
        );
      } else {
        notifications.pushNotification(
          'warning',
          `Only ${ordered.length.toString()} page(s) could be loaded — the list is incomplete. ${result.error ?? ''}`.trim()
        );
      }

      runner.setProgress({
        totalPages: ordered.length,
        processedPages: ordered.length,
        percentComplete: 100,
        phase: 'PagesLoaded'
      });

      if (targetSite) {
        const context = tryBuildContextQuietly(sourceSite, targetSite);
        if (context) {
          await refreshHistory(context).catch((error: unknown) => {
            services.logger.info('Could not read migration history.', { error });
          });
        }
      }
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }
      services.logger.error('Page enumeration failed.', { siteId: sourceSite.id, error });
      notifications.pushNotification('error', toMessage(error, 'Could not load pages from the source site.'));
      runner.setProgress(idleProgress);
    } finally {
      if (isMountedRef.current) {
        setIsLoadingPages(false);
      }
    }
  }, [sourceSite, targetSite, options.includePageTemplates, services.graphDiscoveryService, services.logger,
    services.pageMigrationOrchestrator, notifications, runner, selection, tryBuildContextQuietly, refreshHistory]);

  const refreshPages = React.useCallback(async () => {
    services.pageMigrationOrchestrator.clearCache();
    await loadPages();
  }, [loadPages, services.pageMigrationOrchestrator]);

  const loadDetail = React.useCallback(async (page: PageInventoryItem): Promise<NormalizedPage | undefined> => {
    const existing = selection.pageDetailsById[page.id];
    if (existing) {
      return existing;
    }

    if (!sourceSite) {
      notifications.pushNotification('warning', 'Choose a source site first.');
      return undefined;
    }

    setIsLoadingDetail(true);
    try {
      const rawPage = await services.sharePointPageService.loadPage(
        sourceSite.webUrl,
        page.webUrl,
        undefined,
        { name: page.authorName, email: page.authorEmail }
      );
      const normalizedPage = services.pageNormalizationService.normalize(sourceSite.webUrl, rawPage);

      if (!isMountedRef.current) {
        return undefined;
      }

      selection.setPageDetailsById((previous) => ({ ...previous, [page.id]: normalizedPage }));
      selection.updatePageStatus(
        page.id,
        normalizedPage.unsupportedControls.length > 0 ? 'Warning' : 'Ready',
        undefined,
        normalizedPage.warnings.length
      );
      return normalizedPage;
    } catch (error) {
      if (!isMountedRef.current) {
        return undefined;
      }
      services.logger.error('Page detail load failed.', { pageUrl: page.webUrl, error });
      notifications.pushNotification('error', toMessage(error, 'Could not open the page details.'));
      selection.updatePageStatus(page.id, 'Failed');
      return undefined;
    } finally {
      if (isMountedRef.current) {
        setIsLoadingDetail(false);
      }
    }
  }, [sourceSite, services.sharePointPageService, services.pageNormalizationService, services.logger, notifications, selection]);

  const openDetail = React.useCallback(async (page: PageInventoryItem) => {
    setDetailPageId(page.id);
    await loadDetail(page);
  }, [loadDetail]);

  const closeDetail = React.useCallback(() => setDetailPageId(undefined), []);

  const selectedPages = React.useMemo(
    () => selection.pages.filter((page) => selection.selectedPageIds.has(page.id)),
    [selection.pages, selection.selectedPageIds]
  );

  const validateSelected = React.useCallback(async () => {
    const context = tryBuildContext();
    if (!context) {
      return;
    }

    if (selectedPages.length === 0) {
      notifications.pushNotification('warning', 'Select at least one page to validate.');
      return;
    }

    if (!(await ensureSitesValidated(context))) {
      return;
    }

    await runner.validatePages(context, selectedPages, selection.updatePageStatus);
  }, [tryBuildContext, selectedPages, ensureSitesValidated, runner, selection.updatePageStatus,
    notifications, historyStore, refreshHistory]);

  const validatePage = React.useCallback(async (page: PageInventoryItem) => {
    const context = tryBuildContext();
    if (!context) {
      return;
    }

    if (!(await ensureSitesValidated(context))) {
      return;
    }

    await runner.validatePages(context, [page], selection.updatePageStatus);
    setDetailPageId(page.id);
    await loadDetail(page);
  }, [tryBuildContext, ensureSitesValidated, runner, selection.updatePageStatus, loadDetail]);

  const planSelected = React.useCallback(async () => {
    const context = tryBuildContext(true);
    if (!context) {
      return;
    }

    if (selectedPages.length === 0) {
      notifications.pushNotification('warning', 'Select at least one page to include in the dry run.');
      return;
    }

    if (!(await ensureSitesValidated(context))) {
      return;
    }

    await runner.migratePages(context, selectedPages, selection.updatePageStatus);
  }, [tryBuildContext, selectedPages, ensureSitesValidated, runner, selection.updatePageStatus, notifications]);

  const migrateSelected = React.useCallback(async () => {
    const context = tryBuildContext();
    if (!context) {
      return;
    }

    if (selectedPages.length === 0) {
      notifications.pushNotification('warning', 'Select at least one page to migrate.');
      return;
    }

    if (!(await ensureSitesValidated(context))) {
      return;
    }

    selectedPages.forEach((page) => selection.updatePageStatus(page.id, 'Queued'));
    const reports = await runner.migratePages(context, selectedPages, selection.updatePageStatus);

    historyStore.write(
      context.sourceSite.id,
      context.targetSite.id,
      reports.map((report) => ({
        sourcePageUrl: report.sourcePageUrl,
        targetPageUrl: report.targetPageUrl,
        migratedAt: report.completedAt ?? report.startedAt,
        finalStatus: report.finalStatus
      }))
    );
    await refreshHistory(context).catch(() => undefined);
  }, [tryBuildContext, selectedPages, ensureSitesValidated, runner, selection.updatePageStatus,
    notifications, historyStore, refreshHistory]);

  const failedPageIds = React.useMemo(() => {
    const failedUrls = new Set(
      runner.reportEntries
        .filter((report) => report.finalStatus === 'Failed')
        .map((report) => report.sourcePageUrl)
    );
    return selection.pages.filter((page) => failedUrls.has(page.webUrl)).map((page) => page.id);
  }, [runner.reportEntries, selection.pages]);

  const pageIdsNeedingMigration = React.useMemo(
    () => selectPagesNeedingMigration(selection.pages, history),
    [selection.pages, history]
  );

  const selectNeedingMigration = React.useCallback(() => {
    if (pageIdsNeedingMigration.length === 0) {
      notifications.pushNotification('success', 'Every page here is already up to date in the destination.');
      return;
    }

    selection.setSelectedPageIds(pageIdsNeedingMigration);
    notifications.pushNotification(
      'info',
      `Selected ${pageIdsNeedingMigration.length.toString()} page(s) that are new, changed or not yet migrated.`
    );
  }, [pageIdsNeedingMigration, selection, notifications]);

  const selectFailed = React.useCallback(() => {
    if (failedPageIds.length === 0) {
      notifications.pushNotification('info', 'The last run had no failures to retry.');
      return;
    }
    selection.setSelectedPageIds(failedPageIds);
    notifications.pushNotification('info', `Selected ${failedPageIds.length.toString()} page(s) that failed.`);
  }, [failedPageIds, selection, notifications]);

  const exportReport = React.useCallback((format: 'json' | 'csv') => {
    if (runner.reportEntries.length === 0) {
      notifications.pushNotification('warning', 'There is no migration report to export yet.');
      return;
    }

    if (format === 'json') {
      services.reportExportService.exportJson(runner.reportEntries);
    } else {
      services.reportExportService.exportCsv(runner.reportEntries);
    }

    notifications.pushNotification('success', `Exported the migration report as ${format.toUpperCase()}.`);
  }, [runner.reportEntries, services.reportExportService, notifications]);

  const source = React.useMemo<SiteSlotViewModel>(() => ({
    options: siteSearch.source.options,
    recentSites: siteSearch.source.recentSites,
    isSearching: siteSearch.source.isSearching,
    selectedSite: sourceSite,
    search: siteSearch.source.search,
    select: setSourceSite
  }), [siteSearch.source, sourceSite, setSourceSite]);

  const target = React.useMemo<SiteSlotViewModel>(() => ({
    options: siteSearch.target.options,
    recentSites: siteSearch.target.recentSites,
    isSearching: siteSearch.target.isSearching,
    selectedSite: targetSite,
    search: siteSearch.target.search,
    select: setTargetSite
  }), [siteSearch.target, targetSite, setTargetSite]);

  const inventory = React.useMemo<InventoryViewModel>(() => ({
    pages: selection.pages,
    visiblePages: selection.visiblePages,
    groups: selection.groups,
    selectedPageIds: selection.selectedPageIds,
    filterText: selection.filterText,
    sortColumn: selection.sortColumn,
    sortDescending: selection.sortDescending,
    groupBy: selection.groupBy,
    visibleColumns: selection.visibleColumns,
    isLoading: isLoadingPages,
    isIncomplete: isInventoryIncomplete,
    checkedOutCount: selection.pages.filter((page) => !!page.checkedOutBy).length,
    selectedCommentCount: selection.pages
      .filter((page) => selection.selectedPageIds.has(page.id))
      .reduce((total, page) => total + (page.commentCount ?? 0), 0),
    previouslyMigratedCount: countPreviouslyMigrated(selection.pages, history),
    setFilterText: selection.setFilterText,
    setSelectedPageIds: selection.setSelectedPageIds,
    togglePageSelected: selection.togglePageSelected,
    setSorting: selection.setSorting,
    setGroupBy: selection.setGroupBy,
    toggleColumnVisibility: selection.toggleColumnVisibility,
    selectAllVisible: selection.selectAllVisible,
    clearSelection: selection.clearSelection
  }), [selection, isLoadingPages, isInventoryIncomplete, history]);

  const run = React.useMemo<RunViewModel>(() => ({
    isValidating: runner.isValidating,
    isMigrating: runner.isMigrating,
    isBusy: runner.isBusy || isLoadingPages,
    progress: runner.progress,
    reportEntries: runner.reportEntries,
    publishOnComplete,
    conflictMode,
    validations,
    setPublishOnComplete,
    setConflictMode,
    validateSelected,
    planSelected,
    migrateSelected,
    cancelRun: runner.cancelRun,
    exportReport,
    failedCount: failedPageIds.length,
    selectFailed,
    needingMigrationCount: pageIdsNeedingMigration.length,
    selectNeedingMigration
  }), [
    runner, isLoadingPages, publishOnComplete, conflictMode, validations,
    validateSelected, planSelected, migrateSelected, exportReport, failedPageIds.length, selectFailed,
    pageIdsNeedingMigration.length, selectNeedingMigration
  ]);

  const detail = React.useMemo(() => ({
    page: detailPageId ? selection.pageDetailsById[detailPageId] : undefined,
    pageId: detailPageId,
    isLoading: isLoadingDetail,
    open: openDetail,
    close: closeDetail
  }), [detailPageId, selection.pageDetailsById, isLoadingDetail, openDetail, closeDetail]);

  return {
    source,
    target,
    inventory,
    run,
    detail,
    notifications: notifications.notifications,
    pushNotification: notifications.pushNotification,
    dismissNotification: notifications.dismissNotification,
    loadPages,
    refreshPages,
    validatePage
  };
};

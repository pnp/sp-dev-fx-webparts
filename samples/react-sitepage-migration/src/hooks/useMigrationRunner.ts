import * as React from 'react';
import { PageInventoryItem } from '../models/PageInventoryItem';
import { idleProgress, MigrationProgressSnapshot, PageMigrationReportEntry } from '../models/MigrationReport';
import { MigrationContext } from '../models/OperationalTypes';
import { summarizeRun } from '../models/RunSummary';
import { MigrationCancellationToken } from '../utilities/CancellationToken';
import { toMessage } from '../utilities/ErrorSerialization';
import { OperationCancelledError } from '../utilities/RetryHelper';
import { Logger } from '../services/logging/Logger';
import { PageMigrationOrchestrator } from '../services/migration/PageMigrationOrchestrator';
import { SharePointReportStorageService } from '../services/reporting/SharePointReportStorageService';
import { UseNotificationsResult } from './useNotifications';

export type UpdatePageStatusFn = (
  pageId: string,
  status: PageInventoryItem['migrationStatus'],
  targetPageUrl?: string,
  warningCount?: number
) => void;

export interface UseMigrationRunnerResult {
  readonly isValidating: boolean;
  readonly isMigrating: boolean;
  readonly isBusy: boolean;
  readonly reportEntries: ReadonlyArray<PageMigrationReportEntry>;
  readonly progress: MigrationProgressSnapshot;
  readonly validatePages: (
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    updatePageStatus: UpdatePageStatusFn
  ) => Promise<void>;
  readonly migratePages: (
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    updatePageStatus: UpdatePageStatusFn
  ) => Promise<ReadonlyArray<PageMigrationReportEntry>>;
  readonly cancelRun: () => void;
  readonly setProgress: React.Dispatch<React.SetStateAction<MigrationProgressSnapshot>>;
  readonly setReportEntries: React.Dispatch<React.SetStateAction<ReadonlyArray<PageMigrationReportEntry>>>;
}

const PROGRESS_FRAME_MS = 100;

export const useMigrationRunner = (
  orchestrator: PageMigrationOrchestrator,
  reportStorageService: SharePointReportStorageService,
  logger: Logger,
  notifications: UseNotificationsResult,
  isMountedRef: React.MutableRefObject<boolean>
): UseMigrationRunnerResult => {
  const [isValidating, setIsValidating] = React.useState(false);
  const [isMigrating, setIsMigrating] = React.useState(false);
  const [reportEntries, setReportEntries] = React.useState<ReadonlyArray<PageMigrationReportEntry>>([]);
  const [progress, setProgress] = React.useState<MigrationProgressSnapshot>(idleProgress);

  const cancellationTokenRef = React.useRef<MigrationCancellationToken | undefined>();
  const pendingProgressRef = React.useRef<MigrationProgressSnapshot | undefined>();
  const progressTimerRef = React.useRef<number | undefined>();

  const flushProgress = React.useCallback(() => {
    progressTimerRef.current = undefined;
    const pending = pendingProgressRef.current;
    pendingProgressRef.current = undefined;
    if (pending && isMountedRef.current) {
      setProgress(pending);
    }
  }, [isMountedRef]);

  const scheduleProgress = React.useCallback((snapshot: MigrationProgressSnapshot) => {
    pendingProgressRef.current = snapshot;
    if (progressTimerRef.current === undefined) {
      progressTimerRef.current = window.setTimeout(flushProgress, PROGRESS_FRAME_MS);
    }
  }, [flushProgress]);

  React.useEffect(() => () => {
    if (progressTimerRef.current !== undefined) {
      window.clearTimeout(progressTimerRef.current);
    }
  }, []);

  const validatePages = React.useCallback(async (
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    updatePageStatus: UpdatePageStatusFn
  ) => {
    const token = new MigrationCancellationToken();
    cancellationTokenRef.current = token;
    setIsValidating(true);

    try {
      const results = await orchestrator.validatePages(context, pages, token, {
        onProgress: scheduleProgress,
        onPageStatusChange: updatePageStatus
      });

      if (!isMountedRef.current) {
        return;
      }

      const failures = results.filter((result) => result.status === 'Failed');
      const failed = failures.length;
      const withWarnings = results.filter((result) => result.warnings.length > 0).length;

      if (failed > 0) {
        const firstError = failures[0]?.errors[0];
        notifications.pushNotification(
          'error',
          `Validated ${results.length.toString()} page(s); ${failed.toString()} could not be read.`
          + (firstError ? ` First error: ${firstError}` : '')
        );
      } else if (withWarnings > 0) {
        notifications.pushNotification('warning', `Validated ${results.length.toString()} page(s); ${withWarnings.toString()} need review.`);
      } else {
        notifications.pushNotification('success', `Validated ${results.length.toString()} page(s). All ready to migrate.`);
      }
    } catch (error) {
      if (isMountedRef.current && !(error instanceof OperationCancelledError)) {
        notifications.pushNotification('error', toMessage(error, 'Page validation failed.'));
      }
    } finally {
      flushProgress();
      if (isMountedRef.current) {
        setIsValidating(false);
      }
      cancellationTokenRef.current = undefined;
    }
  }, [orchestrator, notifications, isMountedRef, scheduleProgress, flushProgress]);

  const persistRun = React.useCallback(async (
    context: MigrationContext,
    reports: ReadonlyArray<PageMigrationReportEntry>
  ): Promise<void> => {
    try {
      const persistedRun = await reportStorageService.persistRun(context, reports);
      if (!persistedRun || !isMountedRef.current) {
        return;
      }

      notifications.pushNotification(
        'success',
        `Run ${persistedRun.runId} saved: ${persistedRun.reportItemsStored.toString()} audit row(s), ` +
        `${persistedRun.logItemsStored.toString()} log row(s).`,
        { href: persistedRun.jsonReportUrl, label: 'Open report' }
      );

      if (persistedRun.warningMessage) {
        notifications.pushNotification(
          'warning',
          `Report files were saved, but list persistence failed: ${persistedRun.warningMessage}`
        );
      }
    } catch (storageError) {
      if (isMountedRef.current) {
        notifications.pushNotification(
          'warning',
          `Migration finished, but the report could not be saved: ${toMessage(storageError, 'unknown error')}`
        );
      }
    }
  }, [reportStorageService, notifications, isMountedRef]);

  const migratePages = React.useCallback(async (
    context: MigrationContext,
    pages: ReadonlyArray<PageInventoryItem>,
    updatePageStatus: UpdatePageStatusFn
  ): Promise<ReadonlyArray<PageMigrationReportEntry>> => {
    const token = new MigrationCancellationToken();
    cancellationTokenRef.current = token;
    setIsMigrating(true);

    try {
      const result = await orchestrator.migratePages(context, pages, token, {
        onProgress: scheduleProgress,
        onPageStatusChange: updatePageStatus
      });

      logger.info('Run finished.', {
        dryRun: !!context.dryRun,
        cancelled: result.cancelled,
        summary: summarizeRun(result.reports)
      });

      if (!isMountedRef.current) {
        return result.reports;
      }

      setReportEntries((previous) => [...result.reports, ...previous]);

      const failures = result.reports.filter((report) => report.finalStatus === 'Failed');
      const failed = failures.length;
      const skipped = result.reports.filter((report) => report.finalStatus === 'Skipped').length;
      const migrated = result.reports.length - failed - skipped;

      if (context.dryRun) {
        const planned = result.reports.filter((report) => report.finalStatus === 'Planned').length;
        const withWarnings = result.reports.filter((report) => report.warnings.length > 0).length;
        notifications.pushNotification(
          failed > 0 ? 'warning' : 'success',
          `Dry run: ${planned.toString()} page(s) would be migrated`
          + (withWarnings > 0 ? `, ${withWarnings.toString()} with warnings` : '')
          + (failed > 0 ? `, ${failed.toString()} could not be read` : '')
          + '. Nothing was written — export the report to review it.'
        );

        return result.reports;
      }

      if (result.cancelled) {
        notifications.pushNotification('warning', 'Migration cancelled. Pages already migrated were not rolled back.');
      } else if (failed > 0) {
        const firstError = failures[0]?.errors[0];
        notifications.pushNotification(
          'error',
          `Migrated ${migrated.toString()} of ${result.reports.length.toString()} page(s); `
          + `${failed.toString()} failed`
          + (skipped > 0 ? `, ${skipped.toString()} skipped` : '') + '.'
          + (firstError ? ` First error: ${firstError}` : '')
        );
      } else if (skipped > 0) {
        notifications.pushNotification(
          'warning',
          `Migrated ${migrated.toString()} page(s); ${skipped.toString()} left untouched because they already existed.`
        );
      } else {
        notifications.pushNotification('success', `Migrated ${migrated.toString()} page(s).`);
      }

      await persistRun(context, result.reports);
      return result.reports;
    } catch (error) {
      if (isMountedRef.current && !(error instanceof OperationCancelledError)) {
        notifications.pushNotification('error', toMessage(error, 'Migration failed.'));
      }
    } finally {
      flushProgress();
      if (isMountedRef.current) {
        setIsMigrating(false);
      }
      cancellationTokenRef.current = undefined;
    }

    return [];
  }, [orchestrator, persistRun, logger, notifications, isMountedRef, scheduleProgress, flushProgress]);

  const cancelRun = React.useCallback(() => {
    if (!cancellationTokenRef.current) {
      return;
    }
    cancellationTokenRef.current.cancel();
    notifications.pushNotification('warning', 'Cancelling after the current page finishes…');
  }, [notifications]);

  return {
    isValidating,
    isMigrating,
    isBusy: isValidating || isMigrating,
    reportEntries,
    progress,
    validatePages,
    migratePages,
    cancelRun,
    setProgress,
    setReportEntries
  };
};

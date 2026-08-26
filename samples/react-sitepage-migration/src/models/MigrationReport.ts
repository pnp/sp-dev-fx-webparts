import { CompatibilityLevel, MigrationWarning } from './NormalizedPage';

export type MigrationFinalStatus =
  | 'Completed'
  | 'CompletedWithWarnings'
  | 'Failed'
  | 'Cancelled'
  | 'Skipped'
  | 'Planned';

export type AssetCopyStatus = 'Copied' | 'Replaced' | 'Reused' | 'Skipped' | 'Failed' | 'Planned';

export const durableFinalStatuses: ReadonlySet<MigrationFinalStatus> =
  new Set<MigrationFinalStatus>(['Completed', 'CompletedWithWarnings', 'Skipped']);

export interface AssetCopyResult {
  readonly sourceUrl: string;
  readonly targetUrl?: string;
  readonly fileName: string;
  readonly status: AssetCopyStatus;
  readonly message?: string;
  readonly sourceUniqueId?: string;
  readonly targetUniqueId?: string;
}

export const successfulAssetStatuses: ReadonlySet<AssetCopyStatus> =
  new Set<AssetCopyStatus>(['Copied', 'Replaced', 'Reused']);

export interface UnsupportedWebPartReportItem {
  readonly webPartId: string;
  readonly title?: string;
  readonly compatibility: CompatibilityLevel;
  readonly serializedConfiguration: string;
}

export interface PageMigrationReportEntry {
  readonly pageId: string;
  readonly pageName: string;
  readonly sourcePageUrl: string;
  readonly targetPageUrl?: string;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly durationMs?: number;
  readonly finalStatus: MigrationFinalStatus;
  readonly assets: ReadonlyArray<AssetCopyResult>;
  readonly unsupportedWebParts: ReadonlyArray<UnsupportedWebPartReportItem>;
  readonly warnings: ReadonlyArray<MigrationWarning>;
  readonly errors: ReadonlyArray<string>;
}

export interface MigrationProgressSnapshot {
  readonly totalPages: number;
  readonly processedPages: number;
  readonly currentPageName?: string;
  readonly percentComplete: number;
  readonly phase: ProgressPhase;
  readonly detail?: string;
}

export type ProgressPhase =
  | 'Idle'
  | 'LoadingPages'
  | 'PagesLoaded'
  | 'Validating'
  | 'ValidationComplete'
  | 'ResolvingTargets'
  | 'Migrating'
  | 'MigrationComplete'
  | 'MigrationCancelled'
  | 'Planning'
  | 'DryRunComplete';

export const idleProgress: MigrationProgressSnapshot = {
  totalPages: 0,
  processedPages: 0,
  percentComplete: 0,
  phase: 'Idle'
};

import { NormalizedPage } from './NormalizedPage';
import { PageInventoryItem, PageMigrationStatus } from './PageInventoryItem';
import { PageMigrationReportEntry } from './MigrationReport';
import { SiteReference } from './SiteReference';

export type SiteAccessLevel = 'SourceRead' | 'TargetWrite' | 'ReportStorage';

export type ValidationCheckCode =
  | 'user.resolve'
  | 'web.permissions'
  | 'web.open'
  | 'sitePages.reachable'
  | 'sitePages.read'
  | 'sitePages.write'
  | 'siteAssets.reachable'
  | 'siteAssets.read'
  | 'siteAssets.write'
  | 'reports.manageLists'
  | 'reports.write';

export interface ValidationCheck {
  readonly code: ValidationCheckCode;
  readonly passed: boolean;
  readonly severity: 'blocking' | 'advisory';
  readonly detail?: string;
}

export interface SitePermissionValidationResult {
  readonly siteUrl: string;
  readonly accessLevel: SiteAccessLevel;
  readonly isValid: boolean;
  readonly checks: ReadonlyArray<ValidationCheck>;
}

export interface PageValidationResult {
  readonly page: PageInventoryItem;
  readonly normalizedPage?: NormalizedPage;
  readonly status: PageMigrationStatus;
  readonly warnings: ReadonlyArray<string>;
  readonly errors: ReadonlyArray<string>;
}

export interface MigrationContext {
  readonly sourceSite: SiteReference;
  readonly targetSite: SiteReference;
  readonly publishOnComplete: boolean;
  readonly overwriteMode: ConflictMode;
  readonly persistence: MigrationPersistenceSettings;
  readonly dryRun?: boolean;
}

export type ConflictMode = 'Rename' | 'Replace' | 'Skip' | 'Fail';

export interface MigrationPersistenceSettings {
  readonly persistReports: boolean;
  readonly reportStorageSiteUrl?: string;
  readonly auditListName: string;
  readonly logListName: string;
}

export interface MigrationRunResult {
  readonly reports: ReadonlyArray<PageMigrationReportEntry>;
  readonly cancelled: boolean;
}

export interface EnumerationResult<T> {
  readonly items: ReadonlyArray<T>;
  readonly isComplete: boolean;
  readonly error?: string;
}

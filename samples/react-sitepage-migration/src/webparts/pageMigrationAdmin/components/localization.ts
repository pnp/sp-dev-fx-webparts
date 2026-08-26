import { CompatibilityLevel, MigrationWarning } from '../../../models/NormalizedPage';
import { ProgressPhase } from '../../../models/MigrationReport';
import { PageMigrationStatus } from '../../../models/PageInventoryItem';
import { ConflictMode, SiteAccessLevel, ValidationCheckCode } from '../../../models/OperationalTypes';
import * as strings from 'PageMigrationAdminWebPartStrings';

export const statusLabel = (status: PageMigrationStatus): string => {
  switch (status) {
    case 'NotStarted': return strings.StatusNotStarted;
    case 'Queued': return strings.StatusQueued;
    case 'Validating': return strings.StatusValidating;
    case 'Ready': return strings.StatusReady;
    case 'Migrating': return strings.StatusMigrating;
    case 'Completed': return strings.StatusCompleted;
    case 'Warning': return strings.StatusWarning;
    case 'Failed': return strings.StatusFailed;
    default: return status;
  }
};

export const progressLabel = (phase: ProgressPhase): string => {
  switch (phase) {
    case 'Idle': return strings.ProgressIdle;
    case 'LoadingPages': return strings.ProgressLoadingPages;
    case 'PagesLoaded': return strings.ProgressPagesLoaded;
    case 'Validating': return strings.ProgressValidating;
    case 'ValidationComplete': return strings.ProgressValidationComplete;
    case 'ResolvingTargets': return strings.ProgressResolvingTargets;
    case 'Migrating': return strings.ProgressMigrating;
    case 'MigrationComplete': return strings.ProgressMigrationComplete;
    case 'MigrationCancelled': return strings.ProgressMigrationCancelled;
    case 'Planning': return strings.ProgressPlanning;
    case 'DryRunComplete': return strings.ProgressDryRunComplete;
    default: return strings.ProgressIdle;
  }
};

export const conflictModeLabel = (mode: ConflictMode): string => {
  switch (mode) {
    case 'Rename': return strings.ConflictRenameOption;
    case 'Replace': return strings.ConflictReplaceOption;
    case 'Skip': return strings.ConflictSkipOption;
    case 'Fail': return strings.ConflictFailOption;
    default: return mode;
  }
};

export const conflictModeDescription = (mode: ConflictMode): string => {
  switch (mode) {
    case 'Rename': return strings.ConflictRenameDescription;
    case 'Replace': return strings.ConflictReplaceDescription;
    case 'Skip': return strings.ConflictSkipDescription;
    case 'Fail': return strings.ConflictFailDescription;
    default: return '';
  }
};

export const compatibilityLabel = (level: CompatibilityLevel): string => {
  switch (level) {
    case 'FullySupported': return strings.CompatibilityFullySupported;
    case 'PartiallySupported': return strings.CompatibilityPartiallySupported;
    case 'Unsupported': return strings.CompatibilityUnsupported;
    default: return level;
  }
};

export const validationCheckLabel = (code: ValidationCheckCode): string => {
  switch (code) {
    case 'user.resolve': return strings.CheckUserResolve;
    case 'web.permissions': return strings.CheckWebPermissions;
    case 'web.open': return strings.CheckWebOpen;
    case 'sitePages.reachable': return strings.CheckSitePagesReachable;
    case 'sitePages.read': return strings.CheckSitePagesRead;
    case 'sitePages.write': return strings.CheckSitePagesWrite;
    case 'siteAssets.reachable': return strings.CheckSiteAssetsReachable;
    case 'siteAssets.read': return strings.CheckSiteAssetsRead;
    case 'siteAssets.write': return strings.CheckSiteAssetsWrite;
    case 'reports.manageLists': return strings.CheckReportsManageLists;
    case 'reports.write': return strings.CheckReportsWrite;
    default: return code;
  }
};

export const accessLevelLabel = (level: SiteAccessLevel): string => {
  switch (level) {
    case 'SourceRead': return strings.ValidationSourceLabel;
    case 'TargetWrite': return strings.ValidationTargetLabel;
    case 'ReportStorage': return strings.ValidationStorageLabel;
    default: return level;
  }
};

export const warningMessage = (warning: MigrationWarning): string => {
  switch (warning.code) {
    case 'Canvas.Empty': return strings.WarningCanvasEmpty;
    default: return warning.message;
  }
};

export const formatDateTime = (value: string | undefined): string => {
  if (!value) {
    return strings.UnknownValue;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

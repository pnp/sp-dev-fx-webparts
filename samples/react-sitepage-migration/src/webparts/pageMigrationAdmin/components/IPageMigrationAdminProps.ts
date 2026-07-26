import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { PageMigrationServices } from '../../../hooks/usePageMigrationViewModel';
import { ConflictMode } from '../../../models/OperationalTypes';

export interface IPageMigrationAdminProps {
  readonly services: PageMigrationServices;
  readonly themeVariant?: IReadonlyTheme;
  readonly storageScope: string;
  readonly defaultPublishOnComplete: boolean;
  readonly defaultConflictMode: ConflictMode;
  readonly persistReports: boolean;
  readonly includePageTemplates: boolean;
  readonly reportStorageSiteUrl: string;
  readonly auditListName: string;
  readonly logListName: string;
}

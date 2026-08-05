export type PageMigrationStatus =
  | 'NotStarted'
  | 'Queued'
  | 'Validating'
  | 'Ready'
  | 'Migrating'
  | 'Completed'
  | 'Warning'
  | 'Failed';

export interface PageInventoryItem {
  readonly key: string;
  readonly id: string;
  readonly pageId: string;
  readonly title: string;
  readonly name: string;
  readonly webUrl: string;
  readonly authorName: string;
  readonly authorEmail?: string;
  readonly createdDateTime: string;
  readonly lastModifiedDateTime: string;
  readonly layout: string;
  readonly promotionState: string;
  readonly checkedOutBy?: string;
  readonly checkedOutByEmail?: string;
  readonly publishingLevel?: string;
  readonly commentCount?: number;
  readonly isTemplate?: boolean;
  readonly migrationStatus: PageMigrationStatus;
  readonly warningCount: number;
  readonly targetPageUrl?: string;
  readonly lastMigratedAt?: string;
}

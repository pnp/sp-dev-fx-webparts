import {
  MigrationContext,
  SiteAccessLevel,
  SitePermissionValidationResult
} from '../../models/OperationalTypes';
import { RetryOptions } from '../../utilities/RetryHelper';
import { PageAuthor, RawPageData } from './pageMapping';

export interface FileInfo {
  readonly Exists?: boolean;
  readonly ServerRelativeUrl?: string;
  readonly Name?: string;
  readonly Length?: string | number;
  readonly UniqueId?: string;
}

export interface SiteIdentifiers {
  readonly siteId: string;
  readonly webId: string;
  readonly siteAssetsListId?: string;
}

export interface ListFieldDefinition {
  readonly kind: 'Text' | 'Note' | 'DateTime' | 'Number';
  readonly title: string;
  readonly properties?: Record<string, unknown>;
}

export interface TargetPageHandle {
  readonly pagePath: string;
  readonly pageUrl: string;
  readonly pageName: string;
  readonly wasCreated: boolean;
  readonly skipped: boolean;
}

export interface PageCanvasPayload {
  readonly title: string;
  readonly description?: string;
  readonly topicHeader?: string;
  readonly bannerImageUrl?: string;
  readonly thumbnailUrl?: string;
  readonly canvasContent1: string;
  readonly layoutWebpartsContent?: string;
  readonly pageLayoutType?: string;
  readonly promotedState?: string;
  readonly firstPublishedDate?: string;
  readonly carriedFields?: Readonly<Record<string, unknown>>;
}

export interface ListQueryOptions {
  readonly filter?: string;
  readonly select?: ReadonlyArray<string>;
  readonly orderByDescending?: string;
  readonly top?: number;
}

export interface ISharePointPageService {
  validateSiteAccess(
    siteUrl: string,
    accessLevel: Exclude<SiteAccessLevel, 'ReportStorage'>
  ): Promise<SitePermissionValidationResult>;
  validateReportStorageAccess(siteUrl: string): Promise<SitePermissionValidationResult>;

  loadPage(
    siteUrl: string,
    pageUrl: string,
    options?: RetryOptions,
    author?: PageAuthor
  ): Promise<RawPageData>;
  createOrLoadTargetPage(
    context: MigrationContext,
    pageName: string,
    folderPath?: string
  ): Promise<TargetPageHandle>;
  updatePageCanvas(siteUrl: string, pagePath: string, payload: PageCanvasPayload): Promise<void>;
  publishPage(siteUrl: string, pagePath: string, comment: string): Promise<void>;

  ensureMigrationAssetFolder(siteUrl: string, folderName: string): Promise<string>;
  ensureFolderPath(siteUrl: string, folderPath: string): Promise<string>;
  uploadAsset(
    siteUrl: string,
    folderPath: string,
    fileName: string,
    content: ArrayBuffer | string,
    overwrite: boolean
  ): Promise<{ readonly url: string; readonly uniqueId?: string }>;
  uploadTextAsset(
    siteUrl: string,
    folderPath: string,
    fileName: string,
    content: string,
    overwrite: boolean
  ): Promise<string>;
  tryGetFileInfo(siteUrl: string, serverRelativePath: string): Promise<FileInfo | undefined>;
  fileExists(siteUrl: string, serverRelativePath: string): Promise<boolean>;
  deleteFile(siteUrl: string, serverRelativePath: string): Promise<void>;
  downloadBinary(assetUrl: string, expectedOrigin: string): Promise<ArrayBuffer>;

  getSiteIdentifiers(siteUrl: string): Promise<SiteIdentifiers | undefined>;
  ensureList(
    siteUrl: string,
    listTitle: string,
    description: string,
    fieldDefinitions: ReadonlyArray<ListFieldDefinition>
  ): Promise<void>;
  ensureIndexedFields(
    siteUrl: string,
    listTitle: string,
    fieldNames: ReadonlyArray<string>
  ): Promise<void>;
  getListItems<T>(
    siteUrl: string,
    listTitle: string,
    options?: ListQueryOptions
  ): Promise<ReadonlyArray<T>>;
  addListItemsBatch(
    siteUrl: string,
    listTitle: string,
    items: ReadonlyArray<Record<string, unknown>>
  ): Promise<number>;
}

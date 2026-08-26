import {
  MigrationContext,
  SiteAccessLevel,
  SitePermissionValidationResult
} from '../../models/OperationalTypes';
import {
  normalizePageName,
  sitePagesSubfolder,
  toAbsoluteUrl,
  toDecodedServerRelativePath,
  toServerRelativePath
} from '../../utilities/UrlUtilities';
import {
  FileInfo,
  ISharePointPageService,
  ListFieldDefinition,
  ListQueryOptions,
  PageCanvasPayload,
  SiteIdentifiers,
  TargetPageHandle
} from './ISharePointPageService';
import { PageAuthor, RawPageData } from './pageMapping';

export interface FakeSitePage {
  readonly canvasContent1?: string;
  readonly layoutWebpartsContent?: string;
  readonly title?: string;
  readonly promotedState?: string;
  readonly firstPublishedDate?: string;
  readonly carriedFields?: Readonly<Record<string, unknown>>;
}

export interface FakeOptions {
  readonly hasSiteAssets?: boolean;
  readonly rejectCanvasFor?: ReadonlySet<string>;
  readonly silentlyDropCanvasFor?: ReadonlySet<string>;
  readonly identifiers?: Readonly<Record<string, SiteIdentifiers>>;
}

export class FakeSharePointPageService implements ISharePointPageService {
  public readonly folders = new Set<string>();
  public readonly files = new Map<string, { readonly content: string; readonly uniqueId: string }>();
  public readonly pages = new Map<string, FakeSitePage>();
  public readonly listItems = new Map<string, Record<string, unknown>[]>();
  public readonly indexedFields = new Map<string, Set<string>>();
  public readonly listFields = new Map<string, Map<string, ListFieldDefinition['kind']>>();
  public readonly published: string[] = [];
  public destinationFields = new Set<string>([
    '_commentsdisabled', '_originalsourceurl', '_originalsourcesiteid',
    '_originalsourcewebid', '_originalsourcelistid', '_originalsourceitemid'
  ]);
  public readonly deleted: string[] = [];

  private readonly _options: FakeOptions;
  private _uniqueIdSeed = 0;

  public constructor(options: FakeOptions = {}) {
    this._options = options;
    if (options.hasSiteAssets !== false) {
      this.folders.add('/sites/target/SiteAssets');
      this.folders.add('/sites/source/SiteAssets');
    }
  }

  public addSourcePage(pagePath: string, page: FakeSitePage = {}): void {
    this.pages.set(pagePath.toLowerCase(), page);
    this.files.set(pagePath.toLowerCase(), { content: '', uniqueId: this.nextUniqueId() });
  }

  public async validateSiteAccess(
    siteUrl: string,
    accessLevel: Exclude<SiteAccessLevel, 'ReportStorage'>
  ): Promise<SitePermissionValidationResult> {
    return { siteUrl, accessLevel, isValid: true, checks: [] };
  }

  public async validateReportStorageAccess(siteUrl: string): Promise<SitePermissionValidationResult> {
    return { siteUrl, accessLevel: 'ReportStorage', isValid: true, checks: [] };
  }

  public async loadPage(
    siteUrl: string,
    pageUrl: string,
    _options?: unknown,
    author?: PageAuthor
  ): Promise<RawPageData> {
    const pagePath = toDecodedServerRelativePath(pageUrl);
    const page = this.pages.get(pagePath.toLowerCase());

    if (!page) {
      throw Object.assign(new Error(`File not found: ${pagePath}`), { status: 404 });
    }

    const fileName = pagePath.split('/').filter(Boolean).pop() ?? '';
    return {
      pageId: '1',
      title: page.title ?? fileName.replace(/\.aspx$/i, ''),
      pageName: normalizePageName(fileName),
      pageUrl,
      pagePath,
      canvasContent1: page.canvasContent1 ?? '',
      folderPath: sitePagesSubfolder(pagePath),
      layoutWebpartsContent: page.layoutWebpartsContent,
      promotedState: page.promotedState,
      firstPublishedDate: page.firstPublishedDate,
      carriedFields: page.carriedFields,
      authorName: author?.name,
      authorEmail: author?.email
    };
  }

  public async createOrLoadTargetPage(
    context: MigrationContext,
    pageName: string,
    folderPath = ''
  ): Promise<TargetPageHandle> {
    const targetSiteUrl = context.targetSite.webUrl;
    const segments = folderPath.split('/').filter(Boolean);
    let resolvedName = normalizePageName(pageName);
    let pagePath = toServerRelativePath(targetSiteUrl, 'SitePages', ...segments, resolvedName);

    if (this.files.has(pagePath.toLowerCase())) {
      if (context.overwriteMode === 'Fail') {
        throw new Error(`Target page '${resolvedName}' already exists.`);
      }
      if (context.overwriteMode === 'Skip') {
        return {
          pagePath, pageUrl: toAbsoluteUrl(targetSiteUrl, pagePath),
          pageName: resolvedName, wasCreated: false, skipped: true
        };
      }
      if (context.overwriteMode === 'Rename') {
        for (let suffix = 1; suffix <= 50; suffix += 1) {
          const candidate = normalizePageName(`${resolvedName.replace(/\.aspx$/i, '')}-${suffix.toString()}`);
          const candidatePath = toServerRelativePath(targetSiteUrl, 'SitePages', ...segments, candidate);
          if (!this.files.has(candidatePath.toLowerCase())) {
            resolvedName = candidate;
            pagePath = candidatePath;
            break;
          }
        }
      } else {
        return {
          pagePath, pageUrl: toAbsoluteUrl(targetSiteUrl, pagePath),
          pageName: resolvedName, wasCreated: false, skipped: false
        };
      }
    }

    if (context.dryRun) {
      return {
        pagePath, pageUrl: toAbsoluteUrl(targetSiteUrl, pagePath),
        pageName: resolvedName, wasCreated: false, skipped: false
      };
    }

    this.files.set(pagePath.toLowerCase(), { content: '', uniqueId: this.nextUniqueId() });
    this.pages.set(pagePath.toLowerCase(), {});

    return {
      pagePath, pageUrl: toAbsoluteUrl(targetSiteUrl, pagePath),
      pageName: resolvedName, wasCreated: true, skipped: false
    };
  }

  public async updatePageCanvas(
    _siteUrl: string,
    pagePath: string,
    payload: PageCanvasPayload
  ): Promise<void> {
    if (this._options.rejectCanvasFor?.has(pagePath)) {
      throw Object.assign(new Error('Canvas update rejected.'), { status: 400 });
    }

    if (this._options.silentlyDropCanvasFor?.has(pagePath)) {
      this.pages.set(pagePath.toLowerCase(), { title: payload.title });
      throw new Error(`The canvas for '${pagePath}' was accepted but not stored.`);
    }

    this.pages.set(pagePath.toLowerCase(), {
      canvasContent1: payload.canvasContent1,
      layoutWebpartsContent: payload.layoutWebpartsContent,
      title: payload.title,
      promotedState: payload.promotedState,
      firstPublishedDate: payload.firstPublishedDate,
      carriedFields: Object.fromEntries(
        Object.entries(payload.carriedFields ?? {})
          .filter(([name]) => this.destinationFields.has(name.toLowerCase()))
      )
    });
  }

  public async publishPage(_siteUrl: string, pagePath: string): Promise<void> {
    this.published.push(pagePath);
  }

  public async ensureMigrationAssetFolder(siteUrl: string, folderName: string): Promise<string> {
    return this.ensureFolderPath(siteUrl, toServerRelativePath(siteUrl, 'SiteAssets', 'SitePages', folderName));
  }

  public async ensureFolderPath(siteUrl: string, folderPath: string): Promise<string> {
    const segments = folderPath.split('/').filter(Boolean);
    const sitePath = toServerRelativePath(siteUrl).replace(/\/$/, '');
    const libraryPath = `${sitePath}/${segments[segments.indexOf('SiteAssets')]}`;

    if (!this.folders.has(libraryPath)) {
      throw new Error(`The SiteAssets library does not exist in ${siteUrl}.`);
    }

    let current = libraryPath;
    for (const segment of segments.slice(segments.indexOf('SiteAssets') + 1)) {
      current = `${current}/${segment}`;
      this.folders.add(current);
    }
    return folderPath;
  }

  public async uploadAsset(
    siteUrl: string,
    folderPath: string,
    fileName: string,
    content: ArrayBuffer | string,
    overwrite: boolean
  ): Promise<{ url: string; uniqueId?: string }> {
    const path = `${folderPath}/${fileName}`;
    if (this.files.has(path.toLowerCase()) && !overwrite) {
      throw Object.assign(new Error('File already exists.'), { status: 400 });
    }

    const uniqueId = this.nextUniqueId();
    this.files.set(path.toLowerCase(), {
      content: typeof content === 'string' ? content : `[${content.byteLength.toString()} bytes]`,
      uniqueId
    });
    return { url: toAbsoluteUrl(siteUrl, path), uniqueId };
  }

  public async uploadTextAsset(
    siteUrl: string, folderPath: string, fileName: string, content: string, overwrite: boolean
  ): Promise<string> {
    return (await this.uploadAsset(siteUrl, folderPath, fileName, content, overwrite)).url;
  }

  public async tryGetFileInfo(_siteUrl: string, serverRelativePath: string): Promise<FileInfo | undefined> {
    const file = this.files.get(serverRelativePath.toLowerCase());
    return file ? { Exists: true, ServerRelativeUrl: serverRelativePath, UniqueId: file.uniqueId } : undefined;
  }

  public async fileExists(siteUrl: string, serverRelativePath: string): Promise<boolean> {
    return !!(await this.tryGetFileInfo(siteUrl, serverRelativePath));
  }

  public async deleteFile(_siteUrl: string, serverRelativePath: string): Promise<void> {
    this.files.delete(serverRelativePath.toLowerCase());
    this.pages.delete(serverRelativePath.toLowerCase());
    this.deleted.push(serverRelativePath);
  }

  public async downloadBinary(assetUrl: string, expectedOrigin: string): Promise<ArrayBuffer> {
    if (!assetUrl.toLowerCase().startsWith(expectedOrigin.toLowerCase())) {
      throw new Error(`Refusing to download '${assetUrl}': outside the source site origin.`);
    }
    return new ArrayBuffer(8);
  }

  public async getSiteIdentifiers(siteUrl: string): Promise<SiteIdentifiers | undefined> {
    return this._options.identifiers?.[siteUrl];
  }

  public async ensureList(
    siteUrl: string, listTitle: string, _description: string, fields: ReadonlyArray<ListFieldDefinition>
  ): Promise<void> {
    const key = `${siteUrl}|${listTitle}`;
    if (!this.listItems.has(key)) {
      this.listItems.set(key, []);
    }

    const schema = this.listFields.get(key) ?? new Map<string, ListFieldDefinition['kind']>();
    fields.forEach((field) => {
      if (!schema.has(field.title)) {
        schema.set(field.title, field.kind);
      }
    });
    this.listFields.set(key, schema);
  }

  public async ensureIndexedFields(
    siteUrl: string, listTitle: string, fieldNames: ReadonlyArray<string>
  ): Promise<void> {
    const key = `${siteUrl}|${listTitle}`;
    this.indexedFields.set(key, new Set([...(this.indexedFields.get(key) ?? []), ...fieldNames]));
  }

  public async getListItems<T>(
    siteUrl: string, listTitle: string, options?: ListQueryOptions
  ): Promise<ReadonlyArray<T>> {
    const key = `${siteUrl}|${listTitle}`;
    if (!this.listItems.has(key)) {
      throw Object.assign(new Error(`List '${listTitle}' does not exist.`), { status: 404 });
    }

    const rows = this.listItems.get(key) ?? [];
    const matches = options?.filter ? rows.filter((row) => this.matchesFilter(key, row, options.filter as string)) : rows;
    return matches.slice(0, options?.top ?? matches.length) as ReadonlyArray<T>;
  }

  private matchesFilter(listKey: string, row: Record<string, unknown>, filter: string): boolean {
    const schema = this.listFields.get(listKey);

    return filter.split(/\s+and\s+/i).every((clause) => {
      const match = /^\s*([A-Za-z0-9_]+)\s+eq\s+'(.*)'\s*$/.exec(clause);
      if (!match) {
        throw Object.assign(new Error(`Unsupported filter clause: ${clause}`), { status: 400 });
      }

      const [, field, rawValue] = match;
      if (schema?.get(field) === 'Note') {
        throw Object.assign(
          new Error(`The field '${field}' of type 'Note' cannot be used in a filter.`),
          { status: 400 }
        );
      }

      return row[field] === rawValue.replace(/''/g, "'");
    });
  }

  public async addListItemsBatch(
    siteUrl: string, listTitle: string, items: ReadonlyArray<Record<string, unknown>>
  ): Promise<number> {
    const key = `${siteUrl}|${listTitle}`;
    const existing = this.listItems.get(key) ?? [];
    this.listItems.set(key, [...existing, ...items]);
    return items.length;
  }

  private nextUniqueId(): string {
    this._uniqueIdSeed += 1;
    return `00000000-0000-0000-0000-${this._uniqueIdSeed.toString().padStart(12, '0')}`;
  }
}

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI } from '@pnp/sp';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import { IClientsidePage } from '@pnp/sp/clientside-pages';
import { CheckinType, TemplateFileType } from '@pnp/sp/files';
import { IWeb, Web } from '@pnp/sp/webs';
import '@pnp/sp/files';
import '@pnp/sp/files/web';
import '@pnp/sp/fields';
import '@pnp/sp/folders';
import '@pnp/sp/folders/web';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import '@pnp/sp/clientside-pages/web';
import '@pnp/sp/security/web';
import '@pnp/sp/security/list';
import '@pnp/sp/site-users/web';
import '@pnp/sp/sites';
import '@pnp/sp/batching';
import {
  ConflictMode,
  MigrationContext,
  SiteAccessLevel,
  SitePermissionValidationResult,
  ValidationCheck,
  ValidationCheckCode
} from '../../models/OperationalTypes';
import { HttpRequestError } from '../../utilities/HttpRequestError';
import { defaultRetryOptions, executeWithRetry, getErrorStatus, RetryOptions } from '../../utilities/RetryHelper';
import {
  isSameOrigin,
  normalizePageName,
  sitePagesPath,
  stripAspxExtension,
  toAbsoluteUrl,
  toDecodedServerRelativePath,
  toServerRelativePath,
  normalizeSlashes,
  toSitePath
} from '../../utilities/UrlUtilities';
import { toMessage } from '../../utilities/ErrorSerialization';
import { CheckoutState, decideCheckoutAction } from './checkoutPolicy';
import {
  FileInfo,
  ISharePointPageService,
  ListFieldDefinition,
  ListQueryOptions,
  PageCanvasPayload,
  SiteIdentifiers,
  TargetPageHandle
} from './ISharePointPageService';

export type {
  FileInfo,
  ISharePointPageService,
  ListFieldDefinition,
  SiteIdentifiers,
  TargetPageHandle
} from './ISharePointPageService';
import { Logger } from '../logging/Logger';
import {
  PageAuthor,
  PageFieldDefinition,
  PageListItemResponse,
  RawPageData,
  toRawPageData
} from './pageMapping';

export type { RawPageData, PageAuthor, PageListItemResponse, PageFieldDefinition } from './pageMapping';

interface PermissionsPayload {
  readonly High?: string | number;
  readonly Low?: string | number;
}

interface FieldInfoPayload {
  readonly InternalName: string;
  readonly TypeAsString?: string;
  readonly ReadOnlyField?: boolean;
  readonly Hidden?: boolean;
  readonly FromBaseType?: boolean;
  readonly CanBeDeleted?: boolean;
}

const SITE_PAGES_TEMPLATE = 119;
const SITE_ASSETS_TEMPLATE = 101;

const PROMOTED_STATE_NEWS = 2;

const SITE_PAGE_CONTENT_TYPE_ID = '0x0101009D1CB255DA76424F860D91F20E6C4118';
const MODERN_PAGES_APPLICATION_ID = 'b6917cb1-93a0-4b97-a84d-7cf49975d4ec';

const MAX_ASSET_BYTES = 100 * 1024 * 1024;

const CHUNKED_UPLOAD_THRESHOLD_BYTES = 4 * 1024 * 1024;

const UPLOAD_CHUNK_BYTES = 5 * 1024 * 1024;

const MAX_BATCH_SIZE = 90;

const check = (
  code: ValidationCheckCode,
  passed: boolean,
  severity: ValidationCheck['severity'] = 'blocking',
  detail?: string
): ValidationCheck => ({ code, passed, severity, detail });

export class SharePointPageService implements ISharePointPageService {
  private readonly _context: WebPartContext;
  private readonly _logger: Logger;
  private readonly _sp: SPFI;
  private readonly _webCache = new Map<string, IWeb>();
  private readonly _pageFieldCache = new Map<string, ReadonlyArray<PageFieldDefinition>>();
  private readonly _identifierCache = new Map<string, SiteIdentifiers>();

  public constructor(context: WebPartContext, logger: Logger) {
    this._context = context;
    this._logger = logger;
    this._sp = spfi().using(SPFx(context));
  }

  private web(siteUrl: string): IWeb {
    const key = siteUrl.replace(/\/$/, '').toLowerCase();
    let web = this._webCache.get(key);
    if (!web) {
      web = Web([this._sp.web, siteUrl]);
      this._webCache.set(key, web);
    }
    return web;
  }

  public async validateSiteAccess(
    siteUrl: string,
    accessLevel: Exclude<SiteAccessLevel, 'ReportStorage'>
  ): Promise<SitePermissionValidationResult> {
    const checks: ValidationCheck[] = [];
    const web = this.web(siteUrl);

    let displayName: string | undefined;
    try {
      const currentUser = await web.currentUser();
      displayName = currentUser.Title;
      checks.push(check('user.resolve', true, 'blocking', displayName));
    } catch (error) {
      this._logger.error('SharePoint current user validation failed.', { siteUrl, error });
      checks.push(check('user.resolve', false));
    }

    let webPermissions: SPPermission | undefined;
    try {
      webPermissions = this.toPermission(await web.getCurrentUserEffectivePermissions());
      checks.push(check('web.permissions', true));
    } catch (error) {
      this._logger.error('Web permissions validation failed.', { siteUrl, error });
      checks.push(check('web.permissions', false));
    }

    const sitePages = await this.tryGetLibraryPermissions(siteUrl, SITE_PAGES_TEMPLATE);
    checks.push(check('sitePages.reachable', !!sitePages));

    const siteAssets = await this.tryGetLibraryPermissions(siteUrl, SITE_ASSETS_TEMPLATE);
    checks.push(check('siteAssets.reachable', !!siteAssets, accessLevel === 'TargetWrite' ? 'advisory' : 'blocking'));

    if (accessLevel === 'SourceRead') {
      checks.push(check(
        'sitePages.read',
        !!sitePages?.hasAllPermissions(SPPermission.viewListItems, SPPermission.openItems)
      ));
      checks.push(check(
        'siteAssets.read',
        !!siteAssets?.hasAllPermissions(SPPermission.viewListItems, SPPermission.openItems),
        'advisory'
      ));
    } else {
      checks.push(check('web.open', !!webPermissions?.hasPermission(SPPermission.open)));
      checks.push(check(
        'sitePages.write',
        !!sitePages?.hasAllPermissions(SPPermission.addListItems, SPPermission.editListItems)
      ));
      checks.push(check(
        'siteAssets.write',
        siteAssets
          ? siteAssets.hasAllPermissions(SPPermission.addListItems, SPPermission.editListItems)
          : !!webPermissions?.hasPermission(SPPermission.addListItems)
      ));
    }

    return this.toValidationResult(siteUrl, accessLevel, checks);
  }

  public async validateReportStorageAccess(siteUrl: string): Promise<SitePermissionValidationResult> {
    const checks: ValidationCheck[] = [];
    const web = this.web(siteUrl);

    try {
      const currentUser = await web.currentUser();
      checks.push(check('user.resolve', true, 'blocking', currentUser.Title));
    } catch (error) {
      this._logger.error('Report storage current user validation failed.', { siteUrl, error });
      checks.push(check('user.resolve', false));
    }

    let webPermissions: SPPermission | undefined;
    try {
      webPermissions = this.toPermission(await web.getCurrentUserEffectivePermissions());
      checks.push(check('web.permissions', true));
    } catch (error) {
      this._logger.error('Report storage web permissions validation failed.', { siteUrl, error });
      checks.push(check('web.permissions', false));
    }

    const siteAssets = await this.tryGetLibraryPermissions(siteUrl, SITE_ASSETS_TEMPLATE);
    checks.push(check('siteAssets.reachable', !!siteAssets, 'advisory'));

    checks.push(check('reports.manageLists', !!webPermissions?.hasPermission(SPPermission.manageLists), 'advisory'));
    checks.push(check(
      'reports.write',
      siteAssets
        ? siteAssets.hasAllPermissions(SPPermission.addListItems, SPPermission.editListItems)
        : !!webPermissions?.hasPermission(SPPermission.addListItems)
    ));

    return this.toValidationResult(siteUrl, 'ReportStorage', checks);
  }

  private toValidationResult(
    siteUrl: string,
    accessLevel: SiteAccessLevel,
    checks: ReadonlyArray<ValidationCheck>
  ): SitePermissionValidationResult {
    return {
      siteUrl,
      accessLevel,
      isValid: checks.every((item) => item.passed || item.severity === 'advisory'),
      checks
    };
  }

  public async loadPage(
    siteUrl: string,
    pageUrl: string,
    options?: RetryOptions,
    author?: PageAuthor
  ): Promise<RawPageData> {
    const pagePath = toDecodedServerRelativePath(pageUrl);
    const [listItem, sourceFields] = await Promise.all([
      this.getPageListItem(siteUrl, pagePath, options),
      this.getPageFields(siteUrl)
    ]);

    let clientsidePage: IClientsidePage | undefined;
    try {
      clientsidePage = await executeWithRetry(
        async () => this.web(siteUrl).loadClientsidePage(pagePath),
        options ?? defaultRetryOptions
      );
    } catch (error) {
      this._logger.warning('Failed to load client-side page model; falling back to raw canvas parsing.', { pagePath, error });
    }

    return toRawPageData({ pageUrl, pagePath, listItem, clientsidePage, author, sourceFields });
  }

  private async getPageListItem(
    siteUrl: string,
    pagePath: string,
    options?: RetryOptions
  ): Promise<PageListItemResponse> {
    const item = await executeWithRetry(
      async () => this.web(siteUrl)
        .getFileByServerRelativePath(pagePath)
        .listItemAllFields<PageListItemResponse>(),
      options ?? defaultRetryOptions
    );

    if (!item || item.Id === undefined) {
      throw new Error(
        `Could not read the Site Pages item for '${pagePath}'. `
        + `The file may not be a modern page, or it may live outside a page library.`
      );
    }

    return item;
  }

  public async ensureMigrationAssetFolder(siteUrl: string, folderName: string): Promise<string> {
    return this.ensureFolderPath(siteUrl, toServerRelativePath(siteUrl, 'SiteAssets', 'SitePages', folderName));
  }

  public async ensureFolderPath(siteUrl: string, folderPath: string): Promise<string> {
    const normalized = normalizeSlashes(folderPath);
    const sitePath = toSitePath(siteUrl);

    if (!normalized.toLowerCase().startsWith(sitePath.toLowerCase())) {
      throw new Error(`Refusing to create '${normalized}': path is outside the site '${sitePath}'.`);
    }

    const segments = normalized.slice(sitePath.length).split('/').filter(Boolean);
    if (segments.length === 0) {
      return normalized;
    }

    const web = this.web(siteUrl);
    const libraryPath = `${sitePath}/${segments[0]}`;

    if (!(await this.folderExists(siteUrl, libraryPath))) {
      throw new Error(
        `The '${segments[0]}' library does not exist in ${siteUrl}. `
        + `Create it before migrating, or enable the site's Site Assets library.`
      );
    }

    let current = libraryPath;
    for (const segment of segments.slice(1)) {
      current = `${current}/${segment}`;

      if (await this.folderExists(siteUrl, current)) {
        continue;
      }

      try {
        const target = current;
        await executeWithRetry(async () => web.folders.addUsingPath(target), defaultRetryOptions);
      } catch (error) {
        if (!(await this.folderExists(siteUrl, current))) {
          throw error;
        }
      }
    }

    return normalized;
  }

  private async getPageFields(siteUrl: string): Promise<ReadonlyArray<PageFieldDefinition> | undefined> {
    const key = siteUrl.replace(/\/$/, '').toLowerCase();
    const cached = this._pageFieldCache.get(key);
    if (cached) {
      return cached;
    }

    try {
      const web = this.web(siteUrl);
      const lists = await web.lists
        .filter(`BaseTemplate eq ${SITE_PAGES_TEMPLATE.toString()}`)
        .select('Id')
        .top(1)();

      const listId = lists[0]?.Id;
      if (!listId) {
        return undefined;
      }

      const fields = await web.lists.getById(listId).fields
        .select('InternalName', 'TypeAsString', 'ReadOnlyField', 'Hidden', 'FromBaseType', 'CanBeDeleted')<
        ReadonlyArray<FieldInfoPayload>
      >();

      const definitions = fields.map((field): PageFieldDefinition => ({
        internalName: field.InternalName,
        typeAsString: field.TypeAsString ?? '',
        readOnly: field.ReadOnlyField === true,
        hidden: field.Hidden === true,
        fromBaseType: field.FromBaseType !== false,
        canBeDeleted: field.CanBeDeleted === true
      }));

      this._pageFieldCache.set(key, definitions);
      return definitions;
    } catch (error) {
      this._logger.warning('Could not read the page library schema; sending all fields.', { siteUrl, error });
      return undefined;
    }
  }

  private async getPageFieldNames(siteUrl: string): Promise<ReadonlySet<string> | undefined> {
    const fields = await this.getPageFields(siteUrl);
    return fields && new Set(fields.map((field) => field.internalName.toLowerCase()));
  }

  private async folderExists(siteUrl: string, serverRelativePath: string): Promise<boolean> {
    try {
      const folder = await this.web(siteUrl)
        .getFolderByServerRelativePath(serverRelativePath)
        .select('Exists')<{ readonly Exists?: boolean }>();

      return folder?.Exists !== false;
    } catch (error) {
      if (getErrorStatus(error) === 404) {
        return false;
      }
      throw error;
    }
  }

  public async uploadAsset(
    siteUrl: string,
    folderPath: string,
    fileName: string,
    content: ArrayBuffer | string,
    overwrite: boolean
  ): Promise<{ readonly url: string; readonly uniqueId?: string }> {
    const folder = this.web(siteUrl).getFolderByServerRelativePath(folderPath);
    const byteLength = typeof content === 'string' ? content.length : content.byteLength;

    const result = byteLength > CHUNKED_UPLOAD_THRESHOLD_BYTES
      ? await this.uploadChunked(folder, fileName, content, overwrite, byteLength)
      : await executeWithRetry(
        async () => folder.files.addUsingPath(fileName, content, { Overwrite: overwrite }),
        defaultRetryOptions
      );

    const serverRelativeUrl = result.ServerRelativeUrl;
    const uploaded = await this.tryGetFileInfo(siteUrl, serverRelativeUrl);

    return { url: toAbsoluteUrl(siteUrl, serverRelativeUrl), uniqueId: uploaded?.UniqueId };
  }

  private async uploadChunked(
    folder: ReturnType<IWeb['getFolderByServerRelativePath']>,
    fileName: string,
    content: ArrayBuffer | string,
    overwrite: boolean,
    byteLength: number
  ): Promise<{ readonly ServerRelativeUrl: string }> {
    this._logger.info('Uploading a large asset in chunks.', { fileName, byteLength });

    const blob = typeof content === 'string'
      ? new Blob([content], { type: 'text/plain' })
      : new Blob([content]);

    return folder.files.addChunked(fileName, blob, {
      Overwrite: overwrite,
      chunkSize: UPLOAD_CHUNK_BYTES
    });
  }

  public async uploadTextAsset(
    siteUrl: string,
    folderPath: string,
    fileName: string,
    content: string,
    overwrite: boolean
  ): Promise<string> {
    const { url } = await this.uploadAsset(siteUrl, folderPath, fileName, content, overwrite);
    return url;
  }

  public async tryGetFileInfo(siteUrl: string, serverRelativePath: string): Promise<FileInfo | undefined> {
    try {
      return await executeWithRetry(
        async () => this.web(siteUrl)
          .getFileByServerRelativePath(serverRelativePath)
          .select('Exists', 'ServerRelativeUrl', 'Name', 'Length', 'UniqueId')<FileInfo>(),
        defaultRetryOptions
      );
    } catch (error) {
      if (getErrorStatus(error) === 404) {
        return undefined;
      }
      throw error;
    }
  }

  public async fileExists(siteUrl: string, serverRelativePath: string): Promise<boolean> {
    const info = await this.tryGetFileInfo(siteUrl, serverRelativePath);
    return !!info && info.Exists !== false;
  }

  public async deleteFile(siteUrl: string, serverRelativePath: string): Promise<void> {
    await executeWithRetry(
      async () => this.web(siteUrl).getFileByServerRelativePath(serverRelativePath).delete(),
      defaultRetryOptions
    );
  }

  public async downloadBinary(assetUrl: string, expectedOrigin: string): Promise<ArrayBuffer> {
    if (!isSameOrigin(assetUrl, expectedOrigin)) {
      throw new Error(`Refusing to download '${assetUrl}': outside the source site origin.`);
    }

    return executeWithRetry(
      async () => {
        const response = await this._context.spHttpClient.get(assetUrl, SPHttpClient.configurations.v1, {
          headers: { accept: '*/*' }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new HttpRequestError(response.status, response.statusText, errorText, assetUrl, this.collectHeaders(response));
        }

        const declaredLength = Number.parseInt(response.headers.get('content-length') ?? '', 10);
        if (!Number.isNaN(declaredLength) && declaredLength > MAX_ASSET_BYTES) {
          throw new Error(
            `'${assetUrl}' is ${Math.round(declaredLength / 1024 / 1024).toString()} MB, `
            + `above the ${Math.round(MAX_ASSET_BYTES / 1024 / 1024).toString()} MB limit. `
            + `Copy it manually and relink the page.`
          );
        }

        const buffer = await response.arrayBuffer();
        if (buffer.byteLength > MAX_ASSET_BYTES) {
          throw new Error(`'${assetUrl}' exceeds the ${Math.round(MAX_ASSET_BYTES / 1024 / 1024).toString()} MB asset limit.`);
        }

        return buffer;
      },
      defaultRetryOptions
    );
  }

  public async getSiteIdentifiers(siteUrl: string): Promise<SiteIdentifiers | undefined> {
    const key = siteUrl.replace(/\/$/, '').toLowerCase();
    const cached = this._identifierCache.get(key);
    if (cached) {
      return cached;
    }

    try {
      const sp = spfi(siteUrl).using(SPFx(this._context));
      const [site, web] = await Promise.all([
        sp.site.select('Id')<{ Id: string }>(),
        sp.web.select('Id')<{ Id: string }>()
      ]);

      let siteAssetsListId: string | undefined;
      try {
        const lists = await this.web(siteUrl).lists
          .filter(`BaseTemplate eq ${SITE_ASSETS_TEMPLATE.toString()}`)
          .select('Id')
          .top(1)();
        siteAssetsListId = lists[0]?.Id;
        // eslint-disable-next-line no-empty
      } catch {
      }

      const identifiers: SiteIdentifiers = { siteId: site.Id, webId: web.Id, siteAssetsListId };
      this._identifierCache.set(key, identifiers);
      return identifiers;
    } catch (error) {
      this._logger.warning('Could not read site identifiers; web part GUIDs will not be rewritten.', { siteUrl, error });
      return undefined;
    }
  }

  public async ensureList(
    siteUrl: string,
    listTitle: string,
    description: string,
    fieldDefinitions: ReadonlyArray<ListFieldDefinition>
  ): Promise<void> {
    const web = this.web(siteUrl);
    const ensured = await executeWithRetry(
      async () => web.lists.ensure(listTitle, description, 100, false),
      defaultRetryOptions
    );
    const list = ensured.list;

    const existingFields = new Set(
      (await list.fields.select('InternalName')()).map((field) => field.InternalName.toLowerCase())
    );

    for (const field of fieldDefinitions) {
      if (existingFields.has(field.title.toLowerCase())) {
        continue;
      }

      try {
        switch (field.kind) {
          case 'Text':
            await list.fields.addText(field.title, field.properties);
            break;
          case 'Note':
            await list.fields.addMultilineText(field.title, field.properties);
            break;
          case 'DateTime':
            await list.fields.addDateTime(field.title, field.properties);
            break;
          case 'Number':
            await list.fields.addNumber(field.title, field.properties);
            break;
        }
      } catch (error) {
        if (this.isAlreadyExistsError(error)) {
          continue;
        }
        this._logger.error(`Failed to ensure field '${field.title}'.`, { listTitle, error });
        throw error;
      }
    }
  }

  public async getListItems<T>(
    siteUrl: string,
    listTitle: string,
    options: ListQueryOptions = {}
  ): Promise<ReadonlyArray<T>> {
    return executeWithRetry(
      async () => {
        let query = this.web(siteUrl).lists.getByTitle(listTitle).items;

        if (options.filter) {
          query = query.filter(options.filter);
        }
        if (options.select?.length) {
          query = query.select(...options.select);
        }
        if (options.orderByDescending) {
          query = query.orderBy(options.orderByDescending, false);
        }
        if (options.top) {
          query = query.top(options.top);
        }

        return await query() as ReadonlyArray<T>;
      },
      defaultRetryOptions
    );
  }

  public async ensureIndexedFields(
    siteUrl: string,
    listTitle: string,
    fieldNames: ReadonlyArray<string>
  ): Promise<void> {
    const list = this.web(siteUrl).lists.getByTitle(listTitle);

    for (const fieldName of fieldNames) {
      try {
        const field = await list.fields.getByInternalNameOrTitle(fieldName)
          .select('Indexed')<{ readonly Indexed?: boolean }>();

        if (field?.Indexed) {
          continue;
        }

        await list.fields.getByInternalNameOrTitle(fieldName).update({ Indexed: true });
        this._logger.info('Indexed a history column.', { listTitle, fieldName });
      } catch (error) {
        this._logger.warning('Could not index a history column.', { listTitle, fieldName, error });
      }
    }
  }

  public async addListItemsBatch(
    siteUrl: string,
    listTitle: string,
    items: ReadonlyArray<Record<string, unknown>>
  ): Promise<number> {
    if (items.length === 0) {
      return 0;
    }

    const web = this.web(siteUrl);
    let stored = 0;
    const failures: string[] = [];

    for (let offset = 0; offset < items.length; offset += MAX_BATCH_SIZE) {
      const chunk = items.slice(offset, offset + MAX_BATCH_SIZE);

      await executeWithRetry(
        async () => {
          const [batchedWeb, execute] = web.batched();
          const list = batchedWeb.lists.getByTitle(listTitle);

          const queued = chunk.map(async (values) => list.items.add(values));
          await execute();

          const settled = await Promise.allSettled(queued);
          stored += settled.filter((result) => result.status === 'fulfilled').length;
          settled
            .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
            .forEach((result) => failures.push(toMessage(result.reason, 'Row rejected.')));
        },
        defaultRetryOptions
      );
    }

    if (failures.length > 0) {
      this._logger.warning('Some list rows were rejected.', { listTitle, failures: failures.slice(0, 10) });
    }

    return stored;
  }

  public async createOrLoadTargetPage(
    context: MigrationContext,
    pageName: string,
    folderPath = ''
  ): Promise<TargetPageHandle> {
    const targetSiteUrl = context.targetSite.webUrl;
    const targetWeb = this.web(targetSiteUrl);

    const resolvedName = await this.resolveTargetPageName(context, pageName, folderPath);
    const pagePath = sitePagesPath(targetSiteUrl, resolvedName, folderPath);
    const pageUrl = toAbsoluteUrl(targetSiteUrl, pagePath);
    const exists = await this.fileExists(targetSiteUrl, pagePath);

    if (exists) {
      if (context.overwriteMode === 'Fail') {
        throw new Error(`Target page '${resolvedName}' already exists.`);
      }

      return {
        pagePath,
        pageUrl,
        pageName: resolvedName,
        wasCreated: false,
        skipped: context.overwriteMode === 'Skip'
      };
    }

    if (context.dryRun) {
      return { pagePath, pageUrl, pageName: resolvedName, wasCreated: false, skipped: false };
    }

    const parentFolder = folderPath
      ? await this.ensureFolderPath(targetSiteUrl, toServerRelativePath(targetSiteUrl, 'SitePages', folderPath))
      : toServerRelativePath(targetSiteUrl, 'SitePages');

    await executeWithRetry(
      async () => targetWeb
        .getFolderByServerRelativePath(parentFolder)
        .files.addTemplateFile(pagePath, TemplateFileType.ClientSidePage),
      defaultRetryOptions
    );

    return { pagePath, pageUrl, pageName: resolvedName, wasCreated: true, skipped: false };
  }

  private async resolveTargetPageName(
    context: MigrationContext,
    pageName: string,
    folderPath: string
  ): Promise<string> {
    const normalized = normalizePageName(pageName);
    if (context.overwriteMode !== 'Rename') {
      return normalized;
    }

    const targetSiteUrl = context.targetSite.webUrl;
    if (!(await this.fileExists(targetSiteUrl, sitePagesPath(targetSiteUrl, normalized, folderPath)))) {
      return normalized;
    }

    const stem = stripAspxExtension(normalized);
    for (let suffix = 1; suffix <= 50; suffix += 1) {
      const candidate = normalizePageName(`${stem}-${suffix.toString()}`);
      if (!(await this.fileExists(targetSiteUrl, sitePagesPath(targetSiteUrl, candidate, folderPath)))) {
        return candidate;
      }
    }

    throw new Error(`Could not find an available name for '${normalized}' after 50 attempts.`);
  }

  public async updatePageCanvas(
    siteUrl: string,
    pagePath: string,
    payload: PageCanvasPayload
  ): Promise<void> {
    const promotedState = Number.parseInt(payload.promotedState ?? '0', 10) || 0;

    const candidateValues: Record<string, unknown> = {
      ...(payload.carriedFields ?? {}),
      ContentTypeId: SITE_PAGE_CONTENT_TYPE_ID,
      ClientSideApplicationId: MODERN_PAGES_APPLICATION_ID,
      Title: payload.title,
      CanvasContent1: payload.canvasContent1,
      PageLayoutType: payload.pageLayoutType ?? 'Article',
      Description: payload.description ?? '',
      TopicHeader: payload.topicHeader ?? '',
      LayoutWebpartsContent: payload.layoutWebpartsContent ?? '',
      PromotedState: promotedState,
      ...(promotedState === PROMOTED_STATE_NEWS
        ? { FirstPublishedDate: payload.firstPublishedDate ?? new Date().toISOString() }
        : {}),
      BannerImageUrl: payload.bannerImageUrl
        ? { Url: payload.bannerImageUrl, Description: payload.bannerImageUrl }
        : undefined,
      ThumbnailUrl: payload.thumbnailUrl
    };

    const availableFields = await this.getPageFieldNames(siteUrl);
    const updateValues: Record<string, unknown> = {};
    const skipped: string[] = [];

    for (const [fieldName, value] of Object.entries(candidateValues)) {
      if (value === undefined) {
        continue;
      }
      if (availableFields && !availableFields.has(fieldName.toLowerCase())) {
        skipped.push(fieldName);
        continue;
      }
      updateValues[fieldName] = value;
    }

    if (skipped.length > 0) {
      this._logger.info('Skipped page fields the destination library does not define.', { siteUrl, skipped });
    }

    if (updateValues.CanvasContent1 === undefined) {
      throw new Error(
        `The page library in ${siteUrl} has no CanvasContent1 field, so page content cannot be written.`
      );
    }

    await this.ensureWritable(siteUrl, pagePath);

    await executeWithRetry(
      async () => {
        const item = await this.web(siteUrl).getFileByServerRelativePath(pagePath).getItem();
        await item.update(updateValues);
      },
      defaultRetryOptions
    );

    await this.assertCanvasPersisted(siteUrl, pagePath, payload.canvasContent1);
  }

  private async ensureWritable(siteUrl: string, pagePath: string): Promise<void> {
    const file = this.web(siteUrl).getFileByServerRelativePath(pagePath);

    let state: CheckoutState | undefined;
    try {
      state = await file
        .select('CheckOutType', 'CheckedOutByUser/Title', 'CheckedOutByUser/Email')
        .expand('CheckedOutByUser')<CheckoutState>();
    } catch (error) {
      this._logger.warning('Could not read the checkout state.', { pagePath, error });
      return;
    }

    const action = decideCheckoutAction(state, this._context.pageContext.user.email);

    if (action.kind === 'proceed') {
      return;
    }

    if (action.kind === 'blocked') {
      throw new Error(
        `'${pagePath}' is checked out to ${action.heldBy}. `
        + `Ask them to check it in, then run the migration again.`
      );
    }

    try {
      await executeWithRetry(async () => file.checkin('', CheckinType.Minor), defaultRetryOptions);
    } catch (minorError) {
      this._logger.info('Minor check-in refused; retrying as major.', { pagePath, minorError });
      await executeWithRetry(async () => file.checkin('', CheckinType.Major), defaultRetryOptions);
    }
  }

  private async assertCanvasPersisted(
    siteUrl: string,
    pagePath: string,
    expectedCanvas: string
  ): Promise<void> {
    if (!expectedCanvas) {
      return;
    }

    const stored = await executeWithRetry(
      async () => this.web(siteUrl)
        .getFileByServerRelativePath(pagePath)
        .listItemAllFields<{ readonly CanvasContent1?: string }>(),
      defaultRetryOptions
    );

    if (!stored?.CanvasContent1) {
      throw new Error(
        `The canvas for '${pagePath}' was accepted but not stored. `
        + `The destination page is empty; re-run the migration for this page.`
      );
    }
  }

  public async publishPage(siteUrl: string, pagePath: string, comment: string): Promise<void> {
    try {
      await executeWithRetry(
        async () => this.web(siteUrl).getFileByServerRelativePath(pagePath).publish(comment.slice(0, 1023)),
        defaultRetryOptions
      );
    } catch (error) {
      const message = toMessage(error, '');
      if (/not (enabled|supported)|no minor version|already published|check\s?in/i.test(message)) {
        this._logger.info('Publishing skipped; the library does not require it.', { pagePath, message });
        return;
      }
      throw error;
    }
  }

  private collectHeaders(response: SPHttpClientResponse): Record<string, string> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  }

  private async tryGetLibraryPermissions(siteUrl: string, baseTemplate: number): Promise<SPPermission | undefined> {
    try {
      const lists = await this.web(siteUrl).lists
        .filter(`BaseTemplate eq ${baseTemplate.toString()}`)
        .select('Id', 'Title', 'EffectiveBasePermissions')
        .top(1)();

      const permissions = lists[0]?.EffectiveBasePermissions as PermissionsPayload | undefined;
      return permissions ? this.toPermission(permissions) : undefined;
    } catch (error) {
      this._logger.warning('Library permission probe failed.', { siteUrl, baseTemplate, error });
      return undefined;
    }
  }

  private toPermission(payload: PermissionsPayload): SPPermission {
    const high = typeof payload.High === 'string' ? parseInt(payload.High, 10) : (payload.High ?? 0);
    const low = typeof payload.Low === 'string' ? parseInt(payload.Low, 10) : (payload.Low ?? 0);
    return new SPPermission({ High: Number.isNaN(high) ? 0 : high, Low: Number.isNaN(low) ? 0 : low });
  }

  private isAlreadyExistsError(error: unknown): boolean {
    const status = getErrorStatus(error);
    if (status === 409) {
      return true;
    }

    const body = error instanceof HttpRequestError ? error.responseBody : '';
    const message = error instanceof Error ? error.message : '';
    return /already exists|-2130575257|SPFileCollectionAddException/i.test(`${body} ${message}`);
  }
}

export type { ConflictMode };

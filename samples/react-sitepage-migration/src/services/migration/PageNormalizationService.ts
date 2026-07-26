import { createCompatibilityResolver } from '../../compat/WebPartCompatibilityRegistry';
import { CompatibilityOverride } from '../../models/CompatibilityOverride';
import {
  AssetReference,
  MigrationWarning,
  NormalizedColumn,
  NormalizedControl,
  NormalizedPage,
  NormalizedSection,
  UnsupportedControlSnapshot,
  WebPartControlModel
} from '../../models/NormalizedPage';
import { ensureAbsoluteUrl, isSameOrigin } from '../../utilities/UrlUtilities';
import { RawPageData } from '../sharepoint/SharePointPageService';

interface CanvasControlDescriptor {
  readonly id?: string;
  readonly controlType?: number;
  readonly emphasis?: { readonly zoneEmphasis?: number };
  readonly position?: {
    readonly sectionIndex?: number;
    readonly zoneIndex?: number;
    readonly controlIndex?: number;
    readonly sectionFactor?: number;
    readonly layoutIndex?: number;
  };
}

interface ClientsideSectionSnapshot {
  readonly emphasis?: number;
  readonly columns?: ReadonlyArray<{ readonly factor?: number }>;
}

export const migratableExtensions = new Set<string>([
  'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico',
  'pdf', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt', 'txt', 'csv', 'zip'
]);

export const assetUrlPattern =
  /(https?:\/\/[^\s"'<>]+|\/[^\s"'<>]+?\.(?:png|jpg|jpeg|gif|svg|webp|bmp|ico|pdf|docx|xlsx|pptx|doc|xls|ppt|txt|csv|zip))/gi;

const MAX_TRAVERSAL_DEPTH = 100;
const MAX_URL_LENGTH = 2048;

const urlPropertyNames = new Set<string>([
  'imageurl', 'imageurlsource', 'serverrelativeurl', 'url', 'linkurl',
  'file', 'serverurl', 'src', 'thumbnailurl', 'bannerimageurl',
  'imagesourcetype', 'weburl', 'siteurl', 'href', 'imagesource'
]);

export class PageNormalizationService {
  private readonly _resolveCompatibility: ReturnType<typeof createCompatibilityResolver>;

  public constructor(overrides: ReadonlyArray<CompatibilityOverride> = []) {
    this._resolveCompatibility = createCompatibilityResolver(overrides);
  }

  public normalize(sourceSiteUrl: string, rawPage: RawPageData): NormalizedPage {
    const warnings: MigrationWarning[] = [];

    if (rawPage.unportableColumns && rawPage.unportableColumns.length > 0) {
      warnings.push({
        code: 'Column.NotPortable',
        message: `These custom columns hold values that cannot be migrated: ${rawPage.unportableColumns.join(', ')}.`,
        severity: 'Warning'
      });
    }

    const assetReferences = this.discoverAssets(sourceSiteUrl, rawPage);
    const controls = this.parseControls(sourceSiteUrl, rawPage.canvasContent1, assetReferences, warnings);
    const sections = this.groupSections(controls, rawPage.clientsidePage);

    const unsupportedControls = controls
      .filter((control): control is WebPartControlModel =>
        control.type === 'WebPart' && control.compatibility === 'Unsupported')
      .map<UnsupportedControlSnapshot>((control) => ({
        controlId: control.id,
        webPartId: control.webPartId,
        title: control.title,
        serializedConfiguration: this.safeStringify(control.rawData)
      }));

    return {
      metadata: {
        pageId: rawPage.pageId,
        title: rawPage.title,
        pageName: rawPage.pageName,
        sourcePageUrl: rawPage.pageUrl,
        description: rawPage.description,
        topicHeader: rawPage.topicHeader,
        bannerImageUrl: rawPage.bannerImageUrl,
        thumbnailUrl: rawPage.thumbnailUrl,
        authorName: rawPage.authorName,
        authorEmail: rawPage.authorEmail,
        lastModifiedDateTime: rawPage.lastModifiedDateTime,
        pageLayoutType: rawPage.pageLayoutType,
        promotedState: rawPage.promotedState,
        firstPublishedDate: rawPage.firstPublishedDate,
        carriedFields: rawPage.carriedFields,
        unportableColumns: rawPage.unportableColumns,
        folderPath: rawPage.folderPath
      },
      rawCanvasContent: rawPage.canvasContent1,
      rawLayoutWebpartsContent: rawPage.layoutWebpartsContent,
      sections,
      assets: assetReferences,
      warnings,
      unsupportedControls
    };
  }

  private discoverAssets(sourceSiteUrl: string, rawPage: RawPageData): ReadonlyArray<AssetReference> {
    const seen = new Set<string>();
    const results: AssetReference[] = [];
    const sourceOrigin = new URL(sourceSiteUrl).origin;

    const addAsset = (
      url: string,
      sourceType: AssetReference['sourceType'],
      discoveredFrom: AssetReference['discoveredFrom']
    ): void => {
      if (!url || url.length > MAX_URL_LENGTH || url.startsWith('data:')) {
        return;
      }

      let absoluteSourceUrl: string;
      try {
        absoluteSourceUrl = ensureAbsoluteUrl(sourceSiteUrl, url);
      } catch {
        return;
      }

      if (!isSameOrigin(absoluteSourceUrl, sourceOrigin) || seen.has(absoluteSourceUrl)) {
        return;
      }

      seen.add(absoluteSourceUrl);
      const fileName = this.extractFileName(absoluteSourceUrl, results.length);
      results.push({
        id: `${results.length.toString()}-${fileName}`,
        sourceUrl: url,
        absoluteSourceUrl,
        sourceType,
        fileName,
        discoveredFrom
      });
    };

    if (rawPage.bannerImageUrl) {
      addAsset(rawPage.bannerImageUrl, 'Banner', 'PageMetadata');
    }
    if (rawPage.thumbnailUrl) {
      addAsset(rawPage.thumbnailUrl, 'Image', 'PageMetadata');
    }

    const fragments: ReadonlyArray<[string, AssetReference['discoveredFrom']]> = [
      [rawPage.canvasContent1, 'CanvasContent1'],
      [rawPage.layoutWebpartsContent ?? '', 'LayoutWebpartsContent']
    ];

    fragments.forEach(([fragment, discoveredFrom]) => {
      if (!fragment) {
        return;
      }

      const doc = new DOMParser().parseFromString(`<div>${fragment}</div>`, 'text/html');
      const root = doc.body.firstElementChild as HTMLElement | null;
      if (root) {
        this.traverseForAssets(root, addAsset, discoveredFrom, 0);
      }

      const matches = fragment.match(assetUrlPattern) ?? [];
      matches.forEach((match) => {
        if (this.looksLikeAsset(match)) {
          addAsset(match, 'Image', discoveredFrom);
        }
      });
    });

    return results;
  }

  private extractFileName(absoluteUrl: string, index: number): string {
    try {
      const decoded = decodeURIComponent(new URL(absoluteUrl).pathname);
      return decoded.split('/').filter(Boolean).pop() ?? `asset-${index.toString()}`;
    } catch {
      return `asset-${index.toString()}`;
    }
  }

  private traverseForAssets(
    element: HTMLElement,
    addAsset: (url: string, sourceType: AssetReference['sourceType'], from: AssetReference['discoveredFrom']) => void,
    discoveredFrom: AssetReference['discoveredFrom'],
    depth: number
  ): void {
    if (depth > MAX_TRAVERSAL_DEPTH) {
      return;
    }

    const src = element.getAttribute('src');
    if (src) {
      addAsset(src, 'Image', discoveredFrom);
    }

    const href = element.getAttribute('href');
    if (href && this.looksLikeAsset(href)) {
      addAsset(href, 'File', discoveredFrom);
    }

    const style = element.getAttribute('style');
    if (style) {
      const urlMatches = style.match(/url\(["']?([^"')]+)["']?\)/gi) ?? [];
      urlMatches.forEach((match) => {
        const url = match.replace(/url\(["']?([^"')]+)["']?\)/i, '$1');
        if (this.looksLikeAsset(url)) {
          addAsset(url, 'Image', discoveredFrom);
        }
      });
    }

    const webPartData = element.getAttribute('data-sp-webpartdata');
    if (webPartData) {
      const parsed = this.tryParseJson<Record<string, unknown>>(webPartData);
      if (parsed) {
        this.extractUrlsFromJson(parsed, addAsset, discoveredFrom, 0);
      }
    }

    for (const child of Array.from(element.children)) {
      this.traverseForAssets(child as HTMLElement, addAsset, discoveredFrom, depth + 1);
    }
  }

  private extractUrlsFromJson(
    value: unknown,
    addAsset: (url: string, sourceType: AssetReference['sourceType'], from: AssetReference['discoveredFrom']) => void,
    discoveredFrom: AssetReference['discoveredFrom'],
    depth: number
  ): void {
    if (depth > MAX_TRAVERSAL_DEPTH) {
      return;
    }

    if (typeof value === 'string') {
      if (this.looksLikeAsset(value)) {
        addAsset(value, 'Image', discoveredFrom);
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => this.extractUrlsFromJson(item, addAsset, discoveredFrom, depth + 1));
      return;
    }

    if (value && typeof value === 'object') {
      for (const [key, entry] of Object.entries(value)) {
        if (typeof entry === 'string') {
          if ((urlPropertyNames.has(key.toLowerCase()) && this.looksLikeReference(entry))
            || this.looksLikeAsset(entry)) {
            addAsset(entry, 'Image', discoveredFrom);
          }
        } else {
          this.extractUrlsFromJson(entry, addAsset, discoveredFrom, depth + 1);
        }
      }
    }
  }

  private looksLikeAsset(value: string): boolean {
    if (!value || value.length > MAX_URL_LENGTH) {
      return false;
    }

    if (!this.looksLikeReference(value)) {
      return false;
    }

    const withoutQuery = value.split('?')[0].split('#')[0];
    const extension = withoutQuery.split('.').pop()?.toLowerCase() ?? '';
    return migratableExtensions.has(extension);
  }

  private looksLikeReference(value: string): boolean {
    if (!(value.startsWith('/') || /^https?:\/\//i.test(value))) {
      return false;
    }

    return !/\.ashx(\?|$)/i.test(value) && !/\/_layouts\//i.test(value);
  }

  private parseControls(
    sourceSiteUrl: string,
    canvasContent: string,
    assetReferences: ReadonlyArray<AssetReference>,
    warnings: MigrationWarning[]
  ): ReadonlyArray<NormalizedControl> {
    if (!canvasContent) {
      warnings.push({
        code: 'Canvas.Empty',
        message: 'The source page has no canvas content to migrate.',
        severity: 'Warning'
      });
      return [];
    }

    const parsed = new DOMParser().parseFromString(`<div>${canvasContent}</div>`, 'text/html');
    const controlElements = Array.from(parsed.querySelectorAll<HTMLElement>('[data-sp-canvascontrol]'));

    const assetsByUrl = new Map<string, AssetReference>();
    assetReferences.forEach((asset) => {
      assetsByUrl.set(asset.sourceUrl, asset);
      assetsByUrl.set(asset.absoluteSourceUrl, asset);
    });

    return controlElements.map<NormalizedControl>((element, index) => {
      const descriptor = this.tryParseJson<CanvasControlDescriptor>(element.getAttribute('data-sp-canvascontrol')) ?? {};
      const position = {
        sectionIndex: descriptor.position?.sectionIndex ?? 0,
        columnIndex: descriptor.position?.zoneIndex ?? 0,
        controlIndex: descriptor.position?.controlIndex ?? index,
        zoneEmphasis: descriptor.emphasis?.zoneEmphasis ?? 0,
        sectionTemplate: descriptor.position?.layoutIndex?.toString() ?? 'Unknown'
      };

      const webPartData = this.tryParseJson<Record<string, unknown>>(element.getAttribute('data-sp-webpartdata'));

      if (webPartData) {
        const webPartId = String(webPartData.id ?? webPartData.webPartId ?? 'unknown');
        const compatibility = this._resolveCompatibility(webPartId);

        if (compatibility.compatibility !== 'FullySupported') {
          warnings.push({
            code: `WebPart.${compatibility.compatibility}`,
            message: `${compatibility.title}: ${compatibility.notes}`,
            severity: compatibility.compatibility === 'Unsupported' ? 'Error' : 'Warning',
            controlId: descriptor.id
          });
        }

        return {
          id: descriptor.id ?? `webpart-${index.toString()}`,
          type: 'WebPart',
          position,
          webPartId,
          title: typeof webPartData.title === 'string' ? webPartData.title : compatibility.title,
          instanceId: typeof webPartData.instanceId === 'string' ? webPartData.instanceId : undefined,
          dataVersion: typeof webPartData.dataVersion === 'string' ? webPartData.dataVersion : undefined,
          compatibility: compatibility.compatibility,
          properties: (webPartData.properties ?? {}) as Record<string, unknown>,
          serverProcessedContent: (webPartData.serverProcessedContent ?? {}) as Record<string, unknown>,
          dynamicDataPaths: (webPartData.dynamicDataPaths ?? {}) as Record<string, string>,
          rawData: webPartData
        };
      }

      const innerHtml = element.innerHTML;
      const relatedAssets: AssetReference[] = [];
      const claimed = new Set<string>();

      Array.from(element.querySelectorAll<HTMLElement>('[src],[href]')).forEach((child) => {
        [child.getAttribute('src'), child.getAttribute('href')].forEach((candidate) => {
          if (!candidate) {
            return;
          }
          const asset = assetsByUrl.get(candidate) ?? assetsByUrl.get(ensureAbsoluteUrl(sourceSiteUrl, candidate));
          if (asset && !claimed.has(asset.id)) {
            claimed.add(asset.id);
            relatedAssets.push(asset);
          }
        });
      });

      return {
        id: descriptor.id ?? `text-${index.toString()}`,
        type: 'Text',
        position,
        innerHtml,
        assetReferences: relatedAssets
      };
    });
  }

  private groupSections(
    controls: ReadonlyArray<NormalizedControl>,
    clientsidePage?: unknown
  ): ReadonlyArray<NormalizedSection> {
    const pageSections =
      (clientsidePage as { sections?: ReadonlyArray<ClientsideSectionSnapshot> } | undefined)?.sections ?? [];

    const buckets = new Map<number, Map<number, NormalizedControl[]>>();
    const emphasisBySection = new Map<number, number>();
    const templateBySection = new Map<number, string>();

    for (const control of controls) {
      const { sectionIndex, columnIndex } = control.position;

      let columns = buckets.get(sectionIndex);
      if (!columns) {
        columns = new Map<number, NormalizedControl[]>();
        buckets.set(sectionIndex, columns);
        emphasisBySection.set(
          sectionIndex,
          pageSections[sectionIndex]?.emphasis ?? control.position.zoneEmphasis ?? 0
        );
        templateBySection.set(sectionIndex, control.position.sectionTemplate ?? 'Unknown');
      }

      const bucket = columns.get(columnIndex);
      if (bucket) {
        bucket.push(control);
      } else {
        columns.set(columnIndex, [control]);
      }
    }

    return Array.from(buckets.entries())
      .sort(([left], [right]) => left - right)
      .map<NormalizedSection>(([sectionIndex, columns]) => ({
        index: sectionIndex,
        emphasis: emphasisBySection.get(sectionIndex) ?? 0,
        template: templateBySection.get(sectionIndex) ?? 'Unknown',
        columns: Array.from(columns.entries())
          .sort(([left], [right]) => left - right)
          .map<NormalizedColumn>(([columnIndex, items]) => ({
            index: columnIndex,
            factor: pageSections[sectionIndex]?.columns?.[columnIndex]?.factor ?? 12,
            controls: [...items].sort((left, right) => left.position.controlIndex - right.position.controlIndex)
          }))
      }));
  }

  private tryParseJson<T>(value: string | null): T | undefined {
    if (!value) {
      return undefined;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return undefined;
    }
  }

  private safeStringify(value: unknown): string {
    try {
      return JSON.stringify(value) ?? '';
    } catch {
      return '';
    }
  }
}

import { AssetCopyResult } from '../../models/MigrationReport';
import { AssetReference, NormalizedPage } from '../../models/NormalizedPage';
import type { SiteIdentifiers } from '../sharepoint/SharePointPageService';
import { replaceAllUrls, toSitePath } from '../../utilities/UrlUtilities';

export interface TransformedPagePayload {
  readonly title: string;
  readonly description?: string;
  readonly topicHeader?: string;
  readonly bannerImageUrl?: string;
  readonly thumbnailUrl?: string;
  readonly pageLayoutType?: string;
  readonly promotedState?: string;
  readonly firstPublishedDate?: string;
  readonly carriedFields?: Readonly<Record<string, unknown>>;
  readonly canvasContent1: string;
  readonly layoutWebpartsContent?: string;
}

const urlAttributeNames: ReadonlyArray<string> = [
  'src',
  'href',
  'data-interception',
  'data-sp-searchableplaintext',
  'bannerimageurl',
  'thumbnailurl'
];

const jsonUrlKeys = new Set<string>([
  'imagesourcetype',
  'serverrelativeurl',
  'imageurl',
  'url',
  'linkurl',
  'file',
  'serverurl',
  'src',
  'weburl',
  'siteurl',
  'thumbnailurl'
]);

const MAX_TRAVERSAL_DEPTH = 100;

const MIGRATED_LIBRARIES: ReadonlyArray<string> = ['SitePages', 'SiteAssets'];

export interface SiteScopedRewrites {
  readonly substitutions: ReadonlyMap<string, string>;
  readonly prefixes: ReadonlyMap<string, string>;
}

export const buildSiteScopedMappings = (
  sourceSiteUrl: string,
  targetSiteUrl: string
): SiteScopedRewrites => {
  const substitutions = new Map<string, string>();
  const prefixes = new Map<string, string>();

  const sourceOrigin = new URL(sourceSiteUrl).origin;
  const targetOrigin = new URL(targetSiteUrl).origin;
  const sourcePath = toSitePath(sourceSiteUrl);
  const targetPath = toSitePath(targetSiteUrl);

  if (`${sourceOrigin}${sourcePath}` === `${targetOrigin}${targetPath}`) {
    return { substitutions, prefixes };
  }

  MIGRATED_LIBRARIES.forEach((library) => {
    substitutions.set(
      `${sourceOrigin}${sourcePath}/${library}/`,
      `${targetOrigin}${targetPath}/${library}/`
    );
    prefixes.set(`${sourcePath}/${library}/`, `${targetPath}/${library}/`);
  });

  return { substitutions, prefixes };
};

const GUID_PATTERN = /^\{?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}?$/i;

export const buildGuidMappings = (
  sourceIdentifiers: SiteIdentifiers | undefined,
  targetIdentifiers: SiteIdentifiers | undefined,
  assetResults: ReadonlyArray<AssetCopyResult>
): ReadonlyMap<string, string> => {
  const mappings = new Map<string, string>();

  const add = (from: string | undefined, to: string | undefined): void => {
    if (!from || !to) {
      return;
    }
    const normalizedFrom = from.replace(/[{}]/g, '').toLowerCase();
    const normalizedTo = to.replace(/[{}]/g, '');
    if (normalizedFrom !== normalizedTo.toLowerCase()) {
      mappings.set(normalizedFrom, normalizedTo);
    }
  };

  add(sourceIdentifiers?.siteId, targetIdentifiers?.siteId);
  add(sourceIdentifiers?.webId, targetIdentifiers?.webId);
  add(sourceIdentifiers?.siteAssetsListId, targetIdentifiers?.siteAssetsListId);

  assetResults.forEach((result) => add(result.sourceUniqueId, result.targetUniqueId));

  return mappings;
};

const rewriteGuid = (value: string, guidMappings: ReadonlyMap<string, string>): string => {
  if (guidMappings.size === 0 || !GUID_PATTERN.test(value)) {
    return value;
  }

  const replacement = guidMappings.get(value.replace(/[{}]/g, '').toLowerCase());
  if (!replacement) {
    return value;
  }

  return value.startsWith('{') ? `{${replacement}}` : replacement;
};

export const applyRewrites = (
  value: string,
  substitutions: ReadonlyMap<string, string>,
  prefixes: ReadonlyMap<string, string>
): string => {
  const substituted = replaceAllUrls(value, substitutions);

  for (const [sourcePrefix, targetPrefix] of prefixes) {
    if (substituted.startsWith(sourcePrefix)) {
      return `${targetPrefix}${substituted.slice(sourcePrefix.length)}`;
    }
  }

  return substituted;
};

export class PageTransformService {
  public transformPage(
    normalizedPage: NormalizedPage,
    sourceSiteUrl: string,
    targetSiteUrl: string,
    assetMappings: ReadonlyMap<string, string>,
    pageMappings: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string> = new Map()
  ): TransformedPagePayload {
    const allReplacements = new Map<string, string>(assetMappings);
    pageMappings.forEach((targetUrl, sourceUrl) => allReplacements.set(sourceUrl, targetUrl));

    const siteScoped = buildSiteScopedMappings(sourceSiteUrl, targetSiteUrl);
    siteScoped.substitutions.forEach((targetUrl, sourceUrl) => {
      if (!allReplacements.has(sourceUrl)) {
        allReplacements.set(sourceUrl, targetUrl);
      }
    });
    const prefixes = siteScoped.prefixes;

    return {
      title: normalizedPage.metadata.title,
      description: normalizedPage.metadata.description,
      topicHeader: normalizedPage.metadata.topicHeader,
      bannerImageUrl: this.rewriteUrl(normalizedPage.metadata.bannerImageUrl, allReplacements, prefixes),
      thumbnailUrl: this.rewriteUrl(normalizedPage.metadata.thumbnailUrl, allReplacements, prefixes),
      pageLayoutType: normalizedPage.metadata.pageLayoutType,
      promotedState: normalizedPage.metadata.promotedState,
      firstPublishedDate: normalizedPage.metadata.firstPublishedDate,
      carriedFields: this.rewriteCarriedFields(
        normalizedPage.metadata.carriedFields, allReplacements, prefixes, guidMappings
      ),
      canvasContent1: this.rewriteCanvasHtml(normalizedPage.rawCanvasContent, allReplacements, prefixes, guidMappings),
      layoutWebpartsContent: normalizedPage.rawLayoutWebpartsContent
        ? this.rewriteCanvasHtml(normalizedPage.rawLayoutWebpartsContent, allReplacements, prefixes, guidMappings)
        : undefined
    };
  }

  public buildAssetReplacementMap(
    sourceAssets: ReadonlyArray<AssetReference>,
    results: ReadonlyArray<AssetCopyResult>
  ): ReadonlyMap<string, string> {
    const replacements = new Map<string, string>();
    const assetsBySourceUrl = new Map<string, AssetReference>();
    sourceAssets.forEach((asset) => assetsBySourceUrl.set(asset.absoluteSourceUrl, asset));

    results.forEach((result) => {
      if (!result.targetUrl) {
        return;
      }

      replacements.set(result.sourceUrl, result.targetUrl);

      const asset = assetsBySourceUrl.get(result.sourceUrl);
      if (asset) {
        replacements.set(asset.sourceUrl, result.targetUrl);
        replacements.set(asset.absoluteSourceUrl, result.targetUrl);
      }
    });

    return replacements;
  }

  private rewriteUrl(
    value: string | undefined,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>
  ): string | undefined {
    return value ? applyRewrites(value, replacements, prefixes) : value;
  }

  private rewriteCarriedFields(
    carriedFields: Readonly<Record<string, unknown>> | undefined,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string>
  ): Readonly<Record<string, unknown>> | undefined {
    if (!carriedFields || Object.keys(carriedFields).length === 0) {
      return carriedFields;
    }

    const rewritten: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(carriedFields)) {
      rewritten[name] = typeof value === 'string'
        ? rewriteGuid(applyRewrites(value, replacements, prefixes), guidMappings)
        : value;
    }
    return rewritten;
  }

  private rewriteCanvasHtml(
    html: string,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string>
  ): string {
    if (!html || (replacements.size === 0 && prefixes.size === 0 && guidMappings.size === 0)) {
      return html;
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc.body.firstElementChild) {
      return replaceAllUrls(html, replacements);
    }

    this.rewriteElementUrls(doc.body, replacements, prefixes, guidMappings, 0);
    return doc.body.innerHTML;
  }

  private rewriteElementUrls(
    element: HTMLElement,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string>,
    depth: number
  ): void {
    if (depth > MAX_TRAVERSAL_DEPTH) {
      return;
    }

    urlAttributeNames.forEach((attrName) => {
      const value = element.getAttribute(attrName);
      if (!value) {
        return;
      }
      const rewritten = applyRewrites(value, replacements, prefixes);
      if (rewritten !== value) {
        element.setAttribute(attrName, rewritten);
      }
    });

    const webPartData = element.getAttribute('data-sp-webpartdata');
    if (webPartData) {
      const rewritten = this.rewriteWebPartDataJson(webPartData, replacements, prefixes, guidMappings);
      if (rewritten !== webPartData) {
        element.setAttribute('data-sp-webpartdata', rewritten);
      }
    }

    for (const child of Array.from(element.children)) {
      this.rewriteElementUrls(child as HTMLElement, replacements, prefixes, guidMappings, depth + 1);
    }
  }

  private rewriteWebPartDataJson(
    json: string,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string>
  ): string {
    try {
      const data = JSON.parse(json) as Record<string, unknown>;
      return JSON.stringify(this.rewriteJsonUrls(data, replacements, prefixes, guidMappings, 0));
    } catch {
      return replaceAllUrls(json, replacements);
    }
  }

  private rewriteJsonUrls(
    value: unknown,
    replacements: ReadonlyMap<string, string>,
    prefixes: ReadonlyMap<string, string>,
    guidMappings: ReadonlyMap<string, string>,
    depth: number
  ): unknown {
    if (depth > MAX_TRAVERSAL_DEPTH) {
      return value;
    }

    if (typeof value === 'string') {
      return rewriteGuid(applyRewrites(value, replacements, prefixes), guidMappings);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.rewriteJsonUrls(item, replacements, prefixes, guidMappings, depth + 1));
    }

    if (value && typeof value === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, entry] of Object.entries(value)) {
        if (typeof entry === 'string' && (jsonUrlKeys.has(key.toLowerCase()) || this.looksLikeUrl(entry))) {
          result[key] = applyRewrites(entry, replacements, prefixes);
        } else {
          result[key] = this.rewriteJsonUrls(entry, replacements, prefixes, guidMappings, depth + 1);
        }
      }
      return result;
    }

    return value;
  }

  private looksLikeUrl(value: string): boolean {
    return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/');
  }
}

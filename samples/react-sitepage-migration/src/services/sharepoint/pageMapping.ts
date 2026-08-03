import type { IClientsidePage } from '@pnp/sp/clientside-pages';
import { normalizePageName, sitePagesSubfolder, stripAspxExtension } from '../../utilities/UrlUtilities';

export interface RawPageData {
  readonly pageId: string;
  readonly title: string;
  readonly pageName: string;
  readonly pageUrl: string;
  readonly pagePath: string;
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
  readonly unportableColumns?: ReadonlyArray<string>;
  readonly folderPath?: string;
  readonly isTemplate?: boolean;
  readonly authorName?: string;
  readonly authorEmail?: string;
  readonly lastModifiedDateTime?: string;
  readonly clientsidePage?: IClientsidePage;
}

export interface PageListItemResponse {
  readonly Id?: number;
  readonly Title?: string;
  readonly FileLeafRef?: string;
  readonly FileRef?: string;
  readonly Description?: string;
  readonly TopicHeader?: string;
  readonly BannerImageUrl?: { readonly Url?: string } | string;
  readonly ThumbnailUrl?: string;
  readonly CanvasContent1?: string;
  readonly LayoutWebpartsContent?: string;
  readonly PageLayoutType?: string;
  readonly PromotedState?: number | string;
  readonly FirstPublishedDate?: string;
  readonly Modified?: string;
}

export interface PageAuthor {
  readonly name?: string;
  readonly email?: string;
}

export interface PageFieldDefinition {
  readonly internalName: string;
  readonly typeAsString: string;
  readonly readOnly: boolean;
  readonly hidden: boolean;
  readonly fromBaseType: boolean;
  readonly canBeDeleted: boolean;
}

export const carriedPageFields: ReadonlyArray<string> = [
  '_CommentsDisabled',
  '_OriginalSourceUrl',
  '_OriginalSourceSiteId',
  '_OriginalSourceWebId',
  '_OriginalSourceListId',
  '_OriginalSourceItemId'
];

const portableFieldTypes: ReadonlySet<string> = new Set([
  'Text', 'Note', 'Number', 'Currency', 'Boolean',
  'DateTime', 'Choice', 'MultiChoice', 'URL', 'Integer'
]);

export const isCustomColumn = (field: PageFieldDefinition): boolean =>
  !field.fromBaseType && field.canBeDeleted && !field.readOnly && !field.hidden;

export const isPortableColumn = (field: PageFieldDefinition): boolean =>
  isCustomColumn(field) && portableFieldTypes.has(field.typeAsString);

export const selectCarriedFields = (
  listItem: Readonly<Record<string, unknown>>,
  sourceFields: ReadonlyArray<PageFieldDefinition> | undefined
): Readonly<Record<string, unknown>> => {
  const carried: Record<string, unknown> = {};

  carriedPageFields.forEach((name) => {
    const value = listItem[name];
    if (value !== undefined && value !== null) {
      carried[name] = value;
    }
  });

  (sourceFields ?? [])
    .filter(isPortableColumn)
    .forEach((field) => {
      const value = listItem[field.internalName];
      if (value !== undefined && value !== null) {
        carried[field.internalName] = value;
      }
    });

  return carried;
};

export const unportableColumns = (
  listItem: Readonly<Record<string, unknown>>,
  sourceFields: ReadonlyArray<PageFieldDefinition> | undefined
): ReadonlyArray<string> =>
  (sourceFields ?? [])
    .filter((field) => isCustomColumn(field) && !isPortableColumn(field))
    .filter((field) => {
      const value = listItem[field.internalName];
      return value !== undefined && value !== null && value !== '';
    })
    .map((field) => field.internalName);

export interface RawPageMappingInput {
  readonly pageUrl: string;
  readonly pagePath: string;
  readonly listItem: PageListItemResponse;
  readonly clientsidePage?: IClientsidePage;
  readonly author?: PageAuthor;
  readonly sourceFields?: ReadonlyArray<PageFieldDefinition>;
}

export const toRawPageData = (input: RawPageMappingInput): RawPageData => {
  const { listItem, pagePath, pageUrl } = input;

  if (listItem.Id === undefined) {
    throw new Error(`The Site Pages item for '${pagePath}' has no Id and cannot be migrated.`);
  }

  const fileName = pagePath.split('/').filter(Boolean).pop() ?? '';
  const bannerImageUrl = typeof listItem.BannerImageUrl === 'string'
    ? listItem.BannerImageUrl
    : listItem.BannerImageUrl?.Url;

  return {
    pageId: String(listItem.Id),
    title: listItem.Title?.trim() || stripAspxExtension(fileName),
    pageName: normalizePageName(listItem.FileLeafRef ?? fileName),
    pageUrl,
    pagePath: listItem.FileRef ?? pagePath,
    description: listItem.Description,
    topicHeader: listItem.TopicHeader,
    bannerImageUrl,
    thumbnailUrl: listItem.ThumbnailUrl,
    canvasContent1: listItem.CanvasContent1 ?? '',
    layoutWebpartsContent: listItem.LayoutWebpartsContent,
    pageLayoutType: listItem.PageLayoutType,
    promotedState: listItem.PromotedState !== undefined ? String(listItem.PromotedState) : undefined,
    firstPublishedDate: listItem.FirstPublishedDate,
    authorName: input.author?.name,
    authorEmail: input.author?.email,
    lastModifiedDateTime: listItem.Modified,
    carriedFields: selectCarriedFields(
      listItem as Readonly<Record<string, unknown>>,
      input.sourceFields
    ),
    unportableColumns: unportableColumns(
      listItem as Readonly<Record<string, unknown>>,
      input.sourceFields
    ),
    folderPath: sitePagesSubfolder(pagePath),
    clientsidePage: input.clientsidePage
  };
};

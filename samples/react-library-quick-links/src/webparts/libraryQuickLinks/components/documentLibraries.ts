import { SPHttpClient } from '@microsoft/sp-http';

export interface IDocumentLibrary {
  Id: string;
  Title: string;
  Description?: string;
  LastItemModifiedDate?: string;
  FileCount?: number;
  FolderCount?: number;
  SizeBytes?: number;
  RootFolder: {
    ServerRelativeUrl: string;
  };
}

interface ILibrariesResponse {
  value: IDocumentLibrary[];
  '@odata.nextLink'?: string;
  'odata.nextLink'?: string;
}

interface ILibraryItemsResponse {
  value: { FileSystemObjectType: number; File?: { Length: number | string } }[];
  '@odata.nextLink'?: string;
  'odata.nextLink'?: string;
}

export const defaultHiddenLibraries = 'Shared Documents';

const standardLibraryFolders = new Set([
  'siteassets',
  'style library',
  'formservertemplates',
  'sitecollectiondocuments',
  'sitecollectionimages',
  'publishingimages',
  'preservationholdlibrary'
]);

export async function getDocumentLibraries(
  spHttpClient: Pick<SPHttpClient, 'get'>,
  webUrl: string,
  includeMetadata: boolean = false
): Promise<IDocumentLibrary[]> {
  const siteUrl = webUrl.replace(/\/$/, '');
  const webPath = decodeURIComponent(new URL(siteUrl).pathname).replace(/\/$/, '').toLowerCase();
  const libraries: IDocumentLibrary[] = [];
  let nextUrl: string | undefined = `${siteUrl}/_api/web/lists` +
    '?$select=Id,Title,Description,LastItemModifiedDate,RootFolder/ServerRelativeUrl&$expand=RootFolder' +
    '&$filter=BaseTemplate eq 101 and Hidden eq false and IsCatalog eq false&$orderby=Title&$top=5000';

  while (nextUrl) {
    const response = await spHttpClient.get(nextUrl, SPHttpClient.configurations.v1);
    if (!response.ok) {
      throw new Error(`Unable to load document libraries (${response.status} ${response.statusText}).`);
    }

    const data: ILibrariesResponse = await response.json();
    libraries.push(...data.value.filter(library => {
      const folderPath = decodeURIComponent(library.RootFolder.ServerRelativeUrl).replace(/\/$/, '').toLowerCase();
      const relativePath = folderPath.substring(webPath.length + 1);
      return !standardLibraryFolders.has(relativePath) && relativePath.indexOf('_catalogs/') !== 0;
    }));
    const nextLink = data['@odata.nextLink'] || data['odata.nextLink'];
    nextUrl = nextLink ? new URL(nextLink, `${siteUrl}/`).href : undefined;
  }

  if (includeMetadata) {
    for (const library of libraries) {
      if (!library.LastItemModifiedDate || !Number.isFinite(Date.parse(library.LastItemModifiedDate))) {
        throw new Error(`Invalid last-updated date for library ${library.Id}.`);
      }

      let fileCount = 0;
      let folderCount = 0;
      let sizeBytes = 0;
      let itemsUrl: string | undefined = `${siteUrl}/_api/web/lists(guid'${library.Id}')/items` +
        '?$select=FileSystemObjectType,File/Length&$expand=File&$top=5000';

      while (itemsUrl) {
        const response = await spHttpClient.get(itemsUrl, SPHttpClient.configurations.v1);
        if (!response.ok) {
          throw new Error(`Unable to load library metadata (${response.status} ${response.statusText}).`);
        }
        const data: ILibraryItemsResponse = await response.json();
        for (const item of data.value) {
          if (item.FileSystemObjectType === 0) {
            const rawLength = item.File?.Length;
            const length = typeof rawLength === 'string' && /^\d+$/.test(rawLength) ? Number(rawLength) : rawLength;
            if (typeof length !== 'number' || !Number.isSafeInteger(length) || length < 0) {
              throw new Error(`Invalid file size in library ${library.Id}.`);
            }
            fileCount++;
            sizeBytes += length;
          } else if (item.FileSystemObjectType === 1) {
            folderCount++;
          } else {
            throw new Error(`Unexpected item type in library ${library.Id}.`);
          }
        }
        const nextLink = data['@odata.nextLink'] || data['odata.nextLink'];
        itemsUrl = nextLink ? new URL(nextLink, `${siteUrl}/`).href : undefined;
      }

      library.FileCount = fileCount;
      library.FolderCount = folderCount;
      library.SizeBytes = sizeBytes;
    }
  }

  return libraries;
}

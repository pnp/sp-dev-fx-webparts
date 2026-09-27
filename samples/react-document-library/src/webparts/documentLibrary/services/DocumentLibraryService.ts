import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx, SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/folders';
import '@pnp/sp/files';
import { IFileEntry, IFolderEntry, ILibraryContents } from '../components/IFileEntry';
import { isPathWithinRoot, joinServerRelativePath, normalizeServerRelativePath, PathValidationError, resolveFolderPath } from '../utils/fileUrl';
import { DocumentLibraryError, documentLibraryError } from './documentLibraryError';

interface IApiFolder {
  Name: string;
  ServerRelativeUrl: string;
}

interface IApiFile {
  Name: string;
  ServerRelativeUrl: string;
  TimeLastModified?: string;
  Length?: number | string;
}

function isSPFI(value: WebPartContext | SPFI): value is SPFI {
  return !!value && typeof (value as SPFI).web?.getFolderByServerRelativePath === 'function';
}

export class DocumentLibraryService {
  private readonly sp: SPFI;

  public constructor(contextOrSp: WebPartContext | SPFI) {
    this.sp = isSPFI(contextOrSp) ? contextOrSp : spfi().using(SPFx(contextOrSp));
  }

  public async resolveLibraryRoot(libraryTitle: string, libraryRootPath: string): Promise<string> {
    try {
      if (libraryRootPath.trim()) return normalizeServerRelativePath(libraryRootPath);
      if (!libraryTitle.trim()) throw new PathValidationError('Configure a library title or root path.');
      const lists = await this.sp.web.lists
        .filter(`Title eq '${libraryTitle.replace(/'/g, "''")}' and Hidden eq false`)
        .select('Title', 'RootFolder/ServerRelativeUrl')
        .expand('RootFolder')
        .top(1)();
      const root = lists[0]?.RootFolder?.ServerRelativeUrl;
      if (!root) throw new DocumentLibraryError('notFound', 'The configured library could not be found.');
      return normalizeServerRelativePath(root);
    } catch (error) {
      throw documentLibraryError(error);
    }
  }

  public async getContents(libraryRootPath: string, folderPath: string, pageSize: number, showFolders: boolean): Promise<ILibraryContents> {
    try {
      const root = normalizeServerRelativePath(libraryRootPath);
      const currentPath = resolveFolderPath(root, folderPath);
      const boundedPageSize = Number.isFinite(pageSize) ? Math.min(100, Math.max(1, Math.floor(pageSize))) : 25;
      const folder = this.sp.web.getFolderByServerRelativePath(currentPath);
      const folderQuery = folder.folders.select('Name', 'ServerRelativeUrl').top(boundedPageSize)();
      const fileQuery = folder.files.select('Name', 'ServerRelativeUrl', 'TimeLastModified', 'Length').top(boundedPageSize)();
      const [apiFolders, apiFiles] = await Promise.all([
        showFolders ? folderQuery : Promise.resolve([] as IApiFolder[]),
        fileQuery
      ]);
      return {
        path: currentPath,
        folders: (apiFolders as IApiFolder[]).map(item => this.mapFolder(root, item)),
        files: (apiFiles as IApiFile[]).map(item => this.mapFile(root, item))
      };
    } catch (error) {
      throw documentLibraryError(error);
    }
  }

  private mapFolder(root: string, item: IApiFolder): IFolderEntry {
    const path = normalizeServerRelativePath(item.ServerRelativeUrl);
    if (!isPathWithinRoot(root, path)) throw new PathValidationError('A returned folder is outside the library root.');
    return { name: item.Name, serverRelativeUrl: path };
  }

  private mapFile(root: string, item: IApiFile): IFileEntry {
    const path = normalizeServerRelativePath(item.ServerRelativeUrl);
    if (!isPathWithinRoot(root, path)) throw new PathValidationError('A returned file is outside the library root.');
    const length = typeof item.Length === 'string' ? Number(item.Length) : item.Length;
    return {
      name: item.Name,
      serverRelativeUrl: path,
      timeLastModified: item.TimeLastModified,
      length: length !== undefined && Number.isFinite(length) ? length : undefined
    };
  }

  /** Kept public for consumers that need to validate a folder action before loading it. */
  public validateChildPath(root: string, parent: string, childName: string): string {
    const child = joinServerRelativePath(parent, childName);
    if (!isPathWithinRoot(root, child)) throw new PathValidationError('The child is outside the library root.');
    return child;
  }
}

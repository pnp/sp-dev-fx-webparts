export interface IFileEntry {
  name: string;
  serverRelativeUrl: string;
  timeLastModified?: string;
  length?: number;
}

export interface IFolderEntry {
  name: string;
  serverRelativeUrl: string;
}

export interface ILibraryContents {
  folders: IFolderEntry[];
  files: IFileEntry[];
  path: string;
}

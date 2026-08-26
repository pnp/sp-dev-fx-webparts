import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from "@pnp/sp";

export interface IDocumentExplorerProps {
  description: string;
  selectedLibraries: string[];
  showFolderTree: boolean;
  showFileList: boolean;
  showFilterPanel: boolean;
  layoutType: string;
  context: WebPartContext;
  siteUrl: string;
  sp: SPFI;
}

export interface IDocumentExplorerState {
  libraries: ILibraryInfo[];
  folderTree: IFolderNode[];
  files: IFileItem[];
  filteredFiles: IFileItem[];
  selectedFolder: string;
  searchText: string;
  loading: boolean;
  error: string;
  filters: IFilters;
  authors: string[];
  fileTypes: string[];
}

export interface ILibraryInfo {
  title: string;
  url: string;
  serverRelativeUrl: string;
  hasAccess: boolean;
  error?: string;
}

export interface IFolderNode {
  name: string;
  path: string;
  serverRelativeUrl: string;
  children: IFolderNode[];
  expanded: boolean;
  library: string;
  hasChildren: boolean;
  loading?: boolean;
}

export interface IFileItem {
  name: string;
  serverRelativeUrl: string;
  fileType: string;
  modified: Date;
  modifiedBy: string;
  author: string;
  size: number;
  library: string;
  iconUrl: string;
}

export interface IFilters {
  author: string;
  fileType: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
}
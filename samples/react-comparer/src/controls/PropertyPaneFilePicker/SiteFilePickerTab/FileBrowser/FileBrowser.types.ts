import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IFileBrowserProps {
  libraryName: string;
  rootPath: string;
  accepts: string;
  context: WebPartContext;
  onChange: (imageUrl: string) => void;
  onOpenFolder: (folder: IFile) => void;
}

export interface IFileBrowserState {
  isLoading: boolean;
  items: IFile[];
  currentPath: string;
  fileUrl?: string;
  columns: IColumn[];
  selectedView: ViewType;
}

export interface IFile {
  docIcon: string;
  fileRef: string;
  fileLeafRef: string;
  modifiedBy?: string;
  modified: string;
  fileType?: string;
  fileSize?: number;
  isFolder: boolean;
  absoluteRef: string;
}

export type ViewType = 'list' | 'compact' | 'tiles';

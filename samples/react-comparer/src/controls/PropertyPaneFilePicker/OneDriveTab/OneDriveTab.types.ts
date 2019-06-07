import { IFilePickerTab } from "../IFilePickerTab.types";
import { IParentFolderInfo, IDimensions } from '../../../services/OneDriveServices';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IOneDriveTabProps extends IFilePickerTab {
  //inherited
}

export interface IOneDriveTabState {
  isLoading: boolean;
  files: IOneDriveFile[];
  fileUrl?: string;
  serverRelativeFolderUrl?: string;
  folderName?: string;
  hideDialog: boolean;
  parentFolderInfo: IParentFolderInfo[];
  selectedView: ViewType;
  columns: IColumn[];
}

export interface IOneDriveFile {
  name: string;
  absoluteUrl: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  modified: string;
  modifiedBy: string;
  fileType: string;
  fileIcon: string;
  fileSizeDisplay: string;
  totalFileCount: number;
  key: string;
  thumbnail: string;
  dimensions?: IDimensions;
  isShared: boolean;
}

export type ViewType = 'list' | 'compact' | 'tiles';

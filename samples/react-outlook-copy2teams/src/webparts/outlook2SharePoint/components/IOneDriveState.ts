import { IFolder } from '../../../model/IFolder';

export interface IOneDriveState {
  folders: IFolder[];
  grandParentFolder: IFolder;
  parentFolder: IFolder;
  showSpinner: boolean;
}
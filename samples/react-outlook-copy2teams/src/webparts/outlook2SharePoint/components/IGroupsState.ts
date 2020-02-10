import { IFolder } from '../../../model/IFolder';

export interface IGroupsState {
  folders: IFolder[];
  grandParentFolder: IFolder;
  parentFolder: IFolder;
  showSpinner: boolean;
}
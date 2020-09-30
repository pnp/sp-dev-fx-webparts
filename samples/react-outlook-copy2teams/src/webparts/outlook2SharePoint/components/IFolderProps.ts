import { IFolder } from '../../../model/IFolder';

export interface IFolderProps {
  folder: IFolder;
  subFolderCallback: (folder: IFolder) => void;
}
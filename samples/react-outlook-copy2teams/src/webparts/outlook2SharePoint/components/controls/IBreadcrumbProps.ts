import { IFolder } from '../../../../model/IFolder';

export interface IBreadcrumbProps {
  grandParentFolder: IFolder;
  parentFolder: IFolder;
  rootCallback: () => void;
  parentFolderCallback: (folder: IFolder) => void;
}
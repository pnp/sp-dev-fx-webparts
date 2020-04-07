import { IFolder } from '../../../model/IFolder';

export interface ITeamsState {
  folders: IFolder[];
  grandParentFolder: IFolder;
  parentFolder: IFolder;
  selectedTeamName: string;
  showSpinner: boolean;
}
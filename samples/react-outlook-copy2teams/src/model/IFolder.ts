
export interface IFolder {
  name: string;
  id: string;
  driveID: string;
  parentFolder: IFolder;
}
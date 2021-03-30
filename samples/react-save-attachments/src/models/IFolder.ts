export interface IFolder {
  id: string;
  name: string;
  driveID: string;
  parentFolder: IFolder;
  webUrl: string;
}
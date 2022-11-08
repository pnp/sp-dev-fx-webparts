// create File item to work with it internally
export interface IFile {
  Id: number;
  Title: string;
  Name: string;
  Size: number;
}

// create PnP JS response interface for File
export interface IResponseFile {
  Length: number;
}

// create PnP JS response interface for Item
export interface IResponseItem {
  Id: number;
  File: IResponseFile;
  FileLeafRef: string;
  Title: string;
}
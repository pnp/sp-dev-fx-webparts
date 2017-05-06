import { IResponseFile } from "./IResponseFile";
// create PnP JS response interface for Item
export interface IResponseItem {
  File: IResponseFile;
  FileLeafRef: string;
  Title: string;
}

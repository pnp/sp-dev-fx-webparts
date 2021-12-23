import { IFileItem } from "./IFileItem";

export interface ITermNode {
  name: string;
  guid: string;
  childDocuments: number;
  children: ITermNode[];
  subFiles: IFileItem[];
}
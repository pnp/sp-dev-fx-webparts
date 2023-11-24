import { IFacepilePersona } from "@fluentui/react";

export interface ISharingResult {
  FileExtension: string;
  FileName: string;
  LastModified: Date;
  SharedWith: IFacepilePersona[];
  ListId: string;
  ListItemId: number;
  Url: string;
  FolderUrl: string;
  Channel?: string;
  FileId?: string;
  SharingUserType?: any;
  SiteUrl?:string;
}
export default ISharingResult;
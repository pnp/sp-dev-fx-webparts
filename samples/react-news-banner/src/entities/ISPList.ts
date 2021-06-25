export interface ISPList {
  'odata.metadata': string;
  'odata.type': string;
  'odata.id': string;
  'odata.etag': string;
  'odata.editLink': string;
  AllowContentTypes: boolean;
  BaseTemplate: number;
  BaseType: number;
  ContentTypesEnabled: boolean;
  CrawlNonDefaultViews: boolean;
  Created: string;
  CurrentChangeToken: CurrentChangeToken;
  DefaultContentApprovalWorkflowId: string;
  DefaultItemOpenUseListSetting: boolean;
  Description: string;
  Direction: string;
  DisableCommenting: boolean;
  DisableGridEditing: boolean;
  DocumentTemplateUrl?: string;
  DraftVersionVisibility: number;
  EnableAttachments: boolean;
  EnableFolderCreation: boolean;
  EnableMinorVersions: boolean;
  EnableModeration: boolean;
  EnableRequestSignOff: boolean;
  EnableVersioning: boolean;
  EntityTypeName: string;
  ExemptFromBlockDownloadOfNonViewableFiles: boolean;
  FileSavePostProcessingEnabled: boolean;
  ForceCheckout: boolean;
  HasExternalDataSource: boolean;
  Hidden: boolean;
  Id: string;
  ImagePath: ImagePath;
  ImageUrl: string;
  IrmEnabled: boolean;
  IrmExpire: boolean;
  IrmReject: boolean;
  IsApplicationList: boolean;
  IsCatalog: boolean;
  IsPrivate: boolean;
  ItemCount: number;
  LastItemDeletedDate: string;
  LastItemModifiedDate: string;
  LastItemUserModifiedDate: string;
  ListExperienceOptions: number;
  ListItemEntityTypeFullName: string;
  MajorVersionLimit: number;
  MajorWithMinorVersionsLimit: number;
  MultipleDataList: boolean;
  NoCrawl: boolean;
  ParentWebPath: ImagePath;
  ParentWebUrl: string;
  ParserDisabled: boolean;
  ServerTemplateCanCreateFolders: boolean;
  TemplateFeatureId: string;
  Title: string;
}

interface ImagePath {
  DecodedUrl: string;
}

interface CurrentChangeToken {
  StringValue: string;
}

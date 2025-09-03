export interface ICustomAction {
  Id: string;
  Title: string;
  Description: string;
  Location: string;
  Sequence: number;
  ScriptBlock: string;
  ScriptSrc: string;
  Url: string;
  CommandUIExtension: string;
  RegistrationType: number;
  RegistrationId: string;
  Rights: string;
  Scope: CustomActionScope;
  Group: string;
  HostProperties: string;
  ClientSideComponentId: string;
  ClientSideComponentProperties: string;
  Name: string;
  ImageUrl: string;
}

export enum CustomActionScope {
  Web = 'Web',
  Site = 'Site',
  List = 'List'
}

export enum RegistrationType {
  None = 0,
  List = 1,
  ContentType = 2,
  ProgId = 3,
  FileType = 4
}

export interface ICustomActionFormData {
  title: string;
  description: string;
  location: string;
  sequence: number;
  scriptBlock?: string;
  scriptSrc?: string;
  url?: string;
  commandUIExtension?: string;
  registrationType: RegistrationType;
  registrationId?: string;
  rights?: string;
  group?: string;
  hostProperties?: string;
  clientSideComponentId?: string;
  clientSideComponentProperties?: string;
  name: string;
  imageUrl?: string;
}

export interface ICustomActionFilter {
  scope: CustomActionScope | 'All';
  searchTerm: string;
  location?: string;
  group?: string;
}

export interface ICustomActionOperationResult {
  success: boolean;
  message: string;
  customAction?: ICustomAction;
}

export interface IPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
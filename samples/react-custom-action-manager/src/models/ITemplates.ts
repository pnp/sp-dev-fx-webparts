export interface ICustomActionTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  author: string;
  version: string;
  createdDate: Date;
  modifiedDate: Date;
  isBuiltIn: boolean;
  isPublic: boolean;
  usage: number;
  rating: number;
  template: ITemplateDefinition;
  preview?: string;
  documentation?: string;
}

export enum TemplateCategory {
  JavaScript = 'JavaScript',
  CSS = 'CSS',
  Ribbon = 'Ribbon',
  Menu = 'Menu',
  SPFx = 'SPFx',
  Integration = 'Integration',
  Utility = 'Utility'
}

export interface ITemplateDefinition {
  title: string;
  description: string;
  location: string;
  sequence: number;
  scriptBlock?: string;
  scriptSrc?: string;
  url?: string;
  commandUIExtension?: string;
  registrationType: number;
  registrationId?: string;
  rights?: string;
  group?: string;
  hostProperties?: string;
  clientSideComponentId?: string;
  clientSideComponentProperties?: string;
  name: string;
  imageUrl?: string;
  parameters?: ITemplateParameter[];
}

export interface ITemplateParameter {
  name: string;
  displayName: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'url' | 'color' | 'choice';
  required: boolean;
  defaultValue?: any;
  choices?: string[];
  validation?: string;
  placeholder?: string;
}

export interface ITemplateApplication {
  templateId: string;
  parameterValues: { [key: string]: any };
  targetScope: 'Web' | 'Site';
  targetSites?: string[];
}
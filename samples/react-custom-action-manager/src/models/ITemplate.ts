import { ICustomAction, CustomActionScope } from './ICustomAction';

export interface ICustomActionTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  version: string;
  createdDate: Date;
  modifiedDate: Date;
  isBuiltIn: boolean;
  isActive: boolean;
  usageCount: number;
  rating: number;
  template: Partial<ICustomAction>;
  defaultScope: CustomActionScope;
  requiredParameters: ITemplateParameter[];
  optionalParameters: ITemplateParameter[];
  previewUrl?: string;
  documentationUrl?: string;
  icon?: string;
  screenshots?: string[];
}

export interface ITemplateParameter {
  name: string;
  displayName: string;
  description: string;
  type: TemplateParameterType;
  defaultValue?: any;
  required: boolean;
  validation?: IParameterValidation;
  options?: IParameterOption[];
  placeholder?: string;
  helpText?: string;
}

export enum TemplateParameterType {
  Text = 'text',
  Number = 'number',
  Boolean = 'boolean',
  Dropdown = 'dropdown',
  MultiSelect = 'multiselect',
  Url = 'url',
  Code = 'code',
  Color = 'color',
  Date = 'date'
}

export interface IParameterValidation {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  required?: boolean;
  customValidator?: string;
}

export interface IParameterOption {
  key: string;
  text: string;
  value: any;
  description?: string;
}

export interface ITemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  templateCount: number;
}

export interface ITemplateSearchCriteria {
  searchTerm: string;
  category: string[];
  tags: string[];
  author: string[];
  isBuiltIn: boolean | null;
  minRating: number;
  sortBy: TemplateSortField;
  sortDirection: 'asc' | 'desc';
}

export enum TemplateSortField {
  Name = 'name',
  CreatedDate = 'createdDate',
  ModifiedDate = 'modifiedDate',
  Rating = 'rating',
  UsageCount = 'usageCount',
  Category = 'category'
}

export interface ITemplateSearchResult {
  templates: ICustomActionTemplate[];
  totalCount: number;
  categories: ITemplateCategory[];
  tags: string[];
  authors: string[];
}

export interface ITemplateFormData {
  [key: string]: any;
}

export interface ITemplateValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
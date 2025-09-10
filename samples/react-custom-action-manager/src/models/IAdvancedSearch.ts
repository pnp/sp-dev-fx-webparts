import { ICustomAction } from './ICustomAction';

export interface IAdvancedSearchCriteria {
  searchTerm: string;
  scope: 'All' | 'Web' | 'Site';
  location: string[];
  group: string[];
  tags: string[];
  dateCreatedFrom?: Date;
  dateCreatedTo?: Date;
  dateModifiedFrom?: Date;
  dateModifiedTo?: Date;
  status: CustomActionStatus[];
  author: string[];
  category: string[];
  hasScript: boolean | null;
  hasUrl: boolean | null;
  isEnabled: boolean | null;
  sequenceFrom?: number;
  sequenceTo?: number;
  registrationType: number[];
}

export enum CustomActionStatus {
  Active = 'Active',
  Inactive = 'Inactive', 
  Broken = 'Broken',
  Deprecated = 'Deprecated',
  Testing = 'Testing'
}

export interface ISearchFilter {
  field: string;
  operator: SearchOperator;
  value: any;
  displayName: string;
}

export enum SearchOperator {
  Equals = 'eq',
  NotEquals = 'ne',
  Contains = 'contains',
  StartsWith = 'startswith',
  EndsWith = 'endswith',
  GreaterThan = 'gt',
  LessThan = 'lt',
  GreaterThanOrEqual = 'gte',
  LessThanOrEqual = 'lte',
  In = 'in',
  NotIn = 'nin'
}

export interface ISearchResult {
  items: IExtendedCustomAction[];
  totalCount: number;
  appliedFilters: ISearchFilter[];
  searchTime: number;
  suggestions: string[];
}

export interface IExtendedCustomAction extends ICustomAction {
  status: CustomActionStatus;
  tags: string[];
  category: string;
  author: string;
  createdDate: Date;
  modifiedDate: Date;
  lastUsed?: Date;
  usageCount: number;
  isHealthy: boolean;
  healthIssues?: string[];
  dependencies?: string[];
}
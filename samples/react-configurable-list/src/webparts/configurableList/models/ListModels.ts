export type FieldKind =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'boolean'
  | 'choice'
  | 'hyperlink'
  | 'person';

export interface ISharePointField {
  Id: string;
  Title: string;
  InternalName: string;
  EntityPropertyName?: string;
  TypeAsString: string;
  Hidden?: boolean;
  ReadOnlyField?: boolean;
  AllowMultipleValues?: boolean;
}

export interface IListField {
  id: string;
  title: string;
  internalName: string;
  kind: FieldKind;
  multiple: boolean;
}

export interface IListRecord {
  id: number;
  url: string;
  values: Record<string, unknown>;
}

export interface IListPage {
  records: IListRecord[];
  hasNext: boolean;
}

export interface IListQuery {
  select: string[];
  expand: string[];
  filter?: string;
  orderBy: string;
  ascending: boolean;
  top: number;
  skip: number;
}

export interface IListDataApi {
  getFields(listTitle: string): Promise<ISharePointField[]>;
  getItems(listTitle: string, query: IListQuery): Promise<Record<string, unknown>[]>;
}

export type ListErrorKind = 'permission' | 'throttled' | 'generic';

export interface IListError {
  kind: ListErrorKind;
  message: string;
}

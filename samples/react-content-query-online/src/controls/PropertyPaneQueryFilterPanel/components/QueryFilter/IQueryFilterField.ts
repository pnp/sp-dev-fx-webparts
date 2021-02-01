import { QueryFilterFieldType } from './QueryFilterFieldType';

export interface IQueryFilterField {
   internalName: string;
   displayName: string;
   type: QueryFilterFieldType;
}
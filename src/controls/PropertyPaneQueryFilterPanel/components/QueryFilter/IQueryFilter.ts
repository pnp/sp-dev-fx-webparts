import { IQueryFilterField }    from './IQueryFilterField';
import { QueryFilterOperator }  from './QueryFilterOperator';
import { QueryFilterJoin }      from './QueryFilterJoin';
import { IPersonaProps, ITag }  from 'office-ui-fabric-react';

export interface IQueryFilter {
   field: IQueryFilterField;
   operator: QueryFilterOperator;
   value: string | IPersonaProps[] | ITag[] | Date;
   expression?: string;
   includeTime?: boolean;
   me?: boolean;
   join: QueryFilterJoin;
}
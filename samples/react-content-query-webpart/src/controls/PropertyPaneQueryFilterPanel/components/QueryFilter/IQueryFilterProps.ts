import { IPersonaProps, ITag }  from 'office-ui-fabric-react';
import { IQueryFilter }         from './IQueryFilter';
import { IQueryFilterField }    from './IQueryFilterField';
import { IQueryFilterStrings }  from './IQueryFilterStrings';


export interface IQueryFilterProps {
    filter: IQueryFilter;
    fields: IQueryFilterField[];
    onLoadTaxonomyPickerSuggestions: (field: IQueryFilterField, filterText: string, currentTerms: ITag[]) => Promise<ITag[]>;
    onLoadPeoplePickerSuggestions: (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) => Promise<IPersonaProps[]>;
    onChanged?: (filter: IQueryFilter) => void;
    disabled?: boolean;
    strings: IQueryFilterStrings;
}
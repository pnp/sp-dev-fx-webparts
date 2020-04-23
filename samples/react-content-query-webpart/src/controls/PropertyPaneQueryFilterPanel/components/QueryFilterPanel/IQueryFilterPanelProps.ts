import { IPersonaProps, ITag }      from 'office-ui-fabric-react';
import { IQueryFilter }             from '../QueryFilter/IQueryFilter';
import { IQueryFilterField }        from '../QueryFilter/IQueryFilterField';
import { IQueryFilterPanelStrings } from './IQueryFilterPanelStrings';

export interface IQueryFilterPanelProps {
    filters: IQueryFilter[];
    loadFields: () => Promise<IQueryFilterField[]>;
    onLoadTaxonomyPickerSuggestions: (field: IQueryFilterField, filterText: string, currentTerms: ITag[]) => Promise<ITag[]>;
    onLoadPeoplePickerSuggestions: (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) => Promise<IPersonaProps[]>;
    onChanged?: (filters: IQueryFilter[]) => void;
    disabled?: boolean;
    trimEmptyFiltersOnChange?: boolean;
    strings: IQueryFilterPanelStrings;
    stateKey?: string;
}
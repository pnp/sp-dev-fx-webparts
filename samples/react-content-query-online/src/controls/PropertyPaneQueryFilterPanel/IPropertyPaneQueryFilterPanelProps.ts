import { IPersonaProps, ITag }      from 'office-ui-fabric-react';
import { IQueryFilter }             from './components/QueryFilter/IQueryFilter';
import { IQueryFilterField }        from './components/QueryFilter/IQueryFilterField';
import { IQueryFilterPanelStrings } from './components/QueryFilterPanel/IQueryFilterPanelStrings';

export interface IPropertyPaneQueryFilterPanelProps {
    filters: IQueryFilter[];
    loadFields: () => Promise<IQueryFilterField[]>;
    onLoadTaxonomyPickerSuggestions: (field: IQueryFilterField, filterText: string, currentTerms: ITag[]) => Promise<ITag[]>;
    onLoadPeoplePickerSuggestions: (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) => Promise<IPersonaProps[]>;
    onPropertyChange: (propertyPath: string, newFilters: IQueryFilter[]) => void;
    trimEmptyFiltersOnChange?: boolean;
    disabled?: boolean;
    strings: IQueryFilterPanelStrings;
}
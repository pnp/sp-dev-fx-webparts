import { IQueryFilter }         from '../QueryFilter/IQueryFilter';
import { IQueryFilterField }    from '../QueryFilter/IQueryFilterField';

export interface IQueryFilterPanelState {
    loading: boolean;
    fields: IQueryFilterField[];
    filters: IQueryFilter[];
    error: string;
}
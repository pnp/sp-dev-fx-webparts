import { IRefinementFilter } from '../../../../models/ISearchResult';
import SortDirection from '../../../../models/SortDirection';

interface IFilterPanelState {
    showPanel?: boolean;
    sortField?: string;
    sortDirection: SortDirection;
}

export default IFilterPanelState;
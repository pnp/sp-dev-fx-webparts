import { IRefinementFilter } from '../../../../models/ISearchResult';
import SortOrder from '../../../../models/SortOrder';

interface IFilterPanelState {
    showPanel?: boolean;
    sortField?: string;
    sortOrder: SortOrder;
}

export default IFilterPanelState;
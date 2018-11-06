import { IRefinementFilter } from '../../../../models/ISearchResult';
import { SortDirection } from "@pnp/sp";

interface IFilterPanelState {
    showPanel?: boolean;
    sortField?: string;
    sortDirection: SortDirection;
}

export default IFilterPanelState;
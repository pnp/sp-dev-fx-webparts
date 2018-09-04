import { IRefinementFilter } from '../../../../models/ISearchResult';

interface IFilterPanelState {
    showPanel?: boolean;
    selectedFilters?: IRefinementFilter[];
    expandedGroups?: number[];
}

export default IFilterPanelState;
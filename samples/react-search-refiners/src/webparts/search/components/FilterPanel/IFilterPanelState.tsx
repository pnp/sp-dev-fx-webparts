import { IRefinementFilter } from "../../../models/ISearchResult";

interface IFilterPanelState {
    showPanel?: boolean;
    selectedFilters?: IRefinementFilter[];
}

export default IFilterPanelState;
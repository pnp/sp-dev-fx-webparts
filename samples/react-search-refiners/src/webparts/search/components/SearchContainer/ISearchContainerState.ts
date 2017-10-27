import { ISearchResults, IRefinementFilter } from "../../../models/ISearchResult";

interface ISearchContainerState {
    results?: ISearchResults;
    selectedFilters?: IRefinementFilter[];
    currentPage?: number;
    errorMessage?: string;
    hasError?: boolean;
    areResultsLoading?: boolean;
}

export default ISearchContainerState;
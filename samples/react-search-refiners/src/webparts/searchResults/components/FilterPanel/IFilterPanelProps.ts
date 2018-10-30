import { IRefinementResult } from             '../../../../models/ISearchResult';
import RefinementFilterOperationCallback from '../../../../models/RefinementValueOperationCallback';

interface IFilterPanelProps {
    availableFilters: IRefinementResult[];
    refinersConfiguration: { [key: string]: string };
    onUpdateFilters: RefinementFilterOperationCallback;
    resetSelectedFilters: boolean;
}
  
export default IFilterPanelProps;
import { IRefinementResult } from             '../../../../models/ISearchResult';
import RefinementFilterOperationCallback from '../../../../models/RefinementValueOperationCallback';
import IRefinerConfiguration from '../../../../models/IRefinerConfiguration';

interface IFilterPanelProps {
    availableFilters: IRefinementResult[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
    resetSelectedFilters: boolean;
}
  
export default IFilterPanelProps;
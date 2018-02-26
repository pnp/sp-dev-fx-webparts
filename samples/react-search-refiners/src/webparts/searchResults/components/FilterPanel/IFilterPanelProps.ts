import { IRefinementResult } from "../../../models/ISearchResult";
import RefinementFilterOperationCallback from "../../../models/RefinementValueOperationCallback";

interface IFilterPanelProps {
    availableFilters: IRefinementResult[];
    onUpdateFilters: RefinementFilterOperationCallback;
}
  
export default IFilterPanelProps;
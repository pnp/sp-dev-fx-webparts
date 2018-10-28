import UpdateSortOperationCallback from '../../../../models/UpdateSortOperationCallback';
import SortOrder from '../../../../models/SortOrder';

interface ISortPanelProps {
    sortableFieldsConfiguration: { [key: string]: string };
    onUpdateSort: UpdateSortOperationCallback;
    sortOrder?:SortOrder;
    sortField?:string;
}
  
export default ISortPanelProps;
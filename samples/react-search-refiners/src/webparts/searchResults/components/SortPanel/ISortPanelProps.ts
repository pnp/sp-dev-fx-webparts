import UpdateSortOperationCallback from '../../../../models/UpdateSortOperationCallback';
import SortOrder from '../../../../models/SortOrder';

interface ISortPanelProps {
    sortableFieldsConfiguration: { [key: string]: string };
    onUpdateSort: UpdateSortOperationCallback;
    sortField?:string;
    sortOrder?:SortOrder;
}
  
export default ISortPanelProps;
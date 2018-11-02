import UpdateSortOperationCallback from '../../../../models/UpdateSortOperationCallback';
import SortDirection from '../../../../models/SortDirection';

interface ISortPanelProps {
    sortableFieldsConfiguration: { [key: string]: string };
    onUpdateSort: UpdateSortOperationCallback;
    sortDirection?:SortDirection;
    sortField?:string;
}
  
export default ISortPanelProps;
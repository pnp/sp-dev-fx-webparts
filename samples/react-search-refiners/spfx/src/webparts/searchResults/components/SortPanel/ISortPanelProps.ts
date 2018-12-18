import UpdateSortOperationCallback from '../../../../models/UpdateSortOperationCallback';
import { SortDirection } from "@pnp/sp";
import ISortableFieldConfiguration from '../../../../models/ISortableFieldConfiguration';

interface ISortPanelProps {
    sortableFieldsConfiguration: ISortableFieldConfiguration[];
    onUpdateSort: UpdateSortOperationCallback;
    sortDirection?:SortDirection;
    sortField?:string;
}
  
export default ISortPanelProps;
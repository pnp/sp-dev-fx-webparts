import UpdateSortOperationCallback from '../../../../models/UpdateSortOperationCallback';

interface ISortPanelProps {
    sortableFieldsConfiguration: { [key: string]: string };
    onUpdateSort: UpdateSortOperationCallback;
}
  
export default ISortPanelProps;
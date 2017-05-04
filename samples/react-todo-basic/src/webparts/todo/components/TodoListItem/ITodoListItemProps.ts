import ITodoItem from '../../models/ITodoItem';
import ItemOperationCallback from '../../models/ItemOperationCallback';

interface ITodoListItemProps {
  item: ITodoItem;
  isChecked?: boolean;
  onCompleteListItem: ItemOperationCallback;
  onDeleteListItem: ItemOperationCallback;
}

export default ITodoListItemProps;
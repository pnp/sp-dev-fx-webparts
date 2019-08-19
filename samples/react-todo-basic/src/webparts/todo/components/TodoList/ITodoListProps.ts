import ITodoItem from '../../models/ITodoItem';
import ItemOperationCallback from '../../models/ItemOperationCallback';

interface ITodoListProps {
  items: ITodoItem[];
  onCompleteTodoItem: ItemOperationCallback;
  onDeleteTodoItem: ItemOperationCallback;
}

export default ITodoListProps;
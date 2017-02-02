import * as React from 'react';
import { List, FocusZone, FocusZoneDirection, getRTLSafeKeyCode, KeyCodes } from 'office-ui-fabric-react';
import ITodoListProps from './ITodoListProps';
import TodoListItem from '../TodoListItem/TodoListItem';
import ITodoItem from '../../models/ITodoItem';
import styles from './TodoList.module.scss';

export default class TodoList extends React.Component<ITodoListProps, {}> {
  constructor(props: ITodoListProps) {
    super(props);

    this._onRenderCell = this._onRenderCell.bind(this);
  }

  public render(): JSX.Element {
    return (
      <FocusZone
        direction={ FocusZoneDirection.vertical }
        isInnerZoneKeystroke={ (ev: React.KeyboardEvent<HTMLElement>) => ev.which === getRTLSafeKeyCode(KeyCodes.right) }
        >
        <List
          className={ styles.todoList }
          items={ this.props.items }
          onRenderCell={ this._onRenderCell }
          />
      </FocusZone>
    );
  }

  private _onRenderCell(item: ITodoItem, index: number) {
    return (
      <TodoListItem item= { item }
        isChecked={ item.PercentComplete >= 1 ? true : false }
        onCompleteListItem={this.props.onCompleteTodoItem}
        onDeleteListItem={this.props.onDeleteTodoItem} />
    );
  }
}
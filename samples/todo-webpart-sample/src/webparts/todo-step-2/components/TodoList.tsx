/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoList.tsx
 */

import * as React from 'react';
import { Compare } from '@microsoft/sp-client-base';
import {
  FocusZone,
  FocusZoneDirection,
  IFocusZoneProps,
  List,
  KeyCodes,
  getRTLSafeKeyCode
} from 'office-ui-fabric-react';

import {
  ITodoTask,
  ItemOperationCallback
} from '../ITodoWebPartProps';

import TodoItem, { ITodoItemProps } from './TodoItem';

import styles from '../style/Todo.module.scss';

/**
 * Props of TodoList component.
 */
export interface ITodoListProps {
  /**
   * The Todo items rendered in this List component.
   */
  items: ITodoTask[];

  /**
   * Whether to show who created the task.
   */
  shouldShowCreatedBy: boolean;

  /**
   * Whether to show who mark the task as complete.
   */
  shouldShowCompletedBy: boolean;

  /**
   * onToggleComplete callback triggered when checkbox of one item is checked or unchecekd.
   */
  onToggleComplete: ItemOperationCallback;

  /**
   * onDeleteItem callback triggered when delete of one item is triggered.
   */
  onDeleteItem: ItemOperationCallback;
}

/**
 * The TodoList component using fabric-react component <List> <FocusZone>
 *
 * Link of <List>: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/list
 * Link of <FocusZone>: https://fabricreact.azurewebsites.net/fabric-react/master/#examples/focuszone
 */
export default class TodoList extends React.Component<ITodoListProps, {}> {
  constructor(props: ITodoListProps) {
    super(props);

    this._onRenderCell = this._onRenderCell.bind(this);
  }

  public shouldComponentUpdate(nextProps: ITodoListProps, nextState: {}): boolean {
    return !Compare.shallowCompare(this.props, nextProps) || !Compare.shallowCompare(this.state, nextState);
  }

  public render(): React.ReactElement<IFocusZoneProps> {
    return (
      <FocusZone
        direction={ FocusZoneDirection.vertical }
        isInnerZoneKeystroke={ (ev: React.KeyboardEvent) => ev.which === getRTLSafeKeyCode(KeyCodes.right) }
      >
        <List
          className={ styles.todoList }
          items={ this.props.items }
          onRenderCell={ this._onRenderCell }
        />
      </FocusZone>
    );
  }

  private _onRenderCell(item: ITodoTask): React.ReactElement<ITodoItemProps> {
    return (
      <TodoItem
        { ...this.props }
        key={ item.Id }
        item={ item }
      />
    );
  }
}

/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoTabs.tsx
 */

import * as React from 'react';
import { Compare } from '@microsoft/sp-client-base';

import { format } from '../common/Utils';

import {
  Pivot,
  PivotItem,
  IPivotProps,
  PivotLinkSize
} from 'office-ui-fabric-react';

import {
  ITodoTask,
  ItemOperationCallback
} from '../ITodoWebPartProps';

import TodoList from './TodoList';

import * as strings from 'todoStep3Strings';
import styles from '../style/Todo.module.scss';

/**
 * The tab type used as the key of the PivotItem.
 */
enum TabType {
  /**
   * The tab showing the active tasks.
   */
  Active,

  /**
   * The tab showing the completed tasks.
   */
  Completed,

  /**
   * The tab showing all tasks in the list.
   */
  All
}

/**
 * Props of TodoTabs component.
 */
export interface ITodoTabsProps {
  /**
   * The list items rendered in TodoTabs.
   * It will be filtered in each PivotItems by needs.
   */
  items: ITodoTask[];

  /**
   * Whether to show completed tasks.
   *
   * If it is set to false, the tab of completed tasks will be hiden, and
   * there will be no completed tasks shown in the list.
   */
  shouldShowCompletedTasks: boolean;

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
 * The TodoTabs component using fabric-react component <Pivot>.
 *
 * Link of <Pivot>: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/pivot
 */
export default class TodoTabs extends React.Component<ITodoTabsProps, {}> {
  public shouldComponentUpdate(nextProps: ITodoTabsProps, nextState: {}): boolean {
    return !Compare.shallowCompare(this.props, nextProps) || !Compare.shallowCompare(this.state, nextState);
  }

  public render(): React.ReactElement<IPivotProps> {
    const pivotArray: IPivotProps[] = [];

    const activeTasks: ITodoTask[] = [];
    const completedTasks: ITodoTask[] = [];

    this.props.items.forEach((item: ITodoTask) => {
      if (item.PercentComplete < 1) {
        activeTasks.push(item);
      } else if (this.props.shouldShowCompletedTasks) {
        completedTasks.push(item);
      }
    });

    const allTasks: ITodoTask[] = activeTasks.concat(completedTasks);

    if (activeTasks.length > 0) {
      pivotArray.push(
        this._renderPivotItemList(activeTasks, strings.TodoListTabNameActive, TabType.Active)
      );
    }

    if (completedTasks.length > 0 && this.props.shouldShowCompletedTasks) {
      pivotArray.push(
        this._renderPivotItemList(completedTasks, strings.TodoListTabNameCompleted, TabType.Completed)
      );
    }

    if (allTasks.length > 0) {
      pivotArray.push(
        this._renderPivotItemList(allTasks, strings.TodoListTabNameAllTasks, TabType.All)
      );
    }

    return pivotArray.length > 0
      ? (
        <div className={ styles.todoPivot }>
          <Pivot linkSize={ PivotLinkSize.large }>
            { pivotArray }
          </Pivot>
        </div>
      )
      : null; // tslint:disable-line:no-null-keyword
  }

  private _renderPivotItemList(
    tasks: ITodoTask[],
    tabName: string,
    tabKey: TabType
  ): React.ReactElement<IPivotProps> {
    return (
      <PivotItem
        linkText={ format(tabName, tasks.length) }
        itemKey={ tabKey }
        key={ tabKey }
      >
        <TodoList
          { ...this.props }
          items={ tasks }
          onToggleComplete={ this.props.onToggleComplete }
          onDeleteItem={ this.props.onDeleteItem }
        />
      </PivotItem>
    );
  }
}

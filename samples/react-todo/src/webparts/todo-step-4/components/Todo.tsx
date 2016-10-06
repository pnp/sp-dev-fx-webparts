/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Todo.tsx
 */

import * as React from 'react';
import { Compare } from '@microsoft/sp-client-base';
import {
  Spinner,
  SpinnerType
} from 'office-ui-fabric-react';

import {
  ITodoWebPartProps,
  ITodoComponentData,
  LoadingStatus,
  ItemOperationCallback
} from '../ITodoWebPartProps';

import TodoForm from './TodoForm';
import TodoTabs from './TodoTabs';

import * as strings from 'todoStep4Strings';
import styles from '../style/Todo.module.scss';

/**
 * Props for Todo component.
 */
export interface ITodoProps extends ITodoComponentData, ITodoWebPartProps {
  /**
   * onCreateItem callback triggered when we add a new item to the tasks list.
   * Either triggered by clicking on add button or pressed Enter key in input field.
   */
  onCreateItem: ItemOperationCallback;

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
 * Todo component is the top level react component of this web part.
 * It uses fabric-react component <Spinner>
 *
 * Link of Spinner: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/spinner
 */
export default class Todo extends React.Component<ITodoProps, {}> {
  public shouldComponentUpdate(nextProps: ITodoProps, nextState: {}): boolean {
    return !Compare.shallowCompare(this.props, nextProps) || !Compare.shallowCompare(this.state, nextState);
  }

  public render(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    return (
      <div className={ styles.todo }>
        <div className={ styles.topRow }>
          <h2 className={ styles.todoHeading }>{ strings.TodoListTitle }</h2>
          { this._workingOnItSpinner }
        </div>
        <TodoForm
          onSubmit={ this.props.onCreateItem }
        />
        <TodoTabs
          { ...this.props }
          items={ this.props.selectedListItems }
          onToggleComplete={ this.props.onToggleComplete }
          onDeleteItem={ this.props.onDeleteItem }
        />
        { this._fetchingSpinner }
      </div>
    );
  }

  private get _workingOnItSpinner(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    return this.props.loadingStatus === LoadingStatus.UpdatingTasks
      ? (
        <div className={ styles.workingOnItSpinner }>
          <Spinner type={ SpinnerType.normal } />
        </div>
      )
      : null; // tslint:disable-line:no-null-keyword
  }

  private get _fetchingSpinner(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    return this.props.loadingStatus === LoadingStatus.FetchingTasks
      ? (
        <div className={ styles.fetchingTasksSpinner }>
          <Spinner
            type={ SpinnerType.large }
            label= { strings.FetchingTasksLabel }
          />
        </div>
      )
      : null; // tslint:disable-line:no-null-keyword
  }
}

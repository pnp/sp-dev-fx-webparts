/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoItem.tsx
 */

import * as React from 'react';
import { Compare } from '@microsoft/sp-client-base';
import {
  Checkbox,
  Button,
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  DocumentCardActivity,
  css
} from 'office-ui-fabric-react';

import { format } from '../common/Utils';

import {
  ITodoTask,
  ITodoPerson,
  ItemOperationCallback
} from '../ITodoWebPartProps';

import * as strings from 'todoStep2Strings';
import styles from '../style/Todo.module.scss';

/**
 * The props for TodoItem component.
 */
export interface ITodoItemProps {
  /**
   * The current Todo item to be rendered.
   */
  item: ITodoTask;

  /**
   * Whether to show who created the task.
   */
  shouldShowCreatedBy: boolean;

  /**
   * Whether to show who mark the task as complete.
   */
  shouldShowCompletedBy: boolean;

  /**
   * onToggleComplete callback triggered when checkbox of this item is checked or unchecked.
   */
  onToggleComplete: ItemOperationCallback;

  /**
   * onDeleteItem callback triggered when delete button of this item is triggered.
   */
  onDeleteItem: ItemOperationCallback;
}

/**
 * States for TodoItem component.
 */
export interface ITodoItemState {
  /**
   * isDeleting indicates whether we are deleting this item.
   * If the item is being deleted, we will add animation to it.
   */
  isDeleting: boolean;
}

/**
 * TodoItem component using fabric-react component <FocusZone> <Checkbox> <Button> <DocumentCardActivity>.
 *
 * Link of FocusZone: https://fabricreact.azurewebsites.net/fabric-react/master/#examples/focuszone
 * Link of Checkbox: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/checkbox
 * Link of Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 * Link of DocumentCardActivity: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/documentcard
 */
export default class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  private static ANIMATION_TIMEOUT: number = 200;

  private _animationTimeoutId: number;

  constructor(props: ITodoItemProps) {
    super(props);

    this._handleToggleChanged = this._handleToggleChanged.bind(this);
    this._handleClick = this._handleClick.bind(this);

    this.state = { isDeleting: false };
  }

  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState): boolean {
    return !Compare.shallowCompare(this.props, nextProps) || !Compare.shallowCompare(this.state, nextState);
  }

  public componentWillUnmount(): void {
    window.clearTimeout(this._animationTimeoutId);
  }

  public render(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    const className: string = css(
      styles.todoItem,
      'ms-Grid',
      'ms-u-slideDownIn20',
      {
        [styles.isCompleted]: this.props.item.PercentComplete >= 1,
        'ms-u-slideUpOut20': this.state.isDeleting
      }
    );

    return (
      <div
        role='row'
        className={ className }
        aria-label={ this._ariaLabel }
        data-is-focusable={ true }
      >
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <div className={ css(styles.itemTaskRow, 'ms-Grid-row') }>
            <Checkbox
              className={ css(styles.checkbox, 'ms-Grid-col', 'ms-u-sm11') }
              label={ this.props.item.Title }
              onChange={ this._handleToggleChanged }
              checked={ this.props.item.PercentComplete >= 1 }
            />
            <Button
              className={ css(styles.deleteButton, 'ms-Grid-col', 'ms-u-sm1') }
              buttonType={ ButtonType.icon }
              icon='X'
              onClick={ this._handleClick }
              ariaLabel={ strings.DeleteItemAriaLabel }
              rootProps={{
                title: strings.DeleteItemTitle
              }}
            />
          </div>
          <div className={ css(styles.itemPeopleRow, 'ms-Grid-row') }>
            {
              this._renderPersona(
                strings.TodoItemCreateLabel,
                this.props.item.Author,
                this.props.shouldShowCreatedBy
              )
            }
            {
              this._renderPersona(
                strings.TodoItemCompleteLabel,
                this.props.item.Editor,
                this.props.shouldShowCompletedBy && this.props.item.PercentComplete >= 1
              )
            }
          </div>
        </FocusZone>
      </div>
    );
  }

  private _renderPersona(
    activity: string,
    person: ITodoPerson,
    shouldShow: boolean
  ): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    return person && shouldShow
      ? <DocumentCardActivity
          activity={ activity }
          people={[
            {
              name: person.Title,
              profileImageSrc: person.Picture
            }
          ]}
        />
      : undefined;
  }

  private get _ariaLabel(): string {
    const completeState: string = this.props.item.PercentComplete >= 1
      ? strings.TodoItemAriaLabelCheckedState
      : strings.TodoItemAriaLabelUncheckedState;
    const titleString: string = format(strings.TodoItemAriaLabelTitle, this.props.item.Title);
    const createdBy: string = format(strings.TodoItemAriaLabelCreator, this.props.item.Author.Title);
    const completedBy: string = this.props.item.PercentComplete >= 1
      ? format(strings.TodoItemAriaLabelEditor, this.props.item.Editor && this.props.item.Editor.Title)
      : '';

    return format(strings.TodoItemAriaLabel, completeState, titleString, createdBy, completedBy);
  }

  private _handleToggleChanged(ev: React.FormEvent, isChecked: boolean): void {
    this._handleWithAnimation(this.props.onToggleComplete);
  }

  private _handleClick(event: React.MouseEvent): void {
    this._handleWithAnimation(this.props.onDeleteItem);
  }

  private _handleWithAnimation(callback: (task: ITodoTask) => void): void {
    this.setState({ isDeleting: true });

    // After ANIMATION_TIMEOUT milliseconds, the animation is finished and
    // we will delete the item from the task list and remove the animation from it.
    window.clearTimeout(this._animationTimeoutId);
    this._animationTimeoutId = window.setTimeout(
      () => {
        this.setState({ isDeleting: false });

        callback(this.props.item);
      },
      TodoItem.ANIMATION_TIMEOUT
    );
  }
}

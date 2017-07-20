import * as React from 'react';
import {
  Checkbox,
  Button,
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  css
} from 'office-ui-fabric-react';
import styles from './TodoListItem.module.scss';
import ITodoItem from '../../models/ITodoItem';
import ITodoListItemProps from './ITodoListItemProps';
import * as update from 'immutability-helper';

export default class TodoListItem extends React.Component<ITodoListItemProps,{}> {

  constructor(props: ITodoListItemProps) {
    super(props);

    this._handleToggleChanged = this._handleToggleChanged.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  public shouldComponentUpdate(newProps: ITodoListItemProps): boolean {
    return (
      this.props.item !== newProps.item ||
      this.props.isChecked !== newProps.isChecked
    );
  }

  public render(): JSX.Element {
    const classTodoItem: string = css(
      styles.todoListItem,
      'ms-Grid',
      'ms-u-slideDownIn20'
    );

    return (
      <div
        role='row'
        className={ classTodoItem }
        data-is-focusable={ true }
        >
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <div className={ css(styles.itemTaskRow, 'ms-Grid-row') }>
            <Checkbox
              className={ css(styles.checkbox, 'ms-Grid-col', 'ms-u-sm11') }
              label={this.props.item.Title}
              onChange={ this._handleToggleChanged }
              checked={ this.props.isChecked }
              />
            <Button
              className={ css(styles.deleteButton, 'ms-Grid-col', 'ms-u-sm1') }
              buttonType={ ButtonType.icon }
              icon='Cancel'
              onClick={this._handleDeleteClick}
              />
          </div>
        </FocusZone>
      </div>
    );
  }

  private _handleToggleChanged(ev: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    const newItem: ITodoItem = update(this.props.item, {
      PercentComplete: { $set: this.props.item.PercentComplete >= 1 ? 0 : 1 }
    });

    this.props.onCompleteListItem(newItem);
  }

  private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
      this.props.onDeleteListItem(this.props.item);
  }
}
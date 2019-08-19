import * as React from 'react';
import { IOrder } from './IOrder';

export interface IListItem {
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  metaText?: string;
  isUnread?: boolean;
  isSelectable?: boolean;
}

export interface IListItemAction {
  icon: string;
  item: IOrder;
  action: () => void;
}

export interface IListItemProps {
  item: IListItem;
  actions?: IListItemAction[];
}

export class ListItem extends React.Component<IListItemProps, {}> {
  public render(): JSX.Element {
    const item: IListItem = this.props.item;
    const actions: JSX.Element[] = this.props.actions ? this.props.actions.map((action: IListItemAction, index: number): JSX.Element => {
      return (
        <div className='ms-ListItem-action' onClick={() => { action.action(); return false; }} key={action.item.Id + index}><i className={'ms-Icon ms-Icon--' + action.icon}></i></div>
      );
    }) : [];
    return (
      <div className={'ms-ListItem' + (item.isUnread ? ' is-unread' : '') + (item.isSelectable ? 'is-selectable' : '')}>
        <span className='ms-ListItem-primaryText'>{ item.primaryText }</span>
        <span className='ms-ListItem-secondaryText'>{ item.secondaryText }</span>
        <span className='ms-ListItem-tertiaryText'>{ item.tertiaryText }</span>
        <span className='ms-ListItem-metaText'>{ item.metaText }</span>
        <div className="ms-ListItem-actions">
          {actions}
        </div>
      </div>
    );
  }
}
import * as React from 'react';
import { IListItemProps } from './IListItemProps';
import { IListItem } from './IListItem';
import { IListItemAction } from './IListItemAction';
import styles from './UpcomingMeetings.module.scss';

export class ListItem extends React.Component<IListItemProps, {}> {
  public render(): JSX.Element {
    const item: IListItem = this.props.item;
    const actions: JSX.Element[] = this.props.actions.map((action: IListItemAction, index: number): JSX.Element => {
      console.warn(action.icon);
      return (
        <div className={styles.listItemAction} onClick={() => { action.action(); return false; }} key={action.item.id + index} role="button"><i className={`${styles.icon} ${styles['icon' + action.icon]}`}></i></div>
      );
    });
    return (
      <div className={styles.listItem + (item.isUnread ? ` ${styles.isUnread}` : '') + (item.isSelectable ? styles.isSelectable : '')}>
        <span className={styles.listItemPrimaryText}>{ item.primaryText }</span>
        <span className={styles.listItemSecondaryText}>{ item.secondaryText }</span>
        <span className={styles.listItemTertiaryText}>{ item.tertiaryText }</span>
        <span className={styles.listItemMetaText}>{ item.metaText }</span>
        <div className={styles.listItemActions}>
          {actions}
        </div>
      </div>
    );
  }
}
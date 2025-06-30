import * as React from 'react';
import styles from './ListItems.module.scss';
import type { IListItemsProps } from './IListItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ListItems extends React.Component<IListItemsProps, {}> {
  public render(): React.ReactElement<IListItemsProps> {
    const {
      listName,
      itemName,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.listItems} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>List name: <strong>{escape(listName)}</strong></div>
          <div>Item name: <strong>{escape(itemName)}</strong></div>
        </div>
      </section>
    );
  }
}

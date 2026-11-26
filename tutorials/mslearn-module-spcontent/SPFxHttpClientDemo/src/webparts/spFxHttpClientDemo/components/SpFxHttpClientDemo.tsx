import * as React from 'react';
import styles from './SpFxHttpClientDemo.module.scss';
import type { ISpFxHttpClientDemoProps } from './ISpFxHttpClientDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import welcomeDark from '../assets/welcome-dark.png';
import welcomeLight from '../assets/welcome-light.png';

export default class SpFxHttpClientDemo extends React.Component<ISpFxHttpClientDemoProps> {
  public render(): React.ReactElement<ISpFxHttpClientDemoProps> {
    const {
      spListItems,
      isDarkTheme,
      environmentMessage,
      userDisplayName
    } = this.props;

    return (
      <section className={styles.spFxHttpClientDemo}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? welcomeDark : welcomeLight} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={this.onGetListItemsClicked}>Get Countries</button>
          <button type="button" onClick={this.onAddListItemClicked}>Add List Item</button>
          <button type="button" onClick={this.onUpdateListItemClicked}>Update List Item</button>
          <button type="button" onClick={this.onDeleteListItemClicked}>Delete List Item</button>
        </div>
        <div>
          <ul>
            {spListItems && spListItems.map((list) =>
              <li key={list.Id}>
                <strong>Id:</strong> {list.Id}, <strong>Title:</strong> {list.Title}
              </li>
            )
            }
          </ul>
        </div>
      </section>
    );
  }

  private onGetListItemsClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (this.props.onGetListItems) this.props.onGetListItems();
  }

  private onAddListItemClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (this.props.onAddListItem) this.props.onAddListItem();
  }

  private onUpdateListItemClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (this.props.onUpdateListItem) this.props.onUpdateListItem();
  }

  private onDeleteListItemClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (this.props.onDeleteListItem) this.props.onDeleteListItem();
  }
}

import * as React from 'react';
import styles from './ListItems.module.scss';
import type { IListItemsProps } from './IListItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

export default class ListItems extends React.Component<IListItemsProps, {}> {
  public render(): React.ReactElement<IListItemsProps> {
    const {
      listName,
      itemName,
      onConfigure
    } = this.props;

    if (!listName || !itemName) {
      return (
        <Placeholder
          iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part by selecting a list and an item from the property pane.'
          buttonLabel='Configure'
          onConfigure={onConfigure}
        />
      );
    }

    return (
      <section className={styles.listItems}>
        <div className={styles.welcome}>
          <h2>Cascading Dropdowns Demo</h2>
          <div>
            <p>Selected List: <strong>{escape(listName)}</strong></p>
            <p>Selected Item: <strong>{escape(itemName)}</strong></p>
          </div>
        </div>
      </section>
    );
  }
}

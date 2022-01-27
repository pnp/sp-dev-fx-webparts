import * as React from 'react';
import * as strings from 'DragAndDropFollowedSitesWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import INoItemsProps from './INoItemsProps';
import INoItemsState from './INoItemsState';
import styles from './NoItems.module.scss';

export default class NoItems extends React.Component<INoItemsProps, INoItemsState> {
  public render() {
    return (
      <div className={styles.panel}>
        <div>
          <Icon iconName={'Sad'} />
        </div>
        <div>
          <label>{strings.NoItemsText}</label>
        </div>
      </div>
    );
  }
}

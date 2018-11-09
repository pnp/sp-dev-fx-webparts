import * as React from 'react';
import styles from './ReactRelatedItems.module.scss';
import { IReactRelatedItemsProps } from './IReactRelatedItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class ReactRelatedItems extends React.Component<IReactRelatedItemsProps, {}> {
  public render(): React.ReactElement<IReactRelatedItemsProps> {
    return (
      <div className={styles.reactRelatedItems}>

        <Link href={this.props.url}>
        <Label>
          Related Item :

        </Label>
        {this.props.title}
        </Link>
      </div>
    );
  }
}

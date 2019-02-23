import * as React from 'react';
import styles from './PageSectionsNavigation.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IAnchorItem } from '../../../common/model';

export interface IPageSectionsNavigationProps {
  anchors: IAnchorItem[];
}


export class PageSectionsNavigation extends React.Component<IPageSectionsNavigationProps, {}> {
  public render(): React.ReactElement<IPageSectionsNavigationProps> {
    return (
      <ul className={styles.pageSectionsNavigation}>
        {this.props.anchors.map(anchor => { return <li>{anchor.title}</li>; })}
      </ul>
    );
  }
}

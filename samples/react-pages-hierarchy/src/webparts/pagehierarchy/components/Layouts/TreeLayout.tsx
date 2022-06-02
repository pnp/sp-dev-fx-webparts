import * as React from 'react';
import styles from './Layouts.module.scss';
import { ILayoutProps } from './ILayoutProps';
import * as strings from 'PageHierarchyWebPartStrings';
import { Nav } from 'office-ui-fabric-react';

export const TreeLayout: React.FunctionComponent<ILayoutProps> = props => {
    return(
    <div className={styles.layouts}>
      {props.nav ? (
        <ul className={styles.listLayout}>
          {<Nav groups={[{ links: [props.nav]}]} selectedKey={(props.pageId ?? '1').toString()} />}
        </ul>
      ) : (
          <span>{strings.Message_NoChildrenFound}</span>
        )}
    </div>);
};

import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './ImageManipulation.module.scss';

import { IImageManipulationSettings, manipulationTypeData } from './ImageManipulation.types';

export const historyItem = (item:IImageManipulationSettings, index:number): JSX.Element => {
  if(!item) {
    return undefined;
  }
  const data=manipulationTypeData[item.type];

  const detailrender = data.toHTML(item);
    return (
        <span  className={styles.historyItem}>
          <span className={styles.historyItemIcon}>{data.svgIcon ? <img className={styles.historyItemSvg} src={data.svgIcon} /> : <Icon iconName={data.iconName} />}</span>
          <span className={styles.historyItemText}>{data.text}</span>
          <span className={styles.historyItemDetails}>{detailrender}</span>
        </span>
    );
};

import * as React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from '../sortableList/Sortable.module.scss';

export default SortableElement(({ item }) => {
  const DragHandle = SortableHandle(() =>
    <label className={styles.moveButton}>
      <Icon iconName={'Move'} />
    </label>);
  const tileItem = item;
  let displayName = tileItem.name;
  if (displayName.length >= 15) {
    displayName = `${displayName.substring(0, 13)}...`;
  }

  return (
    <div className={styles.sortableItem}>
      <DragHandle />
      <a className={styles.sortableInnerItem} href={tileItem.url}>
        <span>{displayName}</span>
      </a>
    </div>
  );
});
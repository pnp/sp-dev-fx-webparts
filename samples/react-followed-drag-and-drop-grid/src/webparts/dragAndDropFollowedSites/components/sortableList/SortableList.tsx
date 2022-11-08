import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import styles from './Sortable.module.scss';
import SortableItem from '../sortableItem/SortableItem';

export default SortableContainer(({ items }) => (
  <div className={styles.sortableContainer}>
    {items.map((item, index) => (
      <SortableItem
        key={index}
        index={index}
        item={item}
      />
    ))}
  </div>
));
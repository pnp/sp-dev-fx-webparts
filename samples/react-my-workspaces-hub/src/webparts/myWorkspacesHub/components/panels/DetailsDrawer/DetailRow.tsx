import * as React from 'react';
import { Text } from '@fluentui/react-components';
import styles from './DetailsDrawer.module.scss';
import { IDetailRowProps } from './IDetailRowProps';

/** A label/value row in the site details drawer. */
const DetailRow: React.FC<IDetailRowProps> = ({ label, value }) => (
  <div className={styles.row}>
    <Text weight="semibold" className={styles.label}>
      {label}
    </Text>
    <Text>{value}</Text>
  </div>
);

export default DetailRow;

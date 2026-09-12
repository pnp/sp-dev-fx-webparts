import * as React from 'react';
import { Card, Subtitle2 } from '@fluentui/react-components';
import styles from './dashboard.module.scss';
import { IChartPanelProps } from './IChartPanelProps';

/** Card wrapper that frames a single dashboard chart with a title. */
const ChartPanel: React.FC<IChartPanelProps> = ({ title, children }) => (
  <Card className={styles.panel}>
    <Subtitle2>{title}</Subtitle2>
    {children}
  </Card>
);

export default ChartPanel;

import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import styles from './Library.module.scss';

export interface IStatsCardsProps {
  total: number;
  compliant: number;
  warnings: number;
  alerts: number;
}

export const StatsCards: React.FC<IStatsCardsProps> = ({ total, compliant, warnings, alerts }) => {
  const stats = [
    { label: 'Total',     value: total,     color: '#06b6d4' },
    { label: 'Compliant', value: compliant,  color: '#10b981' },
    { label: 'Warnings',  value: warnings,   color: '#f59e0b' },
    { label: 'Alerts',    value: alerts,     color: '#ef4444' }
  ];

  return (
    <Stack horizontal tokens={{ childrenGap: 8 }}>
      {stats.map(s => (
        <Stack key={s.label} horizontalAlign="center" className={styles.card}>
          <Text className={styles.value} style={{ color: s.color }}>{s.value}</Text>
          <Text className={styles.label}>{s.label}</Text>
        </Stack>
      ))}
    </Stack>
  );
};

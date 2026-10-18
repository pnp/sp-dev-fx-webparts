import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue, formatNumber } from '../format';
import { StatusLevel, statusColor, STATUS_META } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

export const StatView: React.FunctionComponent<{
  data: IDashboardData; accent: string; fmt: INumberFormat; status?: StatusLevel;
}> = (props) => {
  const { data, accent, fmt, status } = props;
  const color = status ? statusColor(status) : accent;
  return (
    <div className={styles.stat}>
      <div className={styles.statValue} style={{ color }}>{formatValue(data.total, fmt)}</div>
      <div className={styles.statLabel}>{data.valueLabel}</div>
      {status ? (
        <div className={styles.statMeta} style={{ color }}>{STATUS_META[status].glyph + ' ' + STATUS_META[status].label}</div>
      ) : (
        <div className={styles.statMeta}>{formatNumber(data.rows.length, 0)} items</div>
      )}
    </div>
  );
};

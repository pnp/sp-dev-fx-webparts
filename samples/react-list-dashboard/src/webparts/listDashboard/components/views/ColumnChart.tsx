import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue } from '../format';
import { StatusLevel, STATUS_META } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

// Vertical bars in plain HTML/CSS - the same data as the horizontal bar view, laid
// out as columns. colors[i] is the fill for column i; the label under each names it.
export const ColumnChart: React.FunctionComponent<{
  data: IDashboardData; accent: string; colors: string[]; showDataLabels: boolean;
  fmt: INumberFormat; statuses?: StatusLevel[];
}> = (props) => {
  const { data, colors, accent, showDataLabels, fmt, statuses } = props;
  const max = data.points.reduce((m, p) => Math.max(m, p.value), 1);
  const total = data.points.reduce((s, p) => s + p.value, 0);

  return (
    <div className={styles.columns} role="img" aria-label={data.valueLabel + ' by category'}>
      {data.points.map((p, i) => {
        const pct = p.value <= 0 ? 0 : (p.value / max) * 100;
        const st = statuses ? statuses[i] : undefined;
        return (
          <div key={p.key} className={styles.column} title={p.key + ': ' + formatValue(p.value, fmt, total)}>
            {showDataLabels ? (
              <div className={styles.columnValue}>{st ? STATUS_META[st].glyph + ' ' : ''}{formatValue(p.value, fmt, total)}</div>
            ) : null}
            <div className={styles.columnBarWrap}>
              <div className={styles.columnBar} style={{ height: pct + '%', backgroundColor: colors[i] || accent }} />
            </div>
            <div className={styles.columnLabel} title={p.key}>{p.key}</div>
          </div>
        );
      })}
    </div>
  );
};

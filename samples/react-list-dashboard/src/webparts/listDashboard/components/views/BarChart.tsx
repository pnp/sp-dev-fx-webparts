import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue } from '../format';
import { StatusLevel, STATUS_META } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

// Horizontal bars in plain HTML/CSS: crisp and responsive at any width, no chart
// library. colors[i] is the fill for bar i (single hue, categorical, ramp, or status).
// A per-bar hue reads as identity, so the row label already names it - no legend.
export const BarChart: React.FunctionComponent<{
  data: IDashboardData; accent: string; colors: string[]; showDataLabels: boolean;
  fmt: INumberFormat; statuses?: StatusLevel[];
}> = (props) => {
  const { data, colors, accent, showDataLabels, fmt, statuses } = props;
  const max = data.points.reduce((m, p) => Math.max(m, p.value), 1);
  const total = data.points.reduce((s, p) => s + p.value, 0);

  return (
    <div className={styles.bars} role="img" aria-label={data.valueLabel + ' by category'}>
      {data.points.map((p, i) => {
        const pct = p.value <= 0 ? 0 : (p.value / max) * 100;
        const st = statuses ? statuses[i] : undefined;
        return (
          <div key={p.key} className={styles.barRow} title={p.key + ': ' + formatValue(p.value, fmt, total)}>
            <div className={styles.barLabel} title={p.key}>{p.key}</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: pct + '%', backgroundColor: colors[i] || accent }} />
            </div>
            {showDataLabels ? (
              <div className={styles.barValue}>
                {st ? STATUS_META[st].glyph + ' ' : ''}{formatValue(p.value, fmt, total)}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue } from '../format';
import { StatusLevel, STATUS_META } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

// colors[i] is the accent for point i (single hue, categorical, value ramp, or
// status). showDataLabels toggles the per-tile item count. statuses[i], when present
// (status mode), adds a glyph + label so the state reads without relying on colour.
export const TilesView: React.FunctionComponent<{
  data: IDashboardData; accent: string; colors: string[]; showDataLabels: boolean;
  fmt: INumberFormat; statuses?: StatusLevel[];
}> = (props) => {
  const { data, colors, accent, showDataLabels, fmt, statuses } = props;
  const total = data.points.reduce((s, p) => s + p.value, 0);
  return (
    <div className={styles.tiles}>
      {data.points.map((p, i) => {
        const c = colors[i] || accent;
        const st = statuses ? statuses[i] : undefined;
        return (
          <div key={p.key} className={styles.tile} style={{ borderTopColor: c }}>
            <div className={styles.tileValue} style={{ color: c }}>{formatValue(p.value, fmt, total)}</div>
            <div className={styles.tileLabel} title={p.key}>{p.key}</div>
            {st ? (
              <div className={styles.tileMeta} style={{ color: c }}>{STATUS_META[st].glyph + ' ' + STATUS_META[st].label}</div>
            ) : showDataLabels ? (
              <div className={styles.tileMeta}>{p.count === 1 ? '1 item' : p.count + ' items'}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

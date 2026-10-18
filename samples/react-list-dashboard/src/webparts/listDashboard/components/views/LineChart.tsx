import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue } from '../format';
import { StatusLevel, statusColor } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

const W = 600;
const H = 220;
const PAD_L = 12;
const PAD_R = 12;
const PAD_T = 18;
const PAD_B = 30;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

// Line / area trend over a bucketed date axis, in inline SVG. A single series, so no
// legend - the title names it. Markers pick up the status colour when in status mode.
export const LineChart: React.FunctionComponent<{
  data: IDashboardData; accent: string; showDataLabels: boolean;
  fmt: INumberFormat; statuses?: StatusLevel[]; area: boolean;
}> = (props) => {
  const { data, accent, showDataLabels, fmt, statuses, area } = props;
  const pts = data.points;
  const max = pts.reduce((m, p) => Math.max(m, p.value), 1);
  const n = pts.length;

  const x = (i: number): number => (n <= 1 ? PAD_L + PLOT_W / 2 : PAD_L + (i / (n - 1)) * PLOT_W);
  const y = (v: number): number => PAD_T + PLOT_H - (v <= 0 ? 0 : (v / max) * PLOT_H);
  const baseline = PAD_T + PLOT_H;

  const linePath = pts.map((p, i) => (i === 0 ? 'M ' : 'L ') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1)).join(' ');
  const areaPath = n > 0
    ? 'M ' + x(0).toFixed(1) + ' ' + baseline + ' ' +
      pts.map((p, i) => 'L ' + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1)).join(' ') +
      ' L ' + x(n - 1).toFixed(1) + ' ' + baseline + ' Z'
    : '';

  return (
    <div className={styles.lineWrap}>
      <svg className={styles.lineSvg} viewBox={'0 0 ' + W + ' ' + H}
        role="img" aria-label={data.valueLabel + ' over time'}>
        <line x1={PAD_L} y1={baseline} x2={W - PAD_R} y2={baseline} stroke="var(--wp-line)" strokeWidth={1} />
        {area && areaPath ? <path d={areaPath} fill={accent} fillOpacity={0.16} stroke="none" /> : null}
        <path d={linePath} fill="none" stroke={accent} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={p.key} cx={x(i)} cy={y(p.value)} r={4}
            fill={statuses ? statusColor(statuses[i]) : accent} stroke="var(--wp-surface, #fff)" strokeWidth={1.5} />
        ))}
        {showDataLabels ? pts.map((p, i) => (
          <text key={'v' + p.key} x={x(i)} y={y(p.value) - 8} textAnchor="middle" fontSize={11}
            fontWeight={600} fill="var(--wp-ink)">{formatValue(p.value, fmt)}</text>
        )) : null}
        {pts.map((p, i) => (
          <text key={'l' + p.key} x={x(i)} y={H - 10} textAnchor="middle" fontSize={11}
            fill="var(--wp-muted)">{p.key}</text>
        ))}
      </svg>
    </div>
  );
};

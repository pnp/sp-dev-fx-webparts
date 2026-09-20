import * as React from 'react';
import { IDashboardData, INumberFormat } from '../../model/dashboardTypes';
import { formatValue } from '../format';
import { StatusLevel, STATUS_META } from '../../shared/chartPalette';
import styles from '../ListDashboard.module.scss';

const SIZE = 180;
const R = 84;
const CX = SIZE / 2;
const CY = SIZE / 2;
const HOLE = 0.56; // donut inner radius as a fraction of R

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

// Slice as an SVG wedge path; a near-full single slice is drawn as a plain circle
// (an arc that sweeps 360deg collapses to nothing).
function arc(start: number, end: number): string {
  const s = polar(start, R);
  const e = polar(end, R);
  const large = end - start > 180 ? 1 : 0;
  return 'M ' + CX + ' ' + CY + ' L ' + s.x + ' ' + s.y +
    ' A ' + R + ' ' + R + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y + ' Z';
}

// Pie / donut in inline SVG. Slices carry identity (colour), so a legend is always
// shown; a 2px surface-coloured gap separates adjacent slices per the mark spec.
export const PieChart: React.FunctionComponent<{
  data: IDashboardData; accent: string; colors: string[]; showDataLabels: boolean;
  fmt: INumberFormat; statuses?: StatusLevel[]; donut: boolean; surface: string;
}> = (props) => {
  const { data, colors, accent, showDataLabels, fmt, statuses, donut, surface } = props;
  const pts = data.points;
  const total = pts.reduce((s, p) => s + Math.max(0, p.value), 0);

  let angle = -90; // start at 12 o'clock
  const slices = pts.map((p, i) => {
    const frac = total > 0 ? Math.max(0, p.value) / total : 0;
    const start = angle;
    const end = angle + frac * 360;
    angle = end;
    return { key: p.key, value: p.value, frac, start, end, color: colors[i] || accent, st: statuses ? statuses[i] : undefined };
  });
  const onlyOne = slices.filter(s => s.frac > 0).length === 1;

  return (
    <div className={styles.pieWrap}>
      <svg className={styles.pieSvg} viewBox={'0 0 ' + SIZE + ' ' + SIZE} width={SIZE} height={SIZE}
        role="img" aria-label={data.valueLabel + ' by category'}>
        {onlyOne ? (
          <circle cx={CX} cy={CY} r={R} fill={slices.filter(s => s.frac > 0)[0].color} />
        ) : (
          slices.map(s => s.frac > 0
            ? <path key={s.key} d={arc(s.start, s.end)} fill={s.color} stroke={surface} strokeWidth={2} />
            : null)
        )}
        {donut ? <circle cx={CX} cy={CY} r={R * HOLE} fill={surface} /> : null}
        {donut ? (
          <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central"
            fontSize="20" fontWeight="700" fill="currentColor">{formatValue(total, fmt)}</text>
        ) : null}
      </svg>
      <div className={styles.pieLegend}>
        {slices.map(s => (
          <div key={s.key} className={styles.legendRow} title={s.key + ': ' + formatValue(s.value, fmt, total)}>
            <span className={styles.legendSwatch} style={{ background: s.color }} />
            <span className={styles.legendLabel}>{s.key}</span>
            {showDataLabels ? (
              <span className={styles.legendValue}>
                {s.st ? STATUS_META[s.st].glyph + ' ' : ''}{formatValue(s.value, fmt, total)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

import * as React from 'react';
import styles from './WorkloadTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
}

function hashColour(name: string): string {
  const palette = ['#0078d4', '#107c10', '#e67e22', '#8e6f1e', '#e91e8c', '#6b2fa0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function fmtWeek(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' }).toUpperCase();
}

function getMondays(start: Date, end: Date): Date[] {
  const result: Date[] = [];
  const cur = new Date(start.getTime());
  cur.setHours(0, 0, 0, 0);
  const day = cur.getDay();
  cur.setDate(cur.getDate() + (day === 0 ? -6 : 1 - day));
  while (cur <= end) { result.push(new Date(cur.getTime())); cur.setDate(cur.getDate() + 7); }
  return result;
}

function countInWeek(tasks: IDeliveryPlanTask[], monday: Date): number {
  const sunday = new Date(monday.getTime());
  sunday.setDate(sunday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return tasks.filter(t => t.startDate <= sunday && t.endDate >= monday).length;
}

export class WorkloadTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, planStart, planEnd } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;

    const mondays = getMondays(planStart, planEnd);

    const resourceOrder: string[] = [];
    const byResource = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!byResource.has(t.resource)) { byResource.set(t.resource, []); resourceOrder.push(t.resource); }
      byResource.get(t.resource)!.push(t);
    });

    const grid: number[][] = resourceOrder.map(r => mondays.map(m => countInWeek(byResource.get(r)!, m)));
    const combined: number[] = mondays.map((m, wi) => grid.reduce((s, row) => s + row[wi], 0));
    const maxCount = Math.max(...([] as number[]).concat(...grid), ...combined, 1);

    const cellStyle = (count: number): React.CSSProperties =>
      count === 0 ? {} : { backgroundColor: `rgba(0, 120, 212, ${0.1 + (count / maxCount) * 0.75})` };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Weekly workload</h3>
        <p className={styles.desc}>
          Number of tasks each resource has running concurrently in a given week — darker means more stacked up.
        </p>
        <div className={styles.table}>
          <div className={styles.rowHeader}>
            <div className={styles.resourceCell}>WEEK OF</div>
            {mondays.map((m, i) => <div key={i} className={styles.headerCell}>{fmtWeek(m)}</div>)}
          </div>
          {resourceOrder.map((resource, ri) => (
            <div key={resource} className={styles.row}>
              <div className={styles.resourceCell}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(resource) }}>
                  {getInitials(resource)}
                </span>
                <span className={styles.resourceName}>{resource}</span>
              </div>
              {grid[ri].map((count, wi) => (
                <div key={wi} className={styles.cell} style={cellStyle(count)}>
                  {count > 0 && <span className={styles.cellCount}>{count}</span>}
                </div>
              ))}
            </div>
          ))}
          <div className={`${styles.row} ${styles.combinedRow}`}>
            <div className={styles.resourceCell}>
              <span className={styles.resourceName}>Combined</span>
            </div>
            {combined.map((count, wi) => (
              <div key={wi} className={styles.cell} style={cellStyle(count)}>
                {count > 0 && <span className={styles.cellCount}>{count}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Fewer tasks</span>
          <div className={styles.legendGradient} />
          <span className={styles.legendLabel}>More tasks</span>
        </div>
      </div>
    );
  }
}

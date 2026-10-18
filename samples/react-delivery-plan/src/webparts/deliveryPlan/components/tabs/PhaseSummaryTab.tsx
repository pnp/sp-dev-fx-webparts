import * as React from 'react';
import styles from './PhaseSummaryTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function fmt(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function snapToMonday(d: Date): Date {
  const c = new Date(d.getTime()); c.setHours(0, 0, 0, 0);
  const day = c.getDay(); c.setDate(c.getDate() + (day === 0 ? -6 : 1 - day)); return c;
}

function snapToSunday(d: Date): Date {
  const c = new Date(d.getTime()); c.setHours(23, 59, 59, 999);
  const day = c.getDay(); c.setDate(c.getDate() + (day === 0 ? 0 : 7 - day)); return c;
}

interface IPhaseRow {
  phase: string;
  colour: string;
  phaseStart: Date;
  phaseEnd: Date;
  resources: string;
  taskCount: number;
}

export class PhaseSummaryTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, phaseColours, planStart, planEnd } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;

    const gridStart = snapToMonday(planStart);
    const gridEnd = snapToSunday(planEnd);
    const totalMs = gridEnd.getTime() - gridStart.getTime();

    const phaseOrder: string[] = [];
    const phaseMap = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!phaseMap.has(t.phase)) { phaseMap.set(t.phase, []); phaseOrder.push(t.phase); }
      phaseMap.get(t.phase)!.push(t);
    });

    const rows: IPhaseRow[] = phaseOrder.map(phase => {
      const pt = phaseMap.get(phase)!;
      const phaseStart = new Date(Math.min(...pt.map(t => t.startDate.getTime())));
      const phaseEnd = new Date(Math.max(...pt.map(t => t.endDate.getTime())));
      const resources = Array.from(new Set(pt.map(t => t.resource))).join(' + ');
      return { phase, colour: phaseColours.get(phase) || '#0078d4', phaseStart, phaseEnd, resources, taskCount: pt.length };
    });

    const barLeft = (d: Date): number =>
      Math.max(0, ((d.getTime() - gridStart.getTime()) / totalMs) * 100);
    const barWidth = (start: Date, end: Date): number => {
      const left = barLeft(start);
      return Math.min(100 - left, ((end.getTime() - start.getTime() + 86400000) / totalMs) * 100);
    };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Phase summary</h3>
        <p className={styles.desc}>
          {tasks.length} tasks grouped into {rows.length} delivery phases. Bars span each phase&apos;s earliest start to its latest finish.
        </p>
        <div className={styles.phaseList}>
          {rows.map(row => (
            <div key={row.phase} className={styles.phaseRow}>
              <div className={styles.phaseInfo}>
                <div className={styles.phaseNameRow}>
                  <span className={styles.phaseDot} style={{ backgroundColor: row.colour }} />
                  <span className={styles.phaseName}>{row.phase}</span>
                </div>
                <div className={styles.phaseMeta}>
                  {fmt(row.phaseStart)} &rarr; {fmt(row.phaseEnd)} &middot; {row.resources}
                </div>
              </div>
              <div className={styles.barArea}>
                <div
                  className={styles.bar}
                  style={{
                    left: `${barLeft(row.phaseStart)}%`,
                    width: `${barWidth(row.phaseStart, row.phaseEnd)}%`,
                    backgroundColor: row.colour
                  }}
                />
              </div>
              <div className={styles.taskCount}>
                <span className={styles.taskCountNum}>{row.taskCount}</span>
                <span className={styles.taskCountLabel}> tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

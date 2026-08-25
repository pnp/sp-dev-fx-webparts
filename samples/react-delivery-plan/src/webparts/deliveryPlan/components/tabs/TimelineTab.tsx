import * as React from 'react';
import styles from './TimelineTab.module.scss';
import { ITabProps, IDeliveryPlanTask } from '../IDeliveryPlanProps';

function fmt(d: Date): string {
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
}

function hashColour(name: string): string {
  const palette = ['#0078d4', '#107c10', '#e67e22', '#8e6f1e', '#e91e8c', '#6b2fa0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function snapToMonday(d: Date): Date {
  const c = new Date(d.getTime());
  c.setHours(0, 0, 0, 0);
  const day = c.getDay();
  c.setDate(c.getDate() + (day === 0 ? -6 : 1 - day));
  return c;
}

function snapToSunday(d: Date): Date {
  const c = new Date(d.getTime());
  c.setHours(23, 59, 59, 999);
  const day = c.getDay();
  c.setDate(c.getDate() + (day === 0 ? 0 : 7 - day));
  return c;
}

export class TimelineTab extends React.Component<ITabProps> {
  public render(): React.ReactElement {
    const { tasks, phaseColours, planStart, planEnd } = this.props;

    if (!tasks.length) {
      return <div className={styles.empty}>No tasks found.</div>;
    }

    const gridStart = snapToMonday(planStart);
    const gridEnd = snapToSunday(planEnd);
    const totalMs = gridEnd.getTime() - gridStart.getTime();

    const weeks: Date[] = [];
    const cur = new Date(gridStart.getTime());
    while (cur <= gridEnd) { weeks.push(new Date(cur.getTime())); cur.setDate(cur.getDate() + 7); }

    const resourceOrder: string[] = [];
    const byResource = new Map<string, IDeliveryPlanTask[]>();
    tasks.forEach(t => {
      if (!byResource.has(t.resource)) { byResource.set(t.resource, []); resourceOrder.push(t.resource); }
      byResource.get(t.resource)!.push(t);
    });

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const showToday = today >= gridStart && today <= gridEnd;
    const todayPct = showToday ? ((today.getTime() - gridStart.getTime()) / totalMs) * 100 : -1;

    const barLeft = (d: Date): number =>
      Math.max(0, ((d.getTime() - gridStart.getTime()) / totalMs) * 100);
    const barWidth = (task: IDeliveryPlanTask): number => {
      const left = barLeft(task.startDate);
      const raw = (task.durationDays / (totalMs / 86400000)) * 100;
      return Math.min(100 - left, raw);
    };

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Timeline by resource</h3>
        <p className={styles.desc}>
          Every task, positioned by its start date and duration. Grouped into lanes — one per resource — with week gridlines.
        </p>

        <div className={styles.headerRow}>
          <div className={styles.taskInfoHeader}>TASK</div>
          <div className={styles.weekHeaders} style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
            {weeks.map((w, i) => <div key={i} className={styles.weekLabel}>{fmt(w)}</div>)}
          </div>
        </div>

        {resourceOrder.map(resource => {
          const laneTasks = byResource.get(resource)!;
          const personDays = laneTasks.reduce((s, t) => s + t.durationDays, 0);
          return (
            <div key={resource} className={styles.lane}>
              <div className={styles.laneHeader}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(resource) }}>
                  {getInitials(resource)}
                </span>
                <span className={styles.resourceName}>{resource}</span>
                <span className={styles.laneMeta}>{laneTasks.length} tasks &middot; {personDays} person-days</span>
              </div>
              {laneTasks.map(task => (
                <div key={task.id} className={styles.taskRow}>
                  <div className={styles.taskInfo}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <div className={styles.taskMeta}>{fmt(task.startDate)} &rarr; {fmt(task.endDate)} &middot; {task.durationDays}d</div>
                  </div>
                  <div className={styles.barArea}>
                    {showToday && <div className={styles.todayLine} style={{ left: `${todayPct}%` }} />}
                    <div
                      className={styles.bar}
                      style={{
                        left: `${barLeft(task.startDate)}%`,
                        width: `${barWidth(task)}%`,
                        backgroundColor: phaseColours.get(task.phase) || '#0078d4'
                      }}
                      title={`${task.title} (${task.phase})`}
                    >
                      <span className={styles.barLabel}>{task.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

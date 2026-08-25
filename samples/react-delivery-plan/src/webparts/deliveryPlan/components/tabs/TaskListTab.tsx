import * as React from 'react';
import styles from './TaskListTab.module.scss';
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

type SortField = keyof IDeliveryPlanTask;
type SortDir = 'asc' | 'desc';

interface ITaskListTabState {
  sortField: SortField;
  sortDir: SortDir;
}

export class TaskListTab extends React.Component<ITabProps, ITaskListTabState> {
  constructor(props: ITabProps) {
    super(props);
    this.state = { sortField: 'startDate', sortDir: 'asc' };
  }

  private _onSort(field: SortField): void {
    this.setState(prev => ({
      sortField: field,
      sortDir: prev.sortField === field && prev.sortDir === 'asc' ? 'desc' : 'asc'
    }));
  }

  private _sorted(): IDeliveryPlanTask[] {
    const { tasks } = this.props;
    const { sortField, sortDir } = this.state;
    return [...tasks].sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      let cmp = 0;
      if (av instanceof Date && bv instanceof Date) cmp = av.getTime() - bv.getTime();
      else if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  private _arrow(field: SortField): string {
    const { sortField, sortDir } = this.state;
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  }

  public render(): React.ReactElement {
    const { tasks, phaseColours } = this.props;
    if (!tasks.length) return <div className={styles.empty}>No tasks found.</div>;
    const sorted = this._sorted();

    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Task list</h3>
        <p className={styles.desc}>All {tasks.length} tasks. Click a column header to sort.</p>
        <div className={styles.table}>
          <div className={styles.thead}>
            <div className={styles.colResource} onClick={() => this._onSort('resource')}>RESOURCE{this._arrow('resource')}</div>
            <div className={styles.colTask} onClick={() => this._onSort('title')}>TASK{this._arrow('title')}</div>
            <div className={styles.colPhase} onClick={() => this._onSort('phase')}>PHASE{this._arrow('phase')}</div>
            <div className={styles.colDate} onClick={() => this._onSort('startDate')}>START{this._arrow('startDate')}</div>
            <div className={styles.colDate} onClick={() => this._onSort('endDate')}>END{this._arrow('endDate')}</div>
            <div className={styles.colDays} onClick={() => this._onSort('durationDays')}>DAYS{this._arrow('durationDays')}</div>
          </div>
          {sorted.map(task => (
            <div key={task.id} className={styles.tr}>
              <div className={`${styles.colResource} ${styles.tdResource}`}>
                <span className={styles.avatar} style={{ backgroundColor: hashColour(task.resource) }}>
                  {getInitials(task.resource)}
                </span>
                <span className={styles.resourceName}>{task.resource}</span>
              </div>
              <div className={`${styles.colTask} ${styles.tdTask}`}>{task.title}</div>
              <div className={`${styles.colPhase} ${styles.tdPhase}`}>
                <span className={styles.phaseDot} style={{ backgroundColor: phaseColours.get(task.phase) || '#ccc' }} />
                {task.phase}
              </div>
              <div className={`${styles.colDate} ${styles.tdDate}`}>{fmt(task.startDate)}</div>
              <div className={`${styles.colDate} ${styles.tdDate}`}>{fmt(task.endDate)}</div>
              <div className={`${styles.colDays} ${styles.tdDays}`}>{task.durationDays}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import styles from './DeliveryPlan.module.scss';
import { IDeliveryPlanProps, IDeliveryPlanTask, TabId } from './IDeliveryPlanProps';
import { TimelineTab } from './tabs/TimelineTab';
import { WorkloadTab } from './tabs/WorkloadTab';
import { TaskListTab } from './tabs/TaskListTab';
import { PhaseSummaryTab } from './tabs/PhaseSummaryTab';

const PHASE_PALETTE: string[] = [
  '#0078d4', '#e67e22', '#27ae60', '#8e6f1e',
  '#e91e8c', '#6b2fa0', '#00b4d8', '#e74c3c',
  '#2ecc71', '#f39c12'
];

interface IDeliveryPlanState {
  activeTab: TabId;
}

interface ILegendEntry {
  phase: string;
  colour: string;
}

export class DeliveryPlan extends React.Component<IDeliveryPlanProps, IDeliveryPlanState> {
  constructor(props: IDeliveryPlanProps) {
    super(props);
    this.state = { activeTab: 'timeline' };
  }

  private _buildPhaseColours(tasks: IDeliveryPlanTask[]): Map<string, string> {
    const map = new Map<string, string>();
    let idx = 0;
    tasks.forEach(t => {
      if (t.phase && !map.has(t.phase)) {
        map.set(t.phase, PHASE_PALETTE[idx % PHASE_PALETTE.length]);
        idx++;
      }
    });
    return map;
  }

  private _getLegendEntries(phaseColours: Map<string, string>): ILegendEntry[] {
    const entries: ILegendEntry[] = [];
    phaseColours.forEach((colour, phase) => {
      entries.push({ phase, colour });
    });
    return entries;
  }

  private _formatBadge(tasks: IDeliveryPlanTask[]): string {
    const starts = tasks.map(t => t.startDate.getTime());
    const ends = tasks.map(t => t.endDate.getTime());
    const planStart = new Date(Math.min.apply(null, starts));
    const planEnd = new Date(Math.max.apply(null, ends));
    const totalWeeks = Math.ceil((planEnd.getTime() - planStart.getTime()) / (7 * 86400000));
    const fmt = (d: Date): string =>
      d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${fmt(planStart)} – ${fmt(planEnd)} · ${totalWeeks} weeks`;
  }

  public render(): React.ReactElement {
    const { tasks, title, subtitle, errorMessage, isDarkTheme } = this.props;
    const { activeTab } = this.state;
    const phaseColours = this._buildPhaseColours(tasks);
    const legendEntries = this._getLegendEntries(phaseColours);

    const planStart = tasks.length
      ? new Date(Math.min.apply(null, tasks.map(t => t.startDate.getTime())))
      : new Date();
    const planEnd = tasks.length
      ? new Date(Math.max.apply(null, tasks.map(t => t.endDate.getTime())))
      : new Date();

    const tabs: { id: TabId; label: string }[] = [
      { id: 'timeline', label: 'Timeline' },
      { id: 'workload', label: 'Weekly workload' },
      { id: 'tasklist', label: 'Task list' },
      { id: 'phasesummary', label: 'Phase summary' }
    ];

    return (
      <div className={`${styles.deliveryPlan}${isDarkTheme ? ` ${styles.dark}` : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {tasks.length > 0 && (
            <div className={styles.badge}>{this._formatBadge(tasks)}</div>
          )}
        </div>

        {legendEntries.length > 0 && (
          <div className={styles.legend}>
            {legendEntries.map((entry: ILegendEntry) => (
              <span key={entry.phase} className={styles.legendChip}>
                <span className={styles.legendDot} style={{ backgroundColor: entry.colour }} />
                {entry.phase}
              </span>
            ))}
          </div>
        )}

        {errorMessage ? (
          <div className={styles.errorBanner}>{errorMessage}</div>
        ) : (
          <React.Fragment>
            <div className={styles.tabBar}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.tabBtn}${activeTab === tab.id ? ` ${styles.tabBtnActive}` : ''}`}
                  onClick={() => this.setState({ activeTab: tab.id })}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'timeline' && (
                <TimelineTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'workload' && (
                <WorkloadTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'tasklist' && (
                <TaskListTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
              {activeTab === 'phasesummary' && (
                <PhaseSummaryTab tasks={tasks} phaseColours={phaseColours} planStart={planStart} planEnd={planEnd} />
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

import * as React from 'react';
import { IActivity, ICompletion } from '../models/IWellbeingModels';
import styles from './WellbeingTracker.module.scss';

export interface ITrackerGridProps {
  activities: IActivity[];
  completions: ICompletion[];
  dates: Date[];
  today: Date;
  isWeekView: boolean;
  onToggle: (activityId: number, date: Date, existingCompletionId: number | undefined, activityTitle: string) => void;
}

const DAY_ABBREVS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const CATEGORY_COLORS: Record<string, string> = {
  Health: '#22c55e',
  Mindfulness: '#a855f7',
  Social: '#3b82f6',
};

const FALLBACK_PALETTE = ['#f97316', '#ec4899', '#14b8a6', '#f59e0b', '#6366f1', '#ef4444', '#0ea5e9', '#84cc16'];

// Hash-based fallback gives new categories a stable, distinct colour without config.
function getCategoryColor(category: string): string {
  if (!category) return FALLBACK_PALETTE[0];
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) & 0x7fffffff;
  }
  return FALLBACK_PALETTE[hash % FALLBACK_PALETTE.length];
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Three-tier colour scale maps to CSS classes so no inline background is needed.
function getProgressClass(pct: number): string {
  if (pct >= 70) return styles.progressHigh;
  if (pct >= 40) return styles.progressMid;
  return styles.progressLow;
}

function getGridClass(weekView: boolean, numDays: number): string {
  if (weekView) return styles.gridWeek;
  switch (numDays) {
    case 28: return styles.gridMonth28;
    case 29: return styles.gridMonth29;
    case 30: return styles.gridMonth30;
    default:  return styles.gridMonth31;
  }
}

const CheckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const TrackerGrid: React.FC<ITrackerGridProps> = ({ activities, completions, dates, today, isWeekView, onToggle }) => {
  const todayKey = toDateKey(today);
  const numDays = dates.length;

  // Build a lookup map
  const completionMap = React.useMemo(() => {
    const map: Record<number, Record<string, ICompletion>> = {};
    completions.forEach(c => {
      if (!map[c.activityId]) map[c.activityId] = {};
      map[c.activityId][c.completionDate] = c;
    });
    return map;
  }, [completions]);

  const checkSize = isWeekView ? 16 : 11;
  const gridClass = getGridClass(isWeekView, numDays);

  return (
    <div className={styles.gridContainer}>
      <div className={`${styles.gridWrapper} ${gridClass}`}>

        {/* ── Column headers ── */}
        <div className={styles.colHeaderActivity}>Activity</div>

        {dates.map((d, i) => {
          const key = toDateKey(d);
          const isToday = key === todayKey;
          return (
            <div
              key={key}
              className={`${styles.colHeaderDay}${isToday ? ` ${styles.today}` : ''}`}
              title={d.toDateString()}
            >
              {isWeekView ? DAY_ABBREVS[i] : d.getDate()}
            </div>
          );
        })}

        <div className={styles.colHeaderProgress}>Progress</div>

        {/* ── Top separator ── */}
        <div className={styles.rowSeparator} />

        {/* ── Empty state ── */}
        {activities.length === 0 && (
          <div className={styles.emptyState}>
            <CalendarIcon />
            <p>No activities yet — add one below to get started.</p>
          </div>
        )}

        {/* ── Activity rows ── */}
        {activities.map((activity, rowIdx) => {
          const actCompletions = completionMap[activity.id] || {};
          const completedDays = dates.filter(d => actCompletions[toDateKey(d)]).length;
          const consistency = Math.round((completedDays / numDays) * 100);
          const dotColor = getCategoryColor(activity.category);

          return (
            <React.Fragment key={activity.id}>
              {/* Activity name */}
              <div className={styles.activityName} title={`${activity.title} (${activity.category})`}>
                <svg width="9" height="9" viewBox="0 0 9 9" className={styles.categoryDot} aria-hidden="true">
                  <circle cx="4.5" cy="4.5" r="4.5" fill={dotColor} />
                </svg>
                {activity.title} <span className={styles.categoryLabel}>({activity.category})</span>
              </div>

              {/* Day cells */}
              {dates.map(date => {
                const key = toDateKey(date);
                const isFuture = date > today;
                const completion = actCompletions[key];
                const isCompleted = completion !== undefined;

                const cellStateClass = isFuture
                  ? styles.cellFuture
                  : isCompleted
                    ? styles.cellCompleted
                    : styles.cellEmpty;

                return (
                  <div key={key} className={styles.cellWrap}>
                    <button
                      type="button"
                      className={`${styles.cell} ${cellStateClass} ${isWeekView ? styles.cellWeek : styles.cellMonth}`}
                      onClick={() => !isFuture && onToggle(activity.id, date, completion?.id, activity.title)}
                      disabled={isFuture}
                      title={completion ? completion.completionDate : date.toDateString()}
                      aria-label={`${activity.title} on ${date.toDateString()}${isCompleted ? ', completed' : ', not completed'}`}
                    >
                      {isCompleted && <CheckIcon size={checkSize} />}
                    </button>
                  </div>
                );
              })}

              {/* Progress */}
              <div className={styles.progressCell}>
                <progress
                  className={`${styles.progressBar} ${getProgressClass(consistency)}`}
                  value={consistency}
                  max={100}
                  aria-label={`${consistency}% consistency`}
                />
                <span className={styles.progressText}>{consistency}% consistency</span>
              </div>

              {/* Row separator (except after last) */}
              {rowIdx < activities.length - 1 && <div className={styles.rowSeparator} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

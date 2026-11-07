import * as React from 'react';
import { Icon } from '@fluentui/react';
import styles from './TeamAvailabilityCalendar.module.scss';
import type { IAbsence } from '../models/IAbsence';
import type { IWeekLayout, IDayCell, IAbsenceBar } from '../utils/calendarUtils';
import { formatDateRange } from '../utils/calendarUtils';
import { getTypeColor, getTypeIcon, getTypeLabel } from './absenceTypeVisuals';

export interface IMonthGridProps {
  weekLayouts: IWeekLayout[];
  weekdayLabels: string[];
  maxLanesPerDay: number;
  capacityThreshold: number;
  isDarkTheme: boolean;
  /** One-week view: taller day cells, no month dimming. */
  singleWeek: boolean;
  locale: string;
  onSelectAbsence: (absence: IAbsence) => void;
  onSelectDay: (date: Date) => void;
}

const MonthGrid: React.FC<IMonthGridProps> = (props) => {
  const {
    weekLayouts,
    weekdayLabels,
    maxLanesPerDay,
    capacityThreshold,
    isDarkTheme,
    singleWeek,
    locale,
    onSelectAbsence,
    onSelectDay
  } = props;

  const cols: number = weekdayLabels.length;
  // Drives the grid column count and the day-cell height (see the stylesheet).
  const gridStyle: React.CSSProperties = {
    ['--tac-cols' as string]: String(cols),
    ['--tac-lane-rows' as string]: String(maxLanesPerDay + 1)
  };

  return (
    <div
      className={`${styles.calendar} ${singleWeek ? styles.calendarWeek : ''}`}
      style={gridStyle}
    >
      {/* Deliberately no grid/row ARIA roles: without a full grid pattern they are
          invalid, and every day and bar is already a labelled button. */}
      <div className={styles.weekdayRow} aria-hidden="true">
        {weekdayLabels.map((label) => (
          <div key={label} className={styles.weekdayCell}>
            {label}
          </div>
        ))}
      </div>

      {weekLayouts.map((layout, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          <div className={styles.weekDays}>
            {layout.week.map((cell: IDayCell, colIndex: number) => {
              const count: number = layout.countByDay[colIndex] || 0;
              const overCapacity: boolean = capacityThreshold > 0 && count >= capacityThreshold;
              const classes: string = [
                styles.dayCell,
                cell.inCurrentMonth ? '' : styles.outsideMonth,
                cell.isWeekend ? styles.weekend : '',
                cell.isToday ? styles.today : '',
                overCapacity ? styles.overCapacity : ''
              ]
                .filter(Boolean)
                .join(' ');
              const dayLabel: string = new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              }).format(cell.date);
              return (
                <button
                  key={cell.date.getTime()}
                  type="button"
                  className={classes}
                  aria-label={
                    overCapacity ? `${dayLabel} — ${count} people away` : dayLabel
                  }
                  onClick={() => onSelectDay(cell.date)}
                >
                  <span className={styles.dayNumber}>{cell.day}</span>
                  {overCapacity && (
                    <span className={styles.capacityBadge} title={`${count} people away`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.weekBars}>
            {layout.bars.map((bar: IAbsenceBar) => {
              const color = getTypeColor(bar.absence.type, isDarkTheme);
              const barStyle: React.CSSProperties = {
                gridColumn: `${bar.startCol + 1} / span ${bar.span}`,
                gridRow: bar.lane + 1,
                background: color.bg,
                borderColor: color.border,
                color: color.text
              };
              const classes: string = [
                styles.bar,
                bar.continuesLeft ? styles.continuesLeft : '',
                bar.continuesRight ? styles.continuesRight : ''
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <button
                  key={`${bar.absence.id}-${bar.startCol}`}
                  type="button"
                  className={classes}
                  style={barStyle}
                  title={`${bar.absence.employeeName} · ${getTypeLabel(bar.absence.type)} · ${formatDateRange(bar.absence.start, bar.absence.end, locale)}`}
                  onClick={() => onSelectAbsence(bar.absence)}
                >
                  {bar.continuesLeft && (
                    <span className={styles.barArrow} aria-hidden="true">‹</span>
                  )}
                  <Icon iconName={getTypeIcon(bar.absence.type)} className={styles.barIcon} />
                  <span className={styles.barLabel}>{bar.absence.employeeName}</span>
                  {bar.continuesRight && (
                    <span className={styles.barArrow} aria-hidden="true">›</span>
                  )}
                </button>
              );
            })}

            {layout.overflowByDay.map((overflow, col) =>
              overflow > 0 ? (
                <button
                  key={`more-${col}`}
                  type="button"
                  className={styles.moreButton}
                  style={{ gridColumn: col + 1, gridRow: maxLanesPerDay + 1 }}
                  onClick={() => onSelectDay(layout.week[col].date)}
                >
                  +{overflow} more
                </button>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthGrid;

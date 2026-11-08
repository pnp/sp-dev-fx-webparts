import * as React from "react"
import { makeStyles, shorthands, Text, tokens } from "@fluentui/react-components"
import { IContentCalendarConfig, IContentItem } from "../models"
import { getMonthMatrix, getWeekdayLabels, isWeekend } from "../utils/dateUtils"
import { dayKey, groupItemsByDay } from "../utils/itemGrouping"
import { CalendarCell } from "../components/CalendarCell"

const useStyles = makeStyles({
  grid: {
    display: "grid",
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderLeft("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow("hidden"),
  },
  weekdayHeader: {
    display: "grid",
  },
  weekday: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    textAlign: "right",
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground2,
  },
})

export interface IMonthViewProps {
  anchorDate: Date
  config: IContentCalendarConfig
  items: IContentItem[]
  locale: string
  onCreateContent?: (date: Date) => void
  onCreatePlaceholder?: (date: Date) => void
}

// Month grid: weekday header + six weeks of CalendarCell. Weekend columns are
// dropped entirely when showWeekends is off. Items are grouped by day once.
export const MonthView: React.FC<IMonthViewProps> = ({
  anchorDate,
  config,
  items,
  locale,
  onCreateContent,
  onCreatePlaceholder,
}) => {
  const styles = useStyles()
  const { firstDayOfWeek, showWeekends, itemsPerDay } = config

  const itemsByDay = React.useMemo(() => groupItemsByDay(items), [items])

  const matrix = React.useMemo(
    () => getMonthMatrix(anchorDate, firstDayOfWeek),
    [anchorDate, firstDayOfWeek],
  )

  const weekdayLabels = React.useMemo(
    () => getWeekdayLabels(firstDayOfWeek, locale),
    [firstDayOfWeek, locale],
  )

  const keep = (d: Date): boolean => showWeekends || !isWeekend(d)
  const cols = showWeekends ? 7 : 5
  const template = `repeat(${cols}, minmax(0, 1fr))`

  // Header labels must be filtered in the same column order as the cells.
  const visibleWeekdayLabels = matrix[0]
    .map((d, i) => ({ label: weekdayLabels[i], keep: keep(d) }))
    .filter((x) => x.keep)
    .map((x) => x.label)

  return (
    <div role="grid" aria-label="Content calendar month view">
      <div
        className={styles.weekdayHeader}
        role="row"
        style={{ gridTemplateColumns: template }}
      >
        {visibleWeekdayLabels.map((label) => (
          <Text
            key={label}
            role="columnheader"
            className={styles.weekday}
            size={200}
            weight="semibold"
          >
            {label}
          </Text>
        ))}
      </div>

      <div className={styles.grid} style={{ gridTemplateColumns: template }}>
        {matrix.map((week) =>
          week.filter(keep).map((date) => (
            <CalendarCell
              key={dayKey(date)}
              date={date}
              items={itemsByDay.get(dayKey(date)) ?? []}
              itemsPerDay={itemsPerDay}
              isOutsideMonth={date.getMonth() !== anchorDate.getMonth()}
              locale={locale}
              onCreateContent={onCreateContent}
              onCreatePlaceholder={onCreatePlaceholder}
            />
          )),
        )}
      </div>
    </div>
  )
}

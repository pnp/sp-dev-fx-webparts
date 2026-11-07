import * as React from "react"
import { makeStyles, mergeClasses, shorthands, Text, tokens } from "@fluentui/react-components"
import { IContentCalendarConfig, IContentItem } from "../models"
import { getWeekDays, isToday, isWeekend } from "../utils/dateUtils"
import { dayKey, groupItemsByDay } from "../utils/itemGrouping"
import { EventChip } from "../components/EventChip"

const useStyles = makeStyles({
  grid: {
    display: "grid",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow("hidden"),
    minHeight: "320px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: 0,
  },
  weekend: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "2px",
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground2,
  },
  weekday: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
  },
  dayNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24px",
    height: "24px",
    fontWeight: tokens.fontWeightSemibold,
  },
  today: {
    ...shorthands.borderRadius("50%"),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  chips: {
    display: "flex",
    flexDirection: "column",
    rowGap: "3px",
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXXS),
    ...shorthands.overflow("hidden", "auto"),
    flexGrow: 1,
  },
  empty: {
    color: tokens.colorNeutralForeground4,
    textAlign: "center",
    ...shorthands.padding(tokens.spacingVerticalS, 0),
  },
})

export interface IWeekViewProps {
  anchorDate: Date
  config: IContentCalendarConfig
  items: IContentItem[]
  locale: string
}

// Week view: one column per day showing every item for that day (scrolls if a
// day is busy). Weekend columns are dropped when showWeekends is off.
export const WeekView: React.FC<IWeekViewProps> = ({
  anchorDate,
  config,
  items,
  locale,
}) => {
  const styles = useStyles()
  const { firstDayOfWeek, showWeekends } = config

  const itemsByDay = React.useMemo(() => groupItemsByDay(items), [items])
  const days = React.useMemo(
    () =>
      getWeekDays(anchorDate, firstDayOfWeek).filter(
        (d) => showWeekends || !isWeekend(d),
      ),
    [anchorDate, firstDayOfWeek, showWeekends],
  )

  const template = `repeat(${days.length}, minmax(0, 1fr))`

  return (
    <div
      role="grid"
      aria-label="Content calendar week view"
      className={styles.grid}
      style={{ gridTemplateColumns: template }}
    >
      {days.map((date) => {
        const dayItems = itemsByDay.get(dayKey(date)) ?? []
        return (
          <div
            key={dayKey(date)}
            role="gridcell"
            className={mergeClasses(
              styles.column,
              isWeekend(date) && styles.weekend,
            )}
          >
            <div className={styles.header}>
              <Text size={200} className={styles.weekday}>
                {date.toLocaleDateString(locale, { weekday: "short" })}
              </Text>
              <span
                className={mergeClasses(
                  styles.dayNumber,
                  isToday(date) && styles.today,
                )}
              >
                {date.getDate()}
              </span>
            </div>
            <div className={styles.chips}>
              {dayItems.length === 0 ? (
                <Text size={100} className={styles.empty}>
                  —
                </Text>
              ) : (
                dayItems.map((item) => (
                  <EventChip key={item.id} item={item} locale={locale} />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import * as React from "react"
import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"
import { IContentItem } from "../models"
import { isToday as checkToday, isWeekend as checkWeekend } from "../utils/dateUtils"
import { usePressableStyles } from "../hooks/usePressableStyles"
import { EventChip } from "./EventChip"
import { QuickAddMenu } from "./QuickAddMenu"

const useStyles = makeStyles({
  cell: {
    display: "flex",
    flexDirection: "column",
    minHeight: "96px",
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalXXS),
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke2),
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    rowGap: "2px",
    // Reveal the quick-add button on hover or keyboard focus within the cell.
    "&:hover .cc-add-slot": { opacity: 1 },
    "&:focus-within .cc-add-slot": { opacity: 1 },
  },
  weekend: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  outside: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "20px",
  },
  addSlot: {
    display: "flex",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": {
      transitionProperty: "none",
    },
  },
  dayNumber: {
    marginLeft: "auto",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    ...shorthands.padding(0, tokens.spacingHorizontalXXS),
  },
  outsideNumber: {
    color: tokens.colorNeutralForeground4,
  },
  todayNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "20px",
    height: "20px",
    ...shorthands.borderRadius("50%"),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
  chips: {
    display: "flex",
    flexDirection: "column",
    rowGap: "2px",
    minWidth: 0,
  },
  more: {
    ...shorthands.border("none"),
    ...shorthands.padding("2px", tokens.spacingHorizontalXS),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: "transparent",
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    textAlign: "left",
    ":hover": { backgroundColor: tokens.colorNeutralBackground3Hover },
    ":focus-visible": {
      ...shorthands.outline("2px", "solid", tokens.colorStrokeFocus2),
    },
  },
})

export interface ICalendarCellProps {
  date: Date
  items: IContentItem[]
  itemsPerDay: number
  isOutsideMonth: boolean
  locale: string
  onCreateContent?: (date: Date) => void
  onCreatePlaceholder?: (date: Date) => void
}

// One day of the month grid: day number (with today highlight), weekend/outside
// shading, its chips, a "+N more" expander, and a hover quick-add "+".
export const CalendarCell: React.FC<ICalendarCellProps> = ({
  date,
  items,
  itemsPerDay,
  isOutsideMonth,
  locale,
  onCreateContent,
  onCreatePlaceholder,
}) => {
  const styles = useStyles()
  const { pressable } = usePressableStyles()
  const [expanded, setExpanded] = React.useState(false)

  // Quick-add is offered on in-month days when handlers are wired.
  const showAdd =
    !isOutsideMonth && !!onCreateContent && !!onCreatePlaceholder

  const today = checkToday(date)
  const weekend = checkWeekend(date)
  const visible = expanded ? items : items.slice(0, itemsPerDay)
  const overflow = items.length - visible.length

  const dayLabel = date.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  const ariaLabel = `${dayLabel}, ${items.length} item${items.length === 1 ? "" : "s"}`

  return (
    <div
      role="gridcell"
      aria-label={ariaLabel}
      className={mergeClasses(
        styles.cell,
        weekend && styles.weekend,
        isOutsideMonth && styles.outside,
      )}
    >
      <div className={styles.header}>
        {showAdd && (
          <span className={mergeClasses(styles.addSlot, "cc-add-slot")}>
            <QuickAddMenu
              date={date}
              locale={locale}
              onCreateContent={onCreateContent as (d: Date) => void}
              onCreatePlaceholder={onCreatePlaceholder as (d: Date) => void}
            />
          </span>
        )}
        <span
          className={mergeClasses(
            styles.dayNumber,
            isOutsideMonth && styles.outsideNumber,
            today && styles.todayNumber,
          )}
        >
          {date.getDate()}
        </span>
      </div>

      <div className={styles.chips}>
        {visible.map((item) => (
          <EventChip key={item.id} item={item} locale={locale} />
        ))}
        {overflow > 0 && (
          <button
            type="button"
            className={mergeClasses(styles.more, pressable)}
            onClick={() => setExpanded(true)}
            aria-label={`Show ${overflow} more item${overflow === 1 ? "" : "s"} on ${dayLabel}`}
          >
            {`+${overflow} more`}
          </button>
        )}
        {expanded && items.length > itemsPerDay && (
          <button
            type="button"
            className={mergeClasses(styles.more, pressable)}
            onClick={() => setExpanded(false)}
            aria-label={`Show fewer items on ${dayLabel}`}
          >
            Show less
          </button>
        )}
      </div>
    </div>
  )
}

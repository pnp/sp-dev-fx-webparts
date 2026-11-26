import * as React from "react"
import {
  Badge,
  makeStyles,
  shorthands,
  Text,
  tokens,
} from "@fluentui/react-components"
import { IContentCalendarConfig, IContentItem } from "../models"
import { isToday } from "../utils/dateUtils"
import { groupItemsByDay } from "../utils/itemGrouping"
import { hexToRgba } from "../utils/colorUtils"
import { statusBadgeColor, statusColor } from "../utils/statusUtils"
import { ItemIcon } from "../components/ItemIcon"
import { EventDetailPopover } from "../components/EventDetailPopover"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXS,
  },
  dayHeader: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalXXS, 0),
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke2),
  },
  todayHeader: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  // Row is a native button so keyboard activation, focus, and the press
  // animation come for free and it can act as the Popover trigger.
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    width: "100%",
    boxSizing: "border-box",
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.border("none"),
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow2,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    color: tokens.colorNeutralForeground1,
    transitionProperty: "transform, box-shadow, filter",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      boxShadow: tokens.shadow4,
      filter: "brightness(0.98)",
    },
    ":active": {
      transform: "scale(0.99)",
    },
    ":focus-visible": {
      ...shorthands.outline("2px", "solid", tokens.colorStrokeFocus2),
      outlineOffset: "1px",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.001ms",
      ":active": { transform: "none" },
    },
  },
  icon: {
    display: "flex",
    fontSize: "20px",
    lineHeight: 0,
    flexShrink: 0,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    rowGap: "2px",
    flexGrow: 1,
    minWidth: 0,
  },
  title: {
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: tokens.fontWeightSemibold,
  },
  meta: {
    color: tokens.colorNeutralForeground3,
  },
})

export interface IListViewProps {
  config: IContentCalendarConfig
  items: IContentItem[]
  locale: string
}

interface IDayGroup {
  key: string
  date: Date
  items: IContentItem[]
}

// Extracted row keeps the group map below focused on layout (SRP). Clicking a
// row opens its detail Popover.
const ListRow: React.FC<{
  item: IContentItem
  locale: string
  styles: ReturnType<typeof useStyles>
}> = ({ item, locale, styles }) => {
  const time = item.start.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  })
  const ariaLabel = `${item.title}, ${item.contentType}, ${item.status}`

  // Accent by publish state; placeholders keep their own (type) color.
  const accent = item.isPlaceholder ? item.color : statusColor(item.status)

  return (
    <div role="listitem">
      <EventDetailPopover item={item} locale={locale}>
        <button
          type="button"
          aria-label={ariaLabel}
          className={styles.card}
          style={{
            borderLeftColor: accent,
            backgroundColor: hexToRgba(accent, 0.1),
          }}
        >
          <span className={styles.icon}>
            <ItemIcon item={item} color={accent} />
          </span>
          <div className={styles.main}>
            <Text className={styles.title}>{item.title}</Text>
            <Text size={200} className={styles.meta}>
              {`${item.contentType} · ${time}`}
              {item.owner ? ` · ${item.owner}` : ""}
            </Text>
          </div>
          <Badge color={statusBadgeColor(item.status)} appearance="tint">
            {item.status}
          </Badge>
        </button>
      </EventDetailPopover>
    </div>
  )
}

// Agenda view: items grouped by day in chronological order, each row a button
// that opens a detail Popover, with a status badge.
export const ListView: React.FC<IListViewProps> = ({ config, items, locale }) => {
  const styles = useStyles()

  const groups = React.useMemo<IDayGroup[]>(() => {
    // Sort first so day buckets (and rows within them) are chronological.
    const sorted = [...items].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    )
    const byDay = groupItemsByDay(sorted)
    const result: IDayGroup[] = []
    byDay.forEach((groupItems, key) => {
      result.push({ key, date: groupItems[0].start, items: groupItems })
    })
    return result
  }, [items])

  return (
    <div className={styles.root} role="list" aria-label="Content calendar list view">
      {groups.map((group) => (
        <section key={group.key} className={styles.group}>
          <Text
            as="h3"
            size={300}
            className={
              isToday(group.date)
                ? `${styles.dayHeader} ${styles.todayHeader}`
                : styles.dayHeader
            }
          >
            {group.date.toLocaleDateString(locale, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>

          {group.items.map((item) => (
            <ListRow key={item.id} item={item} locale={locale} styles={styles} />
          ))}
        </section>
      ))}
    </div>
  )
}

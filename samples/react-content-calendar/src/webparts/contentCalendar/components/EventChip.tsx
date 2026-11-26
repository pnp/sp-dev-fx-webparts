import * as React from "react"
import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components"
import { IContentItem } from "../models"
import { hexToRgba } from "../utils/colorUtils"
import { statusColor } from "../utils/statusUtils"
import { ItemIcon } from "./ItemIcon"
import { EventDetailPopover } from "./EventDetailPopover"

const useStyles = makeStyles({
  chip: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    ...shorthands.padding("2px", tokens.spacingHorizontalXS),
    borderTopRightRadius: tokens.borderRadiusSmall,
    borderBottomRightRadius: tokens.borderRadiusSmall,
    cursor: "pointer",
    textAlign: "left",
    ...shorthands.border("none"),
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    fontFamily: "inherit",
    transitionProperty: "transform, filter",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      filter: "brightness(0.96)",
      transform: "translateX(1px)",
    },
    ":active": {
      transform: "scale(0.97)",
    },
    ":focus-visible": {
      ...shorthands.outline("2px", "solid", tokens.colorStrokeFocus2),
      outlineOffset: "1px",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.001ms",
      ":hover": { transform: "none" },
      ":active": { transform: "none" },
    },
  },
  icon: {
    display: "flex",
    flexShrink: 0,
    fontSize: "14px",
    lineHeight: 0,
  },
  title: {
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  placeholder: {
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
  },
})

export interface IEventChipProps {
  item: IContentItem
  locale: string
}

// Color-coded content pill for a single item. Clicking it opens a detail
// Popover (EventDetailPopover). The trigger is a native button so keyboard
// activation and the press animation work without extra wiring.
export const EventChip: React.FC<IEventChipProps> = ({ item, locale }) => {
  const styles = useStyles()

  // Accent reflects publish state (Draft / Scheduled / Published) — the
  // meaningful dimension for a Site Pages calendar. Placeholders keep their own
  // (type) color so they read as a distinct category, matching the legend.
  const accent = item.isPlaceholder ? item.color : statusColor(item.status)
  const label = `${item.title} · ${item.contentType} · ${item.status}`

  return (
    <EventDetailPopover item={item} locale={locale}>
      <button
        type="button"
        aria-label={label}
        className={styles.chip}
        style={{
          borderLeftColor: accent,
          backgroundColor: hexToRgba(accent, 0.14),
        }}
      >
        <span className={styles.icon}>
          <ItemIcon item={item} color={accent} />
        </span>
        <span
          className={mergeClasses(
            styles.title,
            item.isPlaceholder && styles.placeholder,
          )}
        >
          {item.title}
        </span>
      </button>
    </EventDetailPopover>
  )
}

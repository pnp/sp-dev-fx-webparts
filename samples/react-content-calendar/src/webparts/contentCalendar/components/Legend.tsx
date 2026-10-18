import * as React from "react"
import {
  makeStyles,
  mergeClasses,
  shorthands,
  Text,
  tokens,
} from "@fluentui/react-components"
import * as strings from "ContentCalendarWebPartStrings"
import { ALL_CONTENT_STATUSES, IContentItem } from "../models"
import { statusColor } from "../utils/statusUtils"
import { usePressableStyles } from "../hooks/usePressableStyles"

export const PLACEHOLDER_KEY = "Placeholder"

// The filterable legend keys: the three statuses plus a Placeholder bucket.
export const LEGEND_KEYS: string[] = [...ALL_CONTENT_STATUSES, PLACEHOLDER_KEY]

// The filter bucket an item belongs to. Placeholders are their own category
// even though their underlying status is Draft.
export function itemFilterKey(item: IContentItem): string {
  return item.isPlaceholder ? PLACEHOLDER_KEY : item.status
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXS,
    ...shorthands.padding(tokens.spacingVerticalXXS, 0),
  },
  // Each entry is a toggle button.
  item: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
    ...shorthands.border("none"),
    ...shorthands.padding("3px", tokens.spacingHorizontalXS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    transitionProperty: "opacity, background-color",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": { backgroundColor: tokens.colorNeutralBackground1Hover },
    ":focus-visible": {
      ...shorthands.outline("2px", "solid", tokens.colorStrokeFocus2),
    },
    "@media (prefers-reduced-motion: reduce)": { transitionProperty: "none" },
  },
  inactive: {
    opacity: 0.4,
  },
  swatch: {
    width: "12px",
    height: "12px",
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    flexShrink: 0,
  },
  label: {
    color: tokens.colorNeutralForeground1,
  },
  labelInactive: {
    textDecorationLine: "line-through",
  },
})

interface ILegendEntry {
  key: string
  label: string
  color: string
}

export interface ILegendProps {
  // key -> whether items of that category are shown.
  active: Record<string, boolean>
  onToggle: (key: string) => void
  // Color placeholders are drawn with in the calendar (their type color).
  placeholderColor: string
}

// Combined status + placeholder legend. Each entry is a toggle that filters the
// calendar by its category, with a solid swatch matching the calendar color.
export const Legend: React.FC<ILegendProps> = ({
  active,
  onToggle,
  placeholderColor,
}) => {
  const styles = useStyles()
  const { pressable } = usePressableStyles()

  const entries: ILegendEntry[] = [
    ...ALL_CONTENT_STATUSES.map((s) => ({ key: s, label: s, color: statusColor(s) })),
    { key: PLACEHOLDER_KEY, label: strings.LegendPlaceholder, color: placeholderColor },
  ]

  return (
    <div className={styles.root} role="group" aria-label="Filter calendar by status">
      {entries.map((entry) => {
        const on = active[entry.key] !== false
        return (
          <button
            key={entry.key}
            type="button"
            aria-pressed={on}
            aria-label={`${entry.label}${on ? "" : " (hidden)"}`}
            className={mergeClasses(
              styles.item,
              pressable,
              !on && styles.inactive,
            )}
            onClick={() => onToggle(entry.key)}
          >
            <span
              className={styles.swatch}
              style={{ backgroundColor: entry.color }}
            />
            <Text
              size={200}
              className={mergeClasses(styles.label, !on && styles.labelInactive)}
            >
              {entry.label}
            </Text>
          </button>
        )
      })}
    </div>
  )
}

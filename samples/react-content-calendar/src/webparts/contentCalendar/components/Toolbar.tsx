import * as React from "react"
import {
  Button,
  makeStyles,
  mergeClasses,
  shorthands,
  Tab,
  TabList,
  Text,
  tokens,
} from "@fluentui/react-components"
import {
  bundleIcon,
  ChevronLeft24Filled,
  ChevronLeft24Regular,
  ChevronRight24Filled,
  ChevronRight24Regular,
} from "@fluentui/react-icons"
import { CalendarView } from "../models"
import { usePressableStyles } from "../hooks/usePressableStyles"
import { TodayIcon, VIEW_ICONS } from "./ContentTypeIcon"

const ChevronLeft = bundleIcon(ChevronLeft24Filled, ChevronLeft24Regular)
const ChevronRight = bundleIcon(ChevronRight24Filled, ChevronRight24Regular)

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    ...shorthands.padding(tokens.spacingVerticalS, 0),
  },
  nav: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
  },
  label: {
    minWidth: "160px",
    fontWeight: tokens.fontWeightSemibold,
  },
  // Base: give every toolbar icon a transform transition so the per-button
  // hover motion below animates smoothly. Disabled under reduced motion.
  iconMotion: {
    "& svg": {
      transitionProperty: "transform",
      transitionDuration: tokens.durationNormal,
      transitionTimingFunction: tokens.curveEasyEase,
    },
    "@media (prefers-reduced-motion: reduce)": {
      "& svg": { transitionProperty: "none" },
    },
  },
  today: {
    // A little "spring to today" nudge.
    "&:hover svg": { transform: "scale(1.15) rotate(-8deg)" },
  },
  prev: {
    "&:hover svg": { transform: "translateX(-2px)" },
  },
  next: {
    "&:hover svg": { transform: "translateX(2px)" },
  },
  tabIcon: {
    "&:hover svg": { transform: "scale(1.12)" },
  },
})

const VIEW_LABELS: Record<CalendarView, string> = {
  [CalendarView.Month]: "Month",
  [CalendarView.Week]: "Week",
  [CalendarView.List]: "List",
}

export interface IToolbarProps {
  label: string
  view: CalendarView
  enabledViews: CalendarView[]
  todayLabel: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onChangeView: (view: CalendarView) => void
}

// Calendar navigation + view switch. Presentational; the parent owns the date
// and view state.
export const Toolbar: React.FC<IToolbarProps> = ({
  label,
  view,
  enabledViews,
  todayLabel,
  onPrev,
  onNext,
  onToday,
  onChangeView,
}) => {
  const styles = useStyles()
  const { pressable } = usePressableStyles()

  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        <Button
          appearance="subtle"
          shape="circular"
          className={mergeClasses(pressable, styles.iconMotion, styles.today)}
          icon={<TodayIcon />}
          onClick={onToday}
        >
          {todayLabel}
        </Button>
        <Button
          appearance="subtle"
          shape="circular"
          className={mergeClasses(pressable, styles.iconMotion, styles.prev)}
          icon={<ChevronLeft />}
          aria-label="Previous"
          onClick={onPrev}
        />
        <Button
          appearance="subtle"
          shape="circular"
          className={mergeClasses(pressable, styles.iconMotion, styles.next)}
          icon={<ChevronRight />}
          aria-label="Next"
          onClick={onNext}
        />
        <Text className={styles.label} size={400} as="h2">
          {label}
        </Text>
      </div>

      {enabledViews.length > 1 && (
        <TabList
          selectedValue={view}
          onTabSelect={(_, data) => onChangeView(data.value as CalendarView)}
        >
          {enabledViews.map((v) => {
            const Icon = VIEW_ICONS[v]
            return (
              <Tab
                key={v}
                value={v}
                className={mergeClasses(styles.iconMotion, styles.tabIcon)}
                // Filled variant marks the active view.
                icon={Icon ? <Icon filled={v === view} /> : undefined}
              >
                {VIEW_LABELS[v]}
              </Tab>
            )
          })}
        </TabList>
      )}
    </div>
  )
}

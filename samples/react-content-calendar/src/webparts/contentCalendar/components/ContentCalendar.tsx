import * as React from "react"
import {
  makeStyles,
  MessageBar,
  MessageBarBody,
  shorthands,
  Spinner,
  tokens,
} from "@fluentui/react-components"
import * as strings from "ContentCalendarWebPartStrings"

import { CalendarView, IContentCalendarConfig, IContentItem } from "../models"
import { IContentService } from "../services"
import { PlaceholderStore, placeholdersToItems } from "../services/PlaceholderStore"
import { useCalendarData } from "../hooks/useCalendarData"
import { resolveContentType } from "../utils/contentTypeResolver"
import {
  addMonths,
  addWeeks,
  formatWeekLabel,
  getMonthRange,
  getWeekRange,
} from "../utils/dateUtils"
import { Toolbar } from "./Toolbar"
import { Legend, LEGEND_KEYS, itemFilterKey } from "./Legend"
import { PlaceholderDialog } from "./PlaceholderDialog"
import { CreatePageDialog, ICreatePageOptions } from "./CreatePageDialog"
import { MonthView } from "../views/MonthView"
import { WeekView } from "../views/WeekView"
import { ListView } from "../views/ListView"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXS,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...shorthands.padding(tokens.spacingVerticalXXXL, 0),
  },
})

export interface IContentCalendarViewProps {
  service: IContentService
  config: IContentCalendarConfig
  locale: string
  // Scopes placeholder localStorage per web-part instance.
  instanceId: string
}

// Root of the React tree below the FluentProvider. Owns the visible date and
// active view, scopes the data query to that range, and composes the toolbar,
// legend, and the active view with loading/error/empty states.
export const ContentCalendar: React.FC<IContentCalendarViewProps> = ({
  service,
  config,
  locale,
  instanceId,
}) => {
  const styles = useStyles()
  const [current, setCurrent] = React.useState<Date>(new Date())
  const [view, setView] = React.useState<CalendarView>(config.defaultView)

  // Locally-stored placeholder reservations, merged into the fetched items.
  const store = React.useMemo(() => new PlaceholderStore(instanceId), [instanceId])
  const [placeholders, setPlaceholders] = React.useState(() => store.getAll())
  const [addDialog, setAddDialog] = React.useState<{ open: boolean; date?: Date }>(
    { open: false },
  )
  const [pageDialogOpen, setPageDialogOpen] = React.useState(false)

  // Legend filter state: every category starts visible.
  const [filters, setFilters] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    LEGEND_KEYS.forEach((k) => {
      initial[k] = true
    })
    return initial
  })
  const toggleFilter = (key: string): void =>
    setFilters((f) => ({ ...f, [key]: !f[key] }))

  // Placeholder color = the Placeholder type color, the same value the chips
  // resolve, so the legend swatch matches the calendar exactly.
  const placeholderColor = React.useMemo(
    () => resolveContentType("Placeholder", config.contentTypes).color,
    [config.contentTypes],
  )

  // Week view scopes to the visible week; Month and List scope to the month.
  const isWeek = view === CalendarView.Week
  const range = React.useMemo(
    () =>
      isWeek
        ? getWeekRange(current, config.firstDayOfWeek)
        : getMonthRange(current, config.firstDayOfWeek),
    [isWeek, current, config.firstDayOfWeek],
  )

  const { items, loading, error, reload } = useCalendarData(service, config, range)

  // Merge fetched items with in-range placeholders for the active view.
  const displayItems = React.useMemo<IContentItem[]>(
    () => items.concat(placeholdersToItems(placeholders, config, range)),
    [items, placeholders, config, range],
  )

  // Apply the legend filters (only when the legend/filter UI is shown).
  const visibleItems = React.useMemo<IContentItem[]>(
    () =>
      config.showStatusLegend
        ? displayItems.filter((i) => filters[itemFilterKey(i)] !== false)
        : displayItems,
    [displayItems, filters, config.showStatusLegend],
  )

  const label = React.useMemo(
    () =>
      isWeek
        ? formatWeekLabel(current, config.firstDayOfWeek, locale)
        : current.toLocaleDateString(locale, { month: "long", year: "numeric" }),
    [isWeek, current, config.firstDayOfWeek, locale],
  )

  const goToday = (): void => setCurrent(new Date())
  const goPrev = (): void =>
    setCurrent((d) => (isWeek ? addWeeks(d, -1) : addMonths(d, -1)))
  const goNext = (): void =>
    setCurrent((d) => (isWeek ? addWeeks(d, 1) : addMonths(d, 1)))

  const openPlaceholderDialog = (date: Date): void =>
    setAddDialog({ open: true, date })
  const submitPlaceholder = (title: string, notes?: string): void => {
    if (addDialog.date) {
      store.add({ title, date: addDialog.date, notes })
      setPlaceholders(store.getAll())
    }
    setAddDialog({ open: false })
  }
  // "Create content" opens the page dialog; on submit we create a Site Page and
  // open it (new tab, falling back to same-tab if the popup is blocked).
  const createContent = (_date: Date): void => setPageDialogOpen(true)
  const createPage = async (
    title: string,
    options: ICreatePageOptions,
  ): Promise<void> => {
    const { url } = await service.createPage(title, options)
    setPageDialogOpen(false)
    const editUrl = `${url}?Mode=Edit`
    const win = window.open(editUrl, "_blank")
    if (!win) window.location.href = editUrl
    reload()
  }

  const renderView = (): React.ReactNode => {
    switch (view) {
      case CalendarView.Week:
        return (
          <WeekView
            anchorDate={current}
            config={config}
            items={visibleItems}
            locale={locale}
          />
        )
      case CalendarView.List:
        return <ListView config={config} items={visibleItems} locale={locale} />
      case CalendarView.Month:
      default:
        return (
          <MonthView
            anchorDate={current}
            config={config}
            items={visibleItems}
            locale={locale}
            onCreateContent={createContent}
            onCreatePlaceholder={openPlaceholderDialog}
          />
        )
    }
  }

  const isEmpty = !loading && !error && visibleItems.length === 0

  const dialogDateLabel = addDialog.date
    ? addDialog.date.toLocaleDateString(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : undefined

  return (
    <div className={styles.root}>
      <Toolbar
        label={label}
        view={view}
        enabledViews={config.enabledViews}
        todayLabel={strings.LabelToday}
        onPrev={goPrev}
        onNext={goNext}
        onToday={goToday}
        onChangeView={setView}
      />

      {config.showStatusLegend && (
        <Legend
          active={filters}
          onToggle={toggleFilter}
          placeholderColor={placeholderColor}
        />
      )}

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}

      {isEmpty && (
        <MessageBar intent="info">
          <MessageBarBody>{strings.EmptyStateTitle}</MessageBarBody>
        </MessageBar>
      )}

      {loading ? (
        <div className={styles.centered}>
          <Spinner label={strings.LoadingLabel} />
        </div>
      ) : (
        renderView()
      )}

      <PlaceholderDialog
        open={addDialog.open}
        dateLabel={dialogDateLabel}
        onDismiss={() => setAddDialog({ open: false })}
        onSubmit={submitPlaceholder}
      />

      <CreatePageDialog
        open={pageDialogOpen}
        onDismiss={() => setPageDialogOpen(false)}
        onCreate={createPage}
      />
    </div>
  )
}

// Re-export the domain type used by consumers of onOpenItem later (M5).
export type { IContentItem }

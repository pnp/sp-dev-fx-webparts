import { CalendarView } from "./CalendarView"
import { IContentTypeConfig } from "./IContentTypeConfig"
import { IFieldMapping } from "./IFieldMapping"

// The full set of persisted/derived web-part settings, resolved (with defaults
// applied) before being handed to the React tree. The field mapping and content
// types are fixed internals for the Site Pages source; only the list and legend
// are user-facing.
export interface IContentCalendarConfig {
  // --- Data source ---
  listId?: string
  webUrl?: string
  fieldMapping: IFieldMapping

  // --- Content types & colors (fixed internals) ---
  contentTypes: IContentTypeConfig[]
  // Show the Draft / Scheduled / Published status legend.
  showStatusLegend: boolean

  // --- Display & behavior (Page 3, sensible defaults for MVP) ---
  defaultView: CalendarView
  enabledViews: CalendarView[]
  firstDayOfWeek: number // 0 = Sunday ... 6 = Saturday
  showWeekends: boolean
  itemsPerDay: number // chips shown before the "+N more" overflow

  // --- Performance (Page 4) ---
  maxItems: number
  cacheDurationMinutes: number
}

// An inclusive start / exclusive end window used to scope every read query so
// we never fetch a whole list.
export interface IDateRange {
  start: Date
  end: Date
}

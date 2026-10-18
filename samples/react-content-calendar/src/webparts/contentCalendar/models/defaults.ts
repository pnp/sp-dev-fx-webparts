import { CalendarView } from "./CalendarView"
import { IContentCalendarConfig } from "./IContentCalendarConfig"
import { IContentTypeConfig } from "./IContentTypeConfig"
import { IFieldMapping } from "./IFieldMapping"

// The nine content types from the spec, with default colors and icon keys.
// Colors are user-editable data (Page 2), so hex literals belong here, not in
// component styles.
export const DEFAULT_CONTENT_TYPES: IContentTypeConfig[] = [
  { enabled: true, name: "News", sourceValue: "News", color: "#0f6cbd", icon: "News" },
  { enabled: true, name: "Event", sourceValue: "Event", color: "#107c10", icon: "Event" },
  { enabled: true, name: "FAQ", sourceValue: "FAQ", color: "#8764b8", icon: "FAQ" },
  { enabled: true, name: "Job", sourceValue: "Job", color: "#c19c00", icon: "Job" },
  { enabled: true, name: "Incident", sourceValue: "Incident", color: "#d13438", icon: "Incident" },
  { enabled: true, name: "Notification", sourceValue: "Notification", color: "#ca5010", icon: "Notification" },
  { enabled: true, name: "Newsletter", sourceValue: "Newsletter", color: "#038387", icon: "Newsletter" },
  { enabled: true, name: "Page", sourceValue: "Page", color: "#5c5c5c", icon: "Page" },
  { enabled: true, name: "Placeholder", sourceValue: "Placeholder", color: "#8a8886", icon: "Placeholder" },
]

// Fixed field mapping for the SharePoint Site Pages library. These columns
// exist on every modern pages library, so loading works without configuration.
// `Created` is used for the calendar date because it's always populated (unlike
// FirstPublishedDate, which is null for drafts); `ContentType` is the built-in
// navigation field, read via expand in ContentService.
export const DEFAULT_FIELD_MAPPING: IFieldMapping = {
  title: "Title",
  start: "Created",
  end: "",
  contentType: "ContentType",
  status: "",
  owner: "",
  thumbnail: "",
  url: "",
}

// Every setting has a default so the web part renders usefully before a list is
// chosen (falls back to sample data — see SampleContentProvider).
export function getDefaultConfig(): IContentCalendarConfig {
  return {
    listId: undefined,
    fieldMapping: { ...DEFAULT_FIELD_MAPPING },
    contentTypes: DEFAULT_CONTENT_TYPES.map((t) => ({ ...t })),
    showStatusLegend: true,
    defaultView: CalendarView.Month,
    enabledViews: [CalendarView.Month, CalendarView.Week, CalendarView.List],
    firstDayOfWeek: 1, // Monday
    showWeekends: true,
    itemsPerDay: 3,
    maxItems: 500,
    cacheDurationMinutes: 5,
  }
}

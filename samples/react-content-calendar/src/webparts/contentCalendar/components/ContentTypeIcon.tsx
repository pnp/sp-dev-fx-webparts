import * as React from "react"
import {
  Alert24Filled,
  Alert24Regular,
  AppsList24Filled,
  AppsList24Regular,
  Briefcase24Filled,
  Briefcase24Regular,
  bundleIcon,
  CalendarLtr24Filled,
  CalendarLtr24Regular,
  CalendarMonth24Filled,
  CalendarMonth24Regular,
  CalendarToday24Filled,
  CalendarToday24Regular,
  CalendarWeekStart24Filled,
  CalendarWeekStart24Regular,
  Document24Filled,
  Document24Regular,
  type FluentIcon,
  Mail24Filled,
  Mail24Regular,
  News24Filled,
  News24Regular,
  QuestionCircle24Filled,
  QuestionCircle24Regular,
  SlideLayout24Filled,
  SlideLayout24Regular,
  Warning24Filled,
  Warning24Regular,
} from "@fluentui/react-icons"

// bundleIcon pairs a Filled + Regular variant into a single component. It shows
// Regular by default and Filled when `filled` is set (or an ancestor toggles
// it) — used for active/hover state on the toolbar.

// Maps a content-type icon key (from Page 2 config) to a bundled Fluent icon.
const CONTENT_TYPE_ICONS: Record<string, FluentIcon> = {
  News: bundleIcon(News24Filled, News24Regular),
  Event: bundleIcon(CalendarLtr24Filled, CalendarLtr24Regular),
  FAQ: bundleIcon(QuestionCircle24Filled, QuestionCircle24Regular),
  Job: bundleIcon(Briefcase24Filled, Briefcase24Regular),
  Incident: bundleIcon(Warning24Filled, Warning24Regular),
  Notification: bundleIcon(Alert24Filled, Alert24Regular),
  Newsletter: bundleIcon(Mail24Filled, Mail24Regular),
  Page: bundleIcon(Document24Filled, Document24Regular),
  Placeholder: bundleIcon(SlideLayout24Filled, SlideLayout24Regular),
}

const DocumentIcon = CONTENT_TYPE_ICONS.Page

// View-toggle icons keyed by CalendarView value.
export const VIEW_ICONS: Record<string, FluentIcon> = {
  month: bundleIcon(CalendarMonth24Filled, CalendarMonth24Regular),
  week: bundleIcon(CalendarWeekStart24Filled, CalendarWeekStart24Regular),
  list: bundleIcon(AppsList24Filled, AppsList24Regular),
}

export const TodayIcon = bundleIcon(
  CalendarToday24Filled,
  CalendarToday24Regular,
)

export interface IContentTypeIconProps {
  iconKey: string
  color?: string
  className?: string
}

// Renders the icon for a content type, tinted with the resolved type color.
// Decorative by default (aria-hidden) since it's always paired with a label.
export const ContentTypeIcon: React.FC<IContentTypeIconProps> = ({
  iconKey,
  color,
  className,
}) => {
  const Icon = CONTENT_TYPE_ICONS[iconKey] ?? DocumentIcon
  return (
    <span aria-hidden className={className} style={color ? { color } : undefined}>
      <Icon />
    </span>
  )
}

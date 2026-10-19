import { BadgeProps } from "@fluentui/react-components"
import { ContentStatus } from "../models"

// Maps a Site Page status to a Fluent Badge color. Kept separate so the badge
// styling has a single source across views.
export function statusBadgeColor(status: ContentStatus): BadgeProps["color"] {
  switch (status) {
    case ContentStatus.Published:
      return "success"
    case ContentStatus.Scheduled:
      return "warning"
    case ContentStatus.Draft:
    default:
      return "informative"
  }
}

// Concrete hex per status, used for the item card's left border (full/dark) and
// its tinted background so publish state reads at a glance. These mirror the
// badge intents above (success/warning/informative).
export function statusColor(status: ContentStatus): string {
  switch (status) {
    case ContentStatus.Published:
      return "#0e700e" // green
    case ContentStatus.Scheduled:
      return "#ca5010" // orange
    case ContentStatus.Draft:
    default:
      return "#0f6cbd" // blue
  }
}


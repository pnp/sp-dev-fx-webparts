import * as React from "react"
import {
  bundleIcon,
  DocumentCheckmark24Filled,
  DocumentCheckmark24Regular,
  DocumentEdit24Filled,
  DocumentEdit24Regular,
  DocumentLock24Filled,
  DocumentLock24Regular,
  DocumentTextClock24Filled,
  DocumentTextClock24Regular,
  type FluentIcon,
} from "@fluentui/react-icons"
import { ContentStatus, IContentItem } from "../models"

// Status-apt icons: Published = checkmark (approved/live), Draft = edit,
// Scheduled = clock (timed), Placeholder = lock (a reserved slot).
const PublishedIcon = bundleIcon(DocumentCheckmark24Filled, DocumentCheckmark24Regular)
const DraftIcon = bundleIcon(DocumentEdit24Filled, DocumentEdit24Regular)
const ScheduledIcon = bundleIcon(DocumentTextClock24Filled, DocumentTextClock24Regular)
const PlaceholderIcon = bundleIcon(DocumentLock24Filled, DocumentLock24Regular)

const STATUS_ICONS: Record<string, FluentIcon> = {
  [ContentStatus.Published]: PublishedIcon,
  [ContentStatus.Draft]: DraftIcon,
  [ContentStatus.Scheduled]: ScheduledIcon,
}

export interface IItemIconProps {
  item: IContentItem
  color?: string
  className?: string
}

// Renders the icon representing an item: a placeholder marker, or the icon for
// its publish status (Published / Draft / Scheduled). Decorative (aria-hidden)
// since it's always paired with a label.
export const ItemIcon: React.FC<IItemIconProps> = ({ item, color, className }) => {
  const Icon = item.isPlaceholder
    ? PlaceholderIcon
    : STATUS_ICONS[item.status] ?? DraftIcon
  return (
    <span aria-hidden className={className} style={color ? { color } : undefined}>
      <Icon />
    </span>
  )
}

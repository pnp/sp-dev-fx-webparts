import { IContentItem } from "../models"

// Stable per-day key (local time) used to bucket items in the calendar views.
export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

// Groups items by their start day. Shared by Month/Week/List so grouping logic
// lives in one place.
export function groupItemsByDay(
  items: IContentItem[],
): Map<string, IContentItem[]> {
  const map = new Map<string, IContentItem[]>()
  items.forEach((item) => {
    const key = dayKey(item.start)
    const bucket = map.get(key)
    if (bucket) bucket.push(item)
    else map.set(key, [item])
  })
  return map
}

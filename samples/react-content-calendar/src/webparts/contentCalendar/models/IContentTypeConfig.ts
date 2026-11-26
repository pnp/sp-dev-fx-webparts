// One row of the Page 2 "Content Types & Colors" collection. Single source of
// the color/icon legend and the resolver used when normalizing list rows.
export interface IContentTypeConfig {
  enabled: boolean
  // Display name shown on chips and in the legend.
  name: string
  // In single-list mode: the Content Type column value to match a row against.
  // In list-per-type mode: the source list title to read items from.
  sourceValue: string
  // Hex color for the chip/legend. This is user data, not a theme token.
  color: string
  // Icon key resolved by ContentTypeIcon (e.g. "News", "Event", "FAQ").
  icon: string
}

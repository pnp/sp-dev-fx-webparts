import { ContentStatus } from "./ContentStatus"

// A person reference (from a SharePoint user field) for avatar display.
export interface IPersonRef {
  name: string
  email?: string
}

// A single scheduled content entry, already normalized from its source list row
// via the configured field mapping. `color`/`icon` are resolved from the
// content-type config so view components never re-derive them.
export interface IContentItem {
  id: number | string
  title: string
  contentType: string
  start: Date
  end?: Date
  status: ContentStatus
  owner?: string
  url?: string
  thumbnailUrl?: string
  color: string
  icon: string
  isPlaceholder: boolean
  // Audit metadata (built-in Author/Editor/Created/Modified fields).
  author?: IPersonRef
  editor?: IPersonRef
  created?: Date
  modified?: Date
  published?: Date
  publishedDateText?: string
  scheduledDateText?: string
}

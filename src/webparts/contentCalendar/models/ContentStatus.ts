// Editorial lifecycle. Scoped to the states a SharePoint Site Page actually has:
// Draft (unpublished / minor version), Scheduled (native page scheduling), and
// Published (major version). In Review / Archived / Expired don't apply to Site
// Pages (they require content approval or records management), so they're
// intentionally omitted.
export enum ContentStatus {
  Draft = "Draft",
  Scheduled = "Scheduled",
  Published = "Published",
}

// Explicit list for lookups (avoids Object.values, which needs a newer lib
// target than the SPFx build rig sets).
export const ALL_CONTENT_STATUSES: ContentStatus[] = [
  ContentStatus.Draft,
  ContentStatus.Scheduled,
  ContentStatus.Published,
]

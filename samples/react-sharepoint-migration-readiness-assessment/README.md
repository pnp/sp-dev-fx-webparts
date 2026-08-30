# Migration Readiness Assessment

SPFx 1.23.2, React 17, Fluent UI v9. This web part performs a strictly read-only heuristic assessment using SharePoint REST `GET` requests only. It never migrates, copies, creates, updates, deletes, moves, renames, publishes, or alters content, metadata, permissions, or taxonomy.

## Setup

Use Node `>=22.14.0 <23.0.0`, then run:

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Configure up to four root-relative or same-origin HTTPS list/library paths. The reader requests only the allow-list fields in `services/assessment.ts`, at most 50 rows per page, five pages, and 200 rows per source. Reference date and thresholds are explicit web-part properties.

## Security and limitations

This is an assessment aid, not a migration tool or compatibility certification. Signals are heuristics with incomplete, bounded coverage. Unknown, malformed, inaccessible, empty, and partial results must be reviewed by a tenant administrator. Validate the tenant, web URL, source paths, intended permissions, retention/compliance needs, custom columns, content types, links, workflows, and a representative sample before any separate migration plan. HTTP 401/403, 429/503, malformed responses, and other failures are surfaced without attempting writes.

## Reference

[Microsoft SharePoint Framework documentation](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

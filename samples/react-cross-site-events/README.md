# React Cross-site Events

An SPFx 1.23.2 web part using React 17, Fluent UI 9, and PnPjs Graph. It reads Microsoft 365 group `calendarView` data and presents one resilient, accessible event list.

## Source configuration

In the property pane, add one source per line using this exact format:

```text
https://contoso.sharepoint.com/sites/marketing|00000000-0000-0000-0000-000000000000
```

The URL must be an HTTPS `/sites/...` or `/teams/...` URL on the current tenant host. The value after `|` is the Microsoft 365 group ID for the team site. At most eight unique sources are accepted; invalid lines are shown without making a request. The group ID is explicit because Microsoft Graph site URLs and group IDs are different resource identifiers, while `calendarView` is a group-calendar API.

`Days back` is capped at 31 and `Days ahead` at 92. Dates are requested as UTC boundaries, normalized with the Graph time-zone value, and formatted in the configured IANA display zone.

## Graph permissions

The package requests these delegated Microsoft Graph permissions in `config/package-solution.json`:

- `Group.Read.All` — required for a Microsoft 365 group calendar `calendarView`.
- `Sites.Read.All` — required to resolve and validate each configured SharePoint site URL.

The sample is read-only: it does not create, update, delete, or subscribe to events. A SharePoint administrator must approve the requests in the SharePoint admin center after deploying the `.sppkg`. Users must also be members of, or otherwise permitted to access, each configured group/site.

## Tenant validation checklist

Before deployment, validate each configured source in Graph Explorer or an equivalent tenant-approved tool:

1. Confirm the site URL resolves with `GET /sites/{hostname}:/{server-relative-path}`.
2. Confirm the supplied group ID is the Microsoft 365 group connected to that team site (`GET /groups/{group-id}/sites/root`) and that the returned `webUrl` matches the configured URL.
3. Confirm the signed-in user can read the group calendar with `GET /groups/{group-id}/calendarView?startDateTime=...&endDateTime=...`.
4. Confirm the app's requested permissions are consented. A 401/403 is rendered as an actionable per-source state; one denied source does not hide successful sources.

Graph calendar responses can contain UTC or named time-zone date-time values. The adapter handles both and rejects malformed or inverted events safely. A source can be retried independently after transient, throttling, or session failures.

## Run

Use Node.js 18.17.1–22 with the SPFx 1.23.2 toolchain:

```bash
npm install
npm test
gulp serve
```

For a package build:

```bash
gulp bundle --ship
gulp package-solution --ship
```

Use the hosted workbench for Graph calls; the local workbench does not provide a production SharePoint page context.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-cross-site-events" />

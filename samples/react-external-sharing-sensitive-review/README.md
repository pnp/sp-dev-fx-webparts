# External Sharing and Sensitive Content Review

This SPFx 1.23.2 React 17 web part is a bounded, read-only review aid. It uses SharePoint REST through `SPHttpClient` with GET requests only, accepts at most four server-relative list/library paths, reads at most five pages of 50 rows (200 rows per source), and never mutates content or permissions.

## Setup and configuration

Run on Node `>=22.14.0 <23.0.0`. In the property pane, enter one validated server-relative list or library path per line, for example `/sites/Finance/Shared Documents`. The current user must already have read access. Optional SharePoint fields vary by tenant, list, content type, and policy configuration; missing fields are displayed as unavailable.

## Scope and security disclaimer

This is a heuristic triage view, not a security enforcement tool. It does not change sharing, permissions, labels, compliance tags, or content; it does not request Graph permissions; and it cannot claim authoritative Purview or tenant security state. Signals are evidence from available list-item fields only. Validate findings with content owners and the tenant’s approved governance/security tooling.

## Validation

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Before tenant use, confirm: the app is deployed only to intended sites; the configured paths are correct; least-privilege read access is sufficient; representative rows cover optional-field absence and unique permissions; labels and sharing policies are validated in authoritative tools; throttling and 401/403 behavior are understood; and the generated package is reviewed before deployment.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-external-sharing-sensitive-review" />

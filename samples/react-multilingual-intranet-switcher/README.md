# Multilingual Intranet Switcher

An SPFx 1.23.2 React 17 web part using Fluent UI v9 to show read-only intranet navigation/content links in a user-selected language.

This sample does not translate content, infer translations, call a translation API, read SharePoint data, write data, or mutate tenant state. Locale detection reads the browser locale only once as the initial default. The accessible language selector is always available for an explicit choice.

## Run

```bash
nvm use
npm install
npm test
npm run build
```

Use `npm run serve` only after adding the standard SPFx serve script if local workbench serving is needed; the included `config/serve.json` targets the hosted SharePoint workbench.

## Configuration schema

Set the web part's `configurationJson` property to one JSON object:

```json
{
  "defaultLocale": "en-US",
  "locales": [
    {
      "code": "en-US",
      "displayName": "English",
      "items": [
        {
          "id": "home",
          "label": "Home",
          "url": "/sites/intranet/SitePages/home.aspx",
          "description": "Company home"
        }
      ]
    }
  ]
}
```

Required fields are `defaultLocale`, `locales[]`, `code`, `displayName`, `items[]`, `id`, `label`, and `url`. `description` is optional. Locale codes use a strict BCP 47-style shape such as `en`, `en-US`, or `zh-Hans-CN`; locale codes and item IDs must be unique. `defaultLocale` must be one of the configured locales.

The parser enforces these bounds before rendering: 100,000 JSON characters, 12 locales, 24 items per locale, 20 locale-code characters, 80 display-name characters, 80 ID characters, 160 label characters, 2,048 URL characters, and 400 description characters. Invalid JSON or schema data shows an error with a retry action. A valid configuration with no usable links shows an empty state.

## URL and tenant validation

Links may be relative or absolute, but the component accepts only `http`/`https` URLs whose origin exactly matches the current SharePoint web's origin. `javascript:`, `data:`, protocol-relative external URLs, credentials, malformed URLs, and external hosts are discarded. This is a same-origin guard for the current tenant; administrators should still review every configured path and publish the web part only in the intended tenant.

The sample has no API permissions and no `webApiPermissionRequests`. It uses only the SPFx page context to obtain the current web origin. It performs no POST, PATCH, PUT, DELETE, list update, navigation mutation, or configuration persistence.

## Accessibility and behavior

The selector is a native keyboard-operable Fluent UI select with an accessible label. Navigation is a labelled `nav` list of links, status messages use a polite live region, and malformed configuration uses an alert. Layout collapses to a full-width selector on narrow screens; links remain keyboard-focusable with a visible focus indicator.

Browser locale matching is deterministic: exact supported tag, then matching language, then configured default. Unsupported or malformed browser locale values are ignored. Selecting a language never changes the URL or configuration.

## References

- [Microsoft Graph localeInfo resource](https://learn.microsoft.com/graph/api/resources/localeinfo?view=graph-rest-1.0)
- [SharePoint Framework overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Build a SharePoint Framework client-side web part](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

PnP metadata is in [`assets/sample.json`](assets/sample.json), with the sample credited to `vystartasv` and dated `2026-08-30`.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-multilingual-intranet-switcher" />

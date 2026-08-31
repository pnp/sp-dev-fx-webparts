# Viva Connections ACE reference

This sample is a small, local-data SPFx 1.23.2 React 17 web part. It renders a responsive dashboard of up to eight configurable cards. Selecting a card opens a local detail panel, illustrating the interaction model commonly used by a Viva Connections Adaptive Card Extension (ACE).

It is technically implemented as a web part, not an ACE. Use the typed card model, normalization rules, keyboard interaction, and detail-panel state as a reference when adapting the experience into an ACE. The sample makes no network calls, requests no Graph permissions, writes no data, and uses no telemetry or secrets.

## Run

```bash
npm ci
npm test
npm run verify
npm run build
npm run package
```

Use the web part property pane to set a title and a JSON array. Cards require non-empty `title` and `summary`; optional `category` and `link` values are normalized. Links are retained only when they use `http` or `https`, and the list is capped at eight valid cards. The included `assets/sample.json` is the PnP gallery metadata record, not the card input.

The cards are keyboard focusable and open with Enter or Space. Focus is visibly outlined, and the detail panel is announced as a live region. Contrast and responsive layout are designed with WCAG AA-conscious colors in mind.

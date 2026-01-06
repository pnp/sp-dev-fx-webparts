Giscus Minimal Light Theme
==========================

Usage
-----

Host `giscus-light-min.css` on your site (already placed at `static/giscus/giscus-light-min.css`). Then point giscus to it with the `data-theme` attribute when embedding the widget. Example:

```html
<script src="https://giscus.app/client.js"
  data-repo="owner/repo"
  data-repo-id="MDEwOlJlcG9zaXRvcnk="
  data-category="Announcements"
  data-category-id="DIC_kwDOA"
  data-mapping="pathname"
  data-theme="/giscus/giscus-light-min.css"
  crossorigin="anonymous"
  async>
</script>
```

Customization
-------------

Override CSS variables in your site or page to customize the look (for example in a site-level stylesheet):

```css
:root {
  --gcs-accent: #ff4500;
  --gcs-text: #111827;
  --gcs-border: #e5e7eb;
}
```

Notes
-----

- This file is intentionally minimal — it provides sensible defaults and a small variable surface for customization.
- If you use a CDN or different base path, update `data-theme` accordingly.

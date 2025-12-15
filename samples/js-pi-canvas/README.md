<p align="center">
  <img src="assets/picanvas-icon.png" alt="PiCanvas Logo" width="96" height="96">
</p>

# PiCanvas

Organize SharePoint web parts into tabs. Consolidate pages, reduce scrolling, build simple app-like experiences.

![Version](https://img.shields.io/badge/Version-2.0.21.1-blue.svg)
![SPFx Version](https://img.shields.io/badge/SPFx-1.21.1-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.17.1%2B%20%7C%2020%2B-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

### Versioning

PiCanvas uses the format **2.x.yy.z** where:
- **2** = Major version (this is a v2 upgrade of [Mark Rackley's Hillbilly Tabs](http://www.markrackley.net/2022/06/29/the-return-of-hillbilly-tabs/))
- **x.yy.z** = Aligned with SPFx version (e.g., 2.0.21.1 = SPFx 1.21.1)

This versioning honors the original author while indicating which SharePoint Framework version the solution is built on.

**[Download Latest Release (v2.0.21.1)](https://github.com/anthonyrhopkins/PiCanvas/releases/download/v2.0.21.1/pi-canvas.sppkg)**

![PiCanvas Interface](docs/images/picanvas-hero.png)

## Table of Contents

- [Features](#features) — Tabbed layouts, customization, permissions, templates
- [What's New in v2.x](#whats-new-in-v2x) — Version comparison, new capabilities
- [Installation](#installation) — Deploy to SharePoint, guest user access
- [Development](#development) — Local setup, build commands, project structure
- [Configuration Reference](#configuration-reference) — Property pane groups, CSS variables
- [Troubleshooting](#troubleshooting) — Common issues and solutions

---

### Use Cases

- Combine multiple web parts into one tabbed view
- Replace several pages with a single organized page
- Build team hubs, dashboards, help desks, training portals
- Group entire page sections (multi-column layouts) into tabs
- Add multiple PiCanvas instances to one page for different tabbed areas
- **Show/hide tabs based on user permissions** (Owners, Members, Visitors, custom groups)
- **Export/import configurations** with templates for consistent deployments

### How It Works

1. Add PiCanvas to your page
2. Add your web parts anywhere on the page
3. Open settings, assign web parts to tabs
4. Publish

No Power Platform license required. Works on any modern SharePoint page.

---

## Features

### Tabbed Layouts

Organize multiple web parts into a clean tabbed interface, reducing page clutter and improving navigation.

```
┌─────────────────────────────────────────────────────────┐
│  [Tab 1]  [Tab 2]  [Tab 3]                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Web Part Content (dynamically shown/hidden)           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Full Customization

Control every aspect of your tabs:

| Category | Options |
|----------|---------|
| **Colors** | Accent, text, background, hover, active states |
| **Typography** | Font size (12-20px), weight (400-700) |
| **Spacing** | Vertical/horizontal padding, gap between tabs |
| **Borders** | Corner radius, indicator width/color |
| **Effects** | Shadows (none, subtle, medium, strong), animations |

<details>
<summary>View Settings Panels</summary>

| Colors | Typography | Borders & Effects |
|--------|------------|-------------------|
| ![Colors](docs/images/settings-colors.png) | ![Typography](docs/images/settings-typography.png) | ![Borders](docs/images/settings-borders.png) |

</details>

### Tab Styles

| Style | Description |
|-------|-------------|
| `Default` | Clean underline indicator |
| `Pills` | Rounded pill-shaped buttons |
| `Underline` | Simple bottom border |
| `Boxed` | Bordered container |

### Section Support

Group entire SharePoint sections (including multi-column layouts) into single tabs:

```
┌─────────────────────────────────────┐
│ Select web part or section...    ▼  │
├─────────────────────────────────────┤
│ ── Section 1 ──                     │
│   Sec 1 | Full | Web Part #1        │
│   Sec 1 | Full | Image              │
│ ── Section 2 ──                     │
│   Sec 2 | 2-Col | Left Column       │
│   Sec 2 | 2-Col | Right Column      │
└─────────────────────────────────────┘
```

### Theme Aware

Automatically adapts to SharePoint's light and dark themes:

1. **Manual Override** - User explicitly sets Light/Dark
2. **SharePoint Theme** - Reads `window.__themeState__.theme.isInverted`
3. **Luminance Calculation** - Analyzes section background color
4. **Fallback** - Defaults to light mode

### Permission-Based Tab Visibility

Control which tabs users see based on their SharePoint group membership:

```
┌─────────────────────────────────────────────────────────┐
│ User Opens Page                                         │
├─────────────────────────────────────────────────────────┤
│ 1. Load user's group memberships (cached 5 min)         │
│ 2. For each tab with permissions enabled:               │
│    → Check if user is in ANY specified group (OR logic) │
│    → Show tab if member, hide if not                    │
│ 3. Tabs without permissions → visible to everyone       │
└─────────────────────────────────────────────────────────┘
```

| Group Type | Description |
|------------|-------------|
| **Site Owners** | Users with full control of the site |
| **Site Members** | Users with contribute permissions |
| **Site Visitors** | Users with read-only access |
| **Custom Group IDs** | Any SharePoint group by ID number |

**Quick Presets:**
- Everyone (no restriction) - default
- Site Owners only
- Site Members only
- Site Visitors only
- Owners & Members
- Members & Visitors
- All Site Groups

**How to Configure:**
1. Open the property pane for any tab
2. Enable **"Restrict by Group"** toggle
3. Select groups from the **"Visible to Groups"** dropdown
4. Optionally add custom group IDs (comma-separated)
5. Choose visibility behavior:
   - **Hide completely** (default) - Tab doesn't appear at all
   - **Show Placeholder** - Tab visible but disabled with custom message
6. Save changes - permissions apply immediately

![Permission Settings](docs/images/settings-permissions.png)

**Visibility Options:**

| Option | Behavior |
|--------|----------|
| **Hide completely** | Tab is invisible to unauthorized users |
| **Show Placeholder** | Tab appears grayed out with lock icon and custom message |

**How Permission Filtering Works:**

```
┌─────────────────────────────────────────────────────────┐
│ Page Load Sequence                                       │
├─────────────────────────────────────────────────────────┤
│ 1. Web part initializes                                  │
│ 2. WAIT: Fetch user's group memberships from SharePoint │
│ 3. WAIT: Fetch site's associated groups (Owner/Member/  │
│          Visitor group IDs)                              │
│ 4. THEN: Render tabs with correct visibility             │
│ 5. Cache results for 5 minutes                          │
└─────────────────────────────────────────────────────────┘
```

> **Important:** The web part waits for permission data before rendering. This ensures tabs are filtered correctly on the first render. There may be a brief delay while SharePoint APIs respond.

**Enterprise Features:**
- **Synchronous permission check** - Waits for permission data before rendering (no flicker)
- **5-minute cache** - Group data cached to minimize API calls on subsequent views
- **Graceful fail-open** - If API fails, all tabs remain visible (users are never locked out)
- **Template support** - Permission settings export/import with templates
- **Placeholder option** - Show disabled tab instead of hiding (configurable per tab)
- **OR logic** - User in ANY specified group can see the tab

### Template System

Export and import PiCanvas configurations for consistent deployments across sites:

![Template Settings](docs/images/settings-templates.png)

**Built-in Templates:**

| Template | Tabs | Style | Description |
|----------|------|-------|-------------|
| Classic | 3 | Default | Simple horizontal tabs with clean labels |
| Dashboard | 4 | Underline | Metrics-focused with icon labels |
| Navigation Dock | 5 | Pills | Vertical left sidebar navigation |
| Portal Hub | 4 | Boxed | Department hub with category tabs |
| Minimal | 3 | Underline | Light, minimal design |
| Dark Mode | 3 | Pills | Pre-configured dark theme |

**Template Features:**
- **Export to JSON** - Download complete configuration as JSON file
- **Import from JSON** - Load configuration from JSON file
- **Save to Site Assets** - Store templates in SharePoint for team sharing
- **Includes all settings** - Tab labels, icons, images, permissions, styling, colors
- **Content mapping preserved** - Web part assignments stay with templates

---

## What's New in v2.x

PiCanvas is a complete modernization of [Mark Rackley's Modern Hillbilly Tabs](http://www.markrackley.net/2022/06/29/the-return-of-hillbilly-tabs/). The original was built on SPFx 1.13.1 (2021). As SharePoint Framework evolved through 8+ major versions, the codebase needed a full rebuild to leverage modern tooling and capabilities while honoring the original concept.

### Version Comparison

| Aspect | Original (Hillbilly Tabs) | PiCanvas 2.x |
|--------|--------------------------|--------------|
| SPFx Version | 1.13.1 (2021) | 1.21.1 (2025) |
| Node.js | 14.x / 16.x | 18.x / 20.x / 22.x |
| TypeScript | 3.9 | 5.3 |
| Linting | TSLint (deprecated) | ESLint |
| Build Speed | Standard gulp | fast-serve (hot reload) |
| Theme Support | None | Auto light/dark detection |
| Tab Styles | 1 (default only) | 4 (default, pills, underline, boxed) |
| Tab Alignment | None | 4 (left, center, right, stretch) |
| Tab Orientation | Horizontal only | Horizontal & Vertical |
| Section Grouping | None | Full section support |
| Customization | None | Colors, typography, spacing, shadows |
| Tab Count | Fixed | 1-20 tabs with add/remove buttons |
| Edit Mode UI | Basic text | Rich feature cards with documentation |
| **Permissions** | None | Group-based tab visibility (Owners/Members/Visitors/Custom) |
| **Templates** | None | Export/import, built-in templates, Site Assets storage |

### Web Part as Label

One of the most powerful new features - use any SharePoint web part as your tab label:

```
┌───────────────────────────────────────────────────────────┐
│ [🏠 Image]  [📊 Chart]  [Logo.png]  [Custom Text]         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│   Tab content appears here                                │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

- **Use Image web parts** as tab headers (logos, icons, photos)
- **Use Text web parts** for rich formatted labels
- **Reuse the same web part** as both label AND content (auto-clones)
- **Configurable label height** - 40px to 120px, or "No limit" for full-size images
- All SharePoint chrome is automatically stripped for clean tab headers

### Tab Dividers

Create visual groupings between tabs with gradient dividers:

```
Horizontal:                         Vertical:
┌────────┬────────│────────┐       ┌──────────┐
│ Tab 1  │ Tab 2  │ Tab 3  │       │  Tab 1   │
└────────┴────────│────────┘       │  Tab 2   │
         divider ─┘                ├──────────┤ ← divider
                                   │  Tab 3   │
                                   └──────────┘
```

- Toggle "Add divider after this tab" for any tab
- Beautiful gradient lines that fade at edges
- Works in both horizontal and vertical orientations
- Use accent color automatically

### Smart Dropdown Labels

The property pane dropdowns show intelligent labels to help you identify web parts:

```
┌─────────────────────────────────────────────────────────────┐
│ Select web part or section...                            ▼  │
├─────────────────────────────────────────────────────────────┤
│ >> Section 1 (3 web parts)                                  │
│ >> Section 2 (2 web parts)                                  │
│ ─────────────────────────────────────────────────────────── │
│     Sec 1 | Left | Image: logo.png                          │
│     Sec 1 | Right | Text: "Welcome to our..."               │
│     Sec 2 | Full | Hero                                     │
│     Sec 2 | Full | Quick Links ⚠️ IN USE → Tab 2            │
└─────────────────────────────────────────────────────────────┘
```

- Shows **section number**, **column position** (Left/Right/Center/Full)
- Identifies **web part type** (Image, Text, Hero, Quick Links, etc.)
- Shows **content preview** (image filename, text snippet)
- Marks items **already assigned** to other tabs with warnings

### Vertical Tab Layout

Tabs can now appear on the left or right side of content:

```
Left Position:                      Right Position:
┌──────────┬────────────────────┐  ┌────────────────────┬──────────┐
│ [Tab 1]  │                    │  │                    │ [Tab 1]  │
│ [Tab 2]  │   Content Area     │  │   Content Area     │ [Tab 2]  │
│ ──────── │                    │  │                    │ ──────── │
│ [Tab 3]  │                    │  │                    │ [Tab 3]  │
└──────────┴────────────────────┘  └────────────────────┴──────────┘
```

- **Left or Right** positioning option
- **Configurable width** - 150px to 300px, or 25%/33% of container
- **Responsive** - automatically stacks horizontally on mobile (<768px)
- All 4 tab styles work in vertical mode

### Highlight on Selection

When selecting web parts in the property pane, they're highlighted on the page:

- **Animated pulse** with blue glow effect
- **Dashed border** animation
- **Auto-scroll** to bring selected element into view
- Different highlight style for sections vs individual web parts

### New Features Summary

| Feature | Description |
|---------|-------------|
| **Web Part as Label** | Use Image, Text, or any web part as tab header |
| **Reuse Web Parts** | Same web part for label AND content (auto-clones) |
| **Tab Dividers** | Gradient separators between tabs |
| **Vertical Tabs** | Left/right side with responsive stacking |
| **Icon Picker** | 30+ emoji icons (🏠 📅 📄 📊 ⚙️ etc.) |
| **Image Labels** | 4 positions: left, right, top, background |
| **Smart Dropdowns** | Section/column/type/preview in labels |
| **In-Use Warnings** | Shows which items are already assigned |
| **Highlight Selection** | Animated visual feedback in edit mode |
| **Tab Reordering** | Move tabs up/down with buttons |
| **Shadow Presets** | None, subtle, medium, strong, colored glows |
| **Configurable Label Size** | 40px-120px or unlimited |
| **Theme Auto-Detection** | 3-tier detection with manual override |
| **Section Support** | Group multi-column sections into single tabs |
| **Column Preservation** | Maintains 2-col, 3-col, asymmetric layouts |
| **Responsive Design** | Vertical tabs stack on mobile |
| **Troubleshooting Tools** | Multiple selectors, reset buttons |
| **Rich Edit Mode** | Feature cards with interactive documentation |
| **Permission-Based Visibility** | Hide tabs by SharePoint group membership |
| **Template System** | Export/import configurations, built-in templates |
| **Site Assets Storage** | Save custom templates for team sharing |

### Full Customization Options

Every visual aspect of tabs is customizable through the property pane:

| Category | Properties | Options |
|----------|------------|---------|
| **Colors** | Accent Color | SharePoint Blue, Green, Purple, Orange, Red, Teal, Yellow, Black, Gray |
| | Tab Text Color | Dark Gray, Near Black, Black, White, or theme colors |
| | Active Text Color | Separate color for selected tab |
| | Background Color | Transparent or any color |
| | Active Background | Highlight color for selected tab |
| | Hover Background | Color on mouse hover |
| **Typography** | Font Size | 12px - 20px (Small to Extra Large) |
| | Font Weight | 400 (Normal) - 700 (Bold) |
| **Spacing** | Vertical Padding | 8px - 24px |
| | Horizontal Padding | 8px - 24px |
| | Tab Gap | 0px - 16px between tabs |
| | Content Gap | Space between tabs and content |
| **Borders** | Border Radius | 0px (Square) - 16px (Pill-like) |
| | Indicator Width | 2px - 6px for active tab indicator |
| | Indicator Color | Custom or use accent color |
| **Effects** | Shadow | None, Subtle, Medium, Strong |
| | Colored Glows | Blue Glow, Green Glow, Purple Glow |
| | Transitions | Enable/disable smooth animations |
| **Indicators** | Active Indicator | Show/hide bottom/side indicator |
| | Tab Separators | Show/hide lines between tabs |
| | Separator Color | Custom separator line color |
| **Per-Tab** | Image URL | Add image to individual tab |
| | Image Position | Left, Right, Top, or Background |
| | Divider After | Add separator line after specific tab |

### CSS Custom Properties

All styling uses CSS custom properties for easy theming and overrides:

```css
.addui-Tabs {
  /* Colors */
  --pi-tab-accent: #0078d4;
  --pi-tab-text: rgba(0, 0, 0, 0.7);
  --pi-tab-text-active: var(--pi-tab-accent);
  --pi-tab-bg: transparent;
  --pi-tab-bg-active: transparent;
  --pi-tab-bg-hover: rgba(0, 0, 0, 0.04);

  /* Typography */
  --pi-tab-font-size: 14px;
  --pi-tab-font-weight: 500;

  /* Spacing */
  --pi-tab-padding-v: 12px;
  --pi-tab-padding-h: 20px;
  --pi-tab-gap: 0px;
  --pi-tab-content-gap: 0px;

  /* Borders & Effects */
  --pi-tab-radius: 0px;
  --pi-tab-indicator-width: 3px;
  --pi-tab-indicator-color: var(--pi-tab-accent);
  --pi-tab-separator-color: rgba(0, 0, 0, 0.12);
  --pi-tab-shadow: none;
  --pi-tab-transition: all 0.2s ease;

  /* Label Images */
  --pi-label-image-height: 60px;

  /* Vertical Layout */
  --pi-vertical-tab-width: 200px;
}
```

### For Developers

| Improvement | Details |
|-------------|---------|
| **CSS Custom Properties** | 25+ `--pi-*` variables for complete theming |
| **fast-serve** | Hot module replacement, ~2 second rebuilds |
| **ESLint** | Modern linting with security rules (TSLint deprecated) |
| **TypeScript 5.3** | Latest features with strict null checks enabled |
| **Web Part Detection** | Uses aria-labels, automation IDs, DOM analysis |
| **Column Preservation** | CSS media queries maintain SharePoint grids |
| **Responsive Breakpoints** | 640px (columns), 768px (vertical tabs) |
| **Animation System** | CSS keyframes for pulse/dash effects |
| **PnP Telemetry** | Opt-out by default for privacy |
| **XSS Prevention** | HTML encoding and URL sanitization for all user inputs |
| **Security Linting** | 14 ESLint rules blocking eval, script URLs, prototype pollution |

---

## Installation

### Prerequisites

- SharePoint Online or SharePoint 2019+
- Site Collection App Catalog or Tenant App Catalog
- Site Collection Administrator permissions

### Deploy to SharePoint

1. **[Download pi-canvas.sppkg](https://github.com/anthonyrhopkins/PiCanvas/releases/download/v2.0.21.1/pi-canvas.sppkg)** from GitHub Releases
2. Upload to your **App Catalog** > **Apps for SharePoint**
3. Click **Deploy** when prompted
4. Add the app to your site from **Site Contents > New > App**

### Guest User Access

> **Important:** If you have **guest users** (external users) who need to use PiCanvas, you must deploy to a **Site Collection App Catalog** instead of the Tenant App Catalog.

| Deployment Location | Internal Users | Guest Users |
|---------------------|----------------|-------------|
| **Tenant App Catalog** | ✅ Works | ❌ `[object Object]` error |
| **Site Collection App Catalog** | ✅ Works | ✅ Works |

**Why?** Guest users cannot access tenant-level CDN resources where SPFx assets are hosted. Deploying to a site collection app catalog serves assets from the site's context, which guests can access.

**To enable Site Collection App Catalog:**

> **Note:** Only **tenant administrators** can create site collection app catalogs. This cannot be done by site collection admins and must be done via PowerShell.
>
> **Required permissions:** The tenant admin must be a **Site Collection Administrator** on both:
> - The **Tenant App Catalog** site
> - The **target site** where you're provisioning the app catalog
>
> These permissions can be temporary—remove Site Collection Admin access after provisioning if not needed (recommended for security).

```powershell
# SharePoint Online Management Shell
Connect-SPOService -Url https://contoso-admin.sharepoint.com
Add-SPOSiteCollectionAppCatalog -Site https://contoso.sharepoint.com/sites/yoursite

# Or using PnP PowerShell
Connect-PnPOnline -Url https://contoso-admin.sharepoint.com -Interactive
Add-PnPSiteCollectionAppCatalog -Site https://contoso.sharepoint.com/sites/yoursite

# Or using CLI for Microsoft 365
m365 login
m365 spo site appcatalog add --siteUrl https://contoso.sharepoint.com/sites/yoursite
```

Once provisioned, upload the `.sppkg` to the site's **Apps for SharePoint** library.

### Add to a Page

1. Edit your SharePoint page
2. Add web parts you want to organize
3. Add the **PiCanvas** web part
4. Open the property pane (edit icon)
5. Click **Add Tab** for each tab you want
6. Select target web parts from dropdowns
7. Customize labels, icons, and styling
8. Publish the page

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18.17.1+ or v20+
- [Gulp CLI](https://gulpjs.com/) - either:
  - Use `npx gulp` (no install needed), or
  - Install globally: `npm install -g gulp-cli`

### Getting Started

```bash
# Clone the repository
git clone https://github.com/anthonyrhopkins/PiCanvas.git
cd PiCanvas

# Install dependencies
npm install

# Configure your local workbench
# Edit config/serve.json and set your SharePoint site URL:
# "initialPage": "https://your-tenant.sharepoint.com/_layouts/15/workbench.aspx"

# Start development server (fast-serve - recommended)
npm run serve

# Or use standard gulp serve
npx gulp serve
```

> **Note:** The `config/serve.json` file contains the workbench URL for local development. Update this to your own SharePoint tenant before running `npm run serve`.

### Build for Production

```bash
# Bundle for production
npx gulp bundle --ship

# Create SharePoint package
npx gulp package-solution --ship

# Or as a one-liner
npm install && npx gulp bundle --ship && npx gulp package-solution --ship
```

The `.sppkg` file will be in `sharepoint/solution/`.

> **Note:** If you installed gulp globally, you can use `gulp` instead of `npx gulp`.

### Project Structure

```
PiCanvas/
├── src/
│   └── webparts/
│       └── piCanvas/
│           ├── PiCanvasWebPart.ts           # Main web part logic
│           ├── PiCanvasWebPart.module.scss  # Theme styles
│           ├── AddTabs.js                   # Tab UI plugin
│           ├── AddTabs.css                  # Tab styling
│           └── loc/                         # Localization
├── config/
│   ├── config.json                          # External dependencies
│   ├── package-solution.json                # Solution packaging
│   └── serve.json                           # Dev server config
├── fast-serve/                              # Fast development server
└── package.json
```

---

## Configuration Reference

### Property Pane Groups

| Group | Options |
|-------|---------|
| **Manage Tab Labels** | Add/remove tabs, select web parts, set labels, icons, images |
| **Appearance** | Style, alignment, orientation, image size, theme |
| **Colors** | Accent, text, backgrounds, hover states |
| **Typography & Spacing** | Font size/weight, padding, gaps |
| **Borders & Effects** | Radius, indicators, separators, shadows, animations |
| **Troubleshooting** | Section/web part selectors, reset buttons |

### Color Presets

- SharePoint Blue (default)
- Green, Purple, Orange, Red, Teal, Black
- Custom hex input

### Shadow Presets

- None (default)
- Subtle: `0 1px 2px rgba(0,0,0,0.1)`
- Medium: `0 2px 4px rgba(0,0,0,0.15)`
- Strong: `0 4px 8px rgba(0,0,0,0.2)`

---

## Troubleshooting

![Troubleshooting Settings](docs/images/settings-troubleshooting.png)

### Web parts not detected

1. Open property pane > **Troubleshooting** section
2. Try different **Section Selector** options
3. Try different **Web Part Selector** options
4. Click **Reset to Defaults** if needed

### Tabs not clicking (with Image labels)

This is fixed in v2.1.0. The `AddTabs.js` now handles nested clickable elements properly with `preventDefault()` and `stopPropagation()`.

---

## Credits

Based on [Modern Hillbilly Tabs](http://www.markrackley.net/2022/06/29/the-return-of-hillbilly-tabs/) by [Mark Rackley](http://www.markrackley.net/). Modernized and expanded by [@anthonyrhopkins](https://github.com/anthonyrhopkins).

## License

MIT - See [LICENSE](LICENSE) for details.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/js-pi-canvas" />

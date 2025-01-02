# Modern React Teams Tabs

## Summary

This sample is **derived** from the original [react-teams-tabs-graph](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-teams-tabs-graph) project but is **updated** to:

- **SPFx 1.20+** (compatible with Node 14/16)
- **React 17**
- **Node V18**

It displays **Channels** and **Tabs** from Microsoft Teams linked to a **Modern Team Site**. For each channel, it lists the associated tabs (like Planner, OneNote, etc.) with quick links.
Also added features: 
- **Search for channel**
- **Improved error handling**
- **Modernized and futureproofed code**


## Preview

![WebPartInAction](./assets/modern-react-teams-tabs.png)

*(Replace the above image path with your own screenshot.)*

---

## Features

- **Graph HTTP** to call Microsoft Graph endpoints for:
  - **Fetching Team channels** tied to the current site’s GroupId
  - **Listing channel tabs** with `displayName` and `webUrl`
- **React 17** for a modern UI experience
- **Fluent UI (Office UI Fabric)** Nav or list components to display channels/tabs
- **SPFx 1.20** – align with the latest versions

---

## Prerequisites

1. **Node.js** v18 (check the [SPFx Compatibility Matrix](https://aka.ms/spfx-matrix))
2. A **Modern Team Site** that’s connected to Microsoft Teams
3. **API Permissions** approved for Microsoft Graph calls (e.g., `Group.Read.All` or `Group.ReadWrite.All` depending on your usage)

---

## Getting Started

1. **Clone** or **download** this repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build & Bundle**:
   ```bash
   gulp build --ship
   gulp bundle --ship
   ```
4. **Package**:
   ```bash
   gulp package-solution --ship
   ```
5. **Deploy** the `.sppkg` found in `./sharepoint/solution` to your **App Catalog**.
6. **Approve permission requests** in the **SharePoint Admin Center** → **API Access** (if you see any).
7. **Add** the app to your site, then **add** the web part to a modern SharePoint page.

---

## Configuration

In the **`package-solution.json`**, you may see `webApiPermissionRequests` for Microsoft Graph, such as:

```json
"webApiPermissionRequests": [
  {
    "resource": "Microsoft Graph",
    "scope": "Group.Read.All"
  }
]
```

If you need read/write access for creating channels or tabs, you might request higher-level permissions, like `Group.ReadWrite.All` or `TeamsTab.ReadWriteForTeam`. After deployment, these permissions must be **approved** in the **API Access** page.

---

## Known Issues

- **Local Workbench**: Not supported for Graph calls. Use the Hosted Workbench or add to a modern SharePoint page.
- **On-Prem**: This sample is designed for SharePoint Online. On-premises SharePoint typically does not support the required modern endpoints or Graph calls in the same way.

---

## Version History

| Version | Date        | Comments                                  |
|---------|------------|-------------------------------------------|
| 1.0     | 1 January 2025 | Initial release (SPFx 1.20, React 17)     |

---

## Help & Feedback

If you have questions or run into issues:

- Check the [PnP Community](https://github.com/pnp) repos for existing issues
- Use [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) to diagnose environment mismatches
- File an **issue** in this repo with details and steps to reproduce

---

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/modern-react-teams-tabs" />
```

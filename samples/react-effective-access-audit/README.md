# Effective Access Audit

## Summary

This React SharePoint Framework web part provides a read-only view of direct role assignments on the current SharePoint web. You can optionally set a site-relative root web path and a list title to inspect direct assignments on that list too. The table shows principal title/type, login name or email when SharePoint returns them, role names, and whether the assignment is at a unique or inherited scope.

It uses PnPjs 4 and Fluent UI React 9. It does not add, remove, break, or reset permissions.

## Compatibility

![SPFx 1.23.2](https://img.shields.io/badge/SPFx-1.23.2-green.svg)
![Node.js v22.14.0](https://img.shields.io/badge/Node.js-v22.14.0-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

Use Node.js `>=22.14.0 <23.0.0`. See the [SPFx compatibility matrix](https://aka.ms/spfx-matrix) before using another version. Current SPFx versions require the hosted SharePoint workbench; the local workbench is not supported.

## Configuration

In the property pane:

- Leave `Root web path` blank to inspect the web hosting the web part, or enter a site-relative path such as `/sites/Operations`.
- Optionally enter a list title such as `Project Documents` to include that list's direct role assignments.

Paths are bounded and must not contain absolute URLs, queries, fragments, backslashes, or `.`/`..` traversal segments. List titles are bounded and reject control characters.

## Permissions and consent caveat

The sample uses the current signed-in user's SharePoint context and the normal SharePoint permission checks. The user must be allowed to read the selected web/list and its role assignments. Deploying an SPFx package does not grant additional SharePoint permissions or bypass access checks; tenant or site administrator consent may be required by the tenant's app catalog and deployment policies. This sample requests no Microsoft Graph permissions and performs no permission writes.

## What this audit means

The result is a bounded view of direct role assignments returned by SharePoint for the selected web and optional list. It is not a complete effective-access calculator: nested Microsoft Entra/security groups, SharePoint group membership, sharing links, item/folder permissions, and a particular user's transitive access are not expanded or resolved. `Inherited` indicates the selected resource reports inherited permissions; it does not expand the parent's complete assignment graph.

The request and display are capped at 100 role assignments. SharePoint may still apply its own paging and permission rules.

## Local verification

```bash
npm install
npm test
npm run build
npm run package
```

To run the hosted workbench development server:

```bash
npm start
```

Open the URL shown by Heft and sign in to a SharePoint tenant where the configured web/list can be read.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-effective-access-audit" />

# Quick Links Hierarchy

## Summary

A modern **SharePoint Framework (SPFx)** web part that provides a **hierarchical quick links management system** with **collapsible tree navigation**, **inline operations**, and a **comprehensive configuration panel**. This solution enables content authors to organize and manage navigational links in a parent-child hierarchy directly from SharePoint pages, without needing to access list settings or traditional views.

![React UI Editor Demo](./assets/quick-links-hierarchy-demo.gif)

## Used SharePoint Framework Version

![SPFx 1.21.1](https://img.shields.io/badge/SPFx-1.21.1-green.svg)
![Node.js v18.17.1](https://img.shields.io/badge/Node.js-v18.17.1-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://aka.ms/spfx)
* [Microsoft 365 Tenant](https://docs.microsoft.com//sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 Developer Program](http://aka.ms/o365devprogram)

## Prerequisites

* SharePoint Online environment
* A SharePoint list with the following columns:

| Column Name  | Type                | Required | Description                                    |
| ------------ | ------------------- | -------- | ---------------------------------------------- |
| Title        | Single line of text | ✔        | Link or header title                           |
| LinkUrl      | Hyperlink           | ✖        | URL for the link (not required for headers)    |
| IconName     | Single line of text | ✖        | Fluent UI icon name (default: 'Link')          |
| SortOrder    | Number              | ✖        | Determines display order within parent         |
| OpenIn       | Choice              | ✖        | Options: 'Same Window', 'New Tab' (default)    |
| IsActive     | Yes/No              | ✖        | Controls visibility in display mode            |
| IsHeader     | Yes/No              | ✖        | Marks item as header/folder (no URL)           |
| ParentLinkId | Lookup              | ✖        | Reference to parent item (creates hierarchy)   |

## Contributors

* [Sai Siva Ram Bandaru](https://github.com/saiiiiiii)

## Version History

| Version | Date              | Comments        |
| ------- | ----------------- | --------------- |
| 1.0     | November 07, 2025 | Initial release |

## Minimal Path to Awesome

* Clone this repository
* Ensure that you are at the solution folder
* In the command-line run:
  * `npm install`
  * `gulp serve`

### Create the SharePoint List

Before using the web part, create a SharePoint list with the required structure.

## Features

### Core Features

* **Hierarchical Navigation** — Organize links in unlimited parent-child relationships
* **Collapsible Tree View** — Expand/collapse sections for better organization
* **Inline Configuration Panel** — Manage all links directly from the page in edit mode
* **Visual Tree Editor** — Intuitive tree interface in configuration panel
* **Headers/Folders** — Create non-clickable parent categories
* **Active/Inactive Toggle** — Control link visibility without deletion
* **Custom Icons** — Support for Fluent UI icon library
* **Multiple List Support** — Configure different lists for different pages
* **Lock/Unlock List Selection** — Prevent accidental list changes
* **Real-time Updates** — Changes reflect immediately in the web part
* **Responsive Design** — Works seamlessly on desktop and mobile devices

### Technical Highlights

* **React Hooks** — Modern state management with `useState`, `useEffect`, and `useMemo`
* **PnP JS v4** — Efficient SharePoint REST API interactions
* **Fluent UI React v8** — Microsoft 365 consistent design system
* **TypeScript** — Full type safety and IntelliSense support
* **SCSS Modules** — Scoped styling with CSS modules
* **Tree Data Structure** — Efficient hierarchical data rendering
* **Lookup Field Support** — Self-referencing lookup for parent-child relationships

### User Interface

#### Display Mode (End User View)

The web part displays links in a clean, collapsible hierarchy:

* **Parent items** with children show chevron icons for expand/collapse
* **Header items** (IsHeader = true) appear as folders with no URL
* **Regular links** open in same window or new tab based on configuration
* Only **active items** (IsActive = true) are displayed
* Items are sorted by **SortOrder** field, then alphabetically

#### Edit Mode (Configuration View)

When the page is in edit mode, a gear icon (⚙️) appears to open the configuration panel.

### Configuration Panel Features

#### Toolbar Actions

* **Save Changes** — Commits edits to SharePoint list
* **Apply Configuration** — Closes panel and refreshes web part
* **Refresh** — Reloads tree from SharePoint
* **Cancel** — Closes panel without applying changes
* **List Selection Dropdown** — Choose which list to manage
* **Lock/Unlock Button** — Prevent accidental list changes

#### Tree View (Left Pane)

* **Visual Hierarchy** — Shows parent-child relationships
* **Expand/Collapse** — All items expanded by default
* **Selection** — Click any item to edit in right pane
* **Add Parent** — Create top-level items
* **Add Child** — Create child under selected item
* **Delete** — Remove selected item (orphans children)

#### Item Editor (Right Pane)

Edit form with the following fields:

* **Link Label** — Display title (required)
* **Link URL** — Target URL (disabled for headers)
* **Active** — Visibility toggle
* **Is Header** — Marks as non-clickable parent
* **Open With** — Same Window or New Tab
* **Icon** — Fluent UI icon name
* **Parent Link** — Dropdown to change parent
* **Sort Order** — Numeric ordering within parent
* **Description** — Optional notes field

### Usage

#### Add to a Modern Page

1. Edit your SharePoint modern page
2. Add a new web part
3. Search for **"Quick Links Hierarchy"**
4. Click the web part to add it to the page

#### Initial Configuration

1. Click the **⚙️ gear icon** in edit mode
2. Select a SharePoint list from the dropdown
3. Click **Lock** icon to prevent accidental changes
4. The tree will load automatically

#### Managing Links

##### Add a Parent Item

1. Click **Add Parent** button
2. Fill in the form (required: Link Label)
3. Check **Is Header** if creating a folder
4. Click **Save Changes**

##### Add a Child Item

1. Select a parent item in the tree
2. Click **Add Child** button
3. Fill in the form
4. Click **Save Changes**

##### Edit an Item

1. Click on any item in the tree
2. Modify fields in the right pane
3. Click **Save Changes**

##### Delete an Item

1. Select the item in the tree
2. Click **Delete** button
3. Confirm deletion
4. Note: Children become orphaned (move them first if needed)

##### Reorder Items

1. Edit the **Sort Order** field
2. Lower numbers appear first
3. Items with same sort order are alphabetized

### Publishing

1. Click **Apply Configuration**
2. Save and publish the page
3. End users see only active links

### Customization

#### Icon Names

The web part uses Fluent UI icons. Common icon names:

* `Link` — Default link icon
* `FabricFolder` — Folder/header icon
* `Globe` — Website
* `Document` — Document
* `Mail` — Email
* `Phone` — Phone
* `Settings` — Settings

Full icon list: [Fluent UI Icons](https://developer.microsoft.com/fluentui#/styles/web/icons)

#### Styling

The web part includes custom SCSS modules:

* `QuickLinksHierarchy.module.scss` — Display mode styles
* `ConfigurationPanel.module.scss` — Configuration panel styles

Modify these files to customize appearance.


### Troubleshooting

#### Links Not Appearing

* Ensure **IsActive** is set to **true**
* Check that **ParentLinkId** references a valid parent
* Verify list permissions

#### Tree Not Loading

* Confirm list ID is correct
* Check browser console for errors
* Verify all required columns exist

#### Configuration Panel Won't Open

* Ensure page is in **Edit Mode**
* Check if web part has edit permissions
* Refresh the page

### Known Limitations

* Maximum recommended items: 5000 (SharePoint list view threshold)
* Self-referencing lookups must be managed carefully
* Deleting parents orphans children (doesn't cascade delete)
* No drag-and-drop reordering (use Sort Order field)


## References

* [Getting started with SharePoint Framework](https://docs.microsoft.com//sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Building for Microsoft Teams](https://docs.microsoft.com//sharepoint/dev/spfx/build-for-teams-overview)
* [Use Microsoft Graph in your solution](https://docs.microsoft.com//sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
* [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com//sharepoint/dev/spfx/publish-to-marketplace-overview)
* [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
* [PnP JS Documentation](https://pnp.github.io/pnpjs/)
* [Fluent UI React](https://developer.microsoft.com//fluentui#/controls/web)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20quick-links-hierarchy%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=quick-links-hierarchy) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20quick-links-hierarchy&template=bug-report.yml&sample=quick-links-hierarchy&authors=@saiiiiiii&title=quick-links-hierarchy%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20quick-links-hierarchy&template=question.yml&sample=quick-links-hierarchy&authors=@saiiiiiii&title=quick-links-hierarchy%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20quick-links-hierarchy&template=suggestion.yml&sample=quick-links-hierarchy&authors=@saiiiiiii&title=quick-links-hierarchy%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-quick-links-hierarchy" />

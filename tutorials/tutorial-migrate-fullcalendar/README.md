# Tutorial: Migrate jQuery and FullCalendar solution built using Script Editor Web Part to SharePoint Framework

Sample jQuery FullCalendar solution migrated from a Script Editor Web Part to the SharePoint Framework.

![jQuery FullCalendar solution built using Script Editor Web Part](https://devofficecdn.azureedge.net/sharepointdocumentation/images/fullcalendar-sewp.png)

Sub folders represent the different stages of the migration process. Each folder contains the complete solution that you can run in browser. More information about the solution is available at [https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx).

| Folder | Stage | More information
| ------------- | ------------- | ------------- |
| 01-migrated-sewp-to-spfx | Original solution migrated to SPFx. As much as possible of the original code left unaltered | [details](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx)
| 02-added-configuration | Extended the code with support for configuring the web part through the property pane | [details](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#add-support-for-configuring-the-web-part-through-web-part-properties)
| 03-transformed-js-to-typescript | Transformed plain JavaScript to TypeScript | [details](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#transform-the-plain-javascript-code-to-typescript)
| 04-replaced-jquery-ajax-with-spfx | Replaced jQuery AJAX with the SharePoint Framework SPHttpClient

## Used SharePoint Framework Version

![v1.10.0](https://img.shields.io/badge/SPFx-v1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

| Solution  | Author(s) |
| ------------- | ------------- |
| tutorial-migrate-fullcalendar  | Waldek Mastykarz (MVP, [Rencore](https://rencore.com), @waldekm) & Andrew Connell (MVP, [Voitanos](//github.com/voitanos), [@andrewconnell](//github.com/andrewconnell))

## Version history

| Version |     Date      |               Comments               |
| ------- | ------------- | ------------------------------------ |
| 1.0.0   | June, 27 2017 | Initial commit                       |
| 1.1.0   | June 30, 2017 | Updated tutorial code for SPFx v1.10 |

## Disclaimer

**THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

----------

## Build and run the tutorials

To build and run this client-side project, you will need to clone and build the tutorials project. Because the solution retrieves its data from SharePoint, you will also need a Task list named **Tasks** with some data in it. To preview the web part use the hosted version of the SharePoint Workbench loaded in the context of the site where the Tasks list is located.

Clone this repo by executing the following command in your console:

```console
git clone https://github.com/SharePoint/sp-dev-fx-webparts.git
```

Navigate to the cloned repo folder which should be the same as the repo name:

```console
cd sp-dev-fx-webparts
```

Navigate to the `tutorials` folder:

```console
cd tutorials
```

Navigate to the `specific web part` folder:

```console
cd 'subfolder'
```

Now run the following command to install the npm packages:

```console
npm install
```

This will install the required npm packages and dependencies to build and run the SharePoint Framework project.

Once the npm packages are installed, run the command to preview your web parts in SharePoint Workbench:

```console
gulp serve --nobrowser
```

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/tutorial-migrate-fullcalendar" />
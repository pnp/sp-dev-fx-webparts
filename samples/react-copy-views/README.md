http://aka.ms/m365devprogramhttp://aka.ms/m365devprogramhttp://aka.ms/m365devprogramhttp://aka.ms/m365devprogram# Copy Views

## Summary

This solution enables a user to copy views from one list/library to another across site collections. It can be used as a webpart on a page, or as a ListView Command Set extension. The user can select multiple views to copy to multiple target lists.

![Copy Views extension](./assets/copy-views-screenshot.png)

![Copy Views](./assets/copy-views.gif)

## Used Versions

![SPFx 1.15.2](https://img.shields.io/badge/SPFx-1.15.2-green.svg)
![pnpjs](https://img.shields.io/badge/pnpjs-3.6-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Unknown-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Unknown-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| Copy Views | [Martin Lingstuyl](https://github.com/martinlingstuyl) ([@martinlingstuyl](https://twitter.com/martinlingstuyl)), I4-YOU Business Solutions b.v. |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | August 29, 2022 | Initial release |

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

- Views can be copied from one list or library to other lists or libraries across site collections.
- List views can only be copied to other *lists* and library views can only be copied to other *libraries*.
- When opening the component using the List view Command Set extension, the current site, list and view will be preselected. When opening the component from a webpart, the current site will be preselected. 
- When copying views, the following things will be included:
  - Field references. 
  - Sort and filter settings. 
  - Column formatting and view formatting.
- Fields that are not available on the target list are excluded from the copied view. The view query is cleaned of these fields so as not to break the view when columns are used to filter on. *
- Views of type 'Kanban board' and 'modern calendar' are currently **not** supported.
- Views that are set to default on the source list will not automatically be set to default on the target list. The checkbox 'Set as default' will need to be used. 

> *The component uses the DOM parser to parse the ViewQuery XML, and removes any filter conditions that reference fields that are not available on the target list. The component can even clean filter queries with multiple And/Or CAML-conditions.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-copy-views%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-copy-views) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-copy-views&template=bug-report.yml&sample=react-copy-views&authors=@martinlingstuyl&title=react-copy-views%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-copy-views&template=question.yml&sample=react-copy-views&authors=@martinlingstuyl&title=react-copy-views%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-copy-views&template=suggestion.yml&sample=react-copy-views&authors=@martinlingstuyl&title=react-copy-views%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-copy-views" />
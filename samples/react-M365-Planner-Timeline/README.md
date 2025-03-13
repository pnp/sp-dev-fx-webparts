# M365 Planner Timeline Web Part

## Summary

The purpose of this web part sample is to render M365 Group Plan tasks in a timeline ordered by the task due date with tags for years and months in a vertical stack. There are filter options to filter out completed tasks and tender tasks by a plan bucket. A task's detail can be viewed by clicking the (i) icon below the "Due Date" popping up a callout dialog with task details. It Should be noted that a M365 Group Planner can have 0 to 200 plans assigned to M365 Group. The web part needs to be configured in the web part's property pane you must select the plan to be rendered, along with options for the plan bucket and completed task filter. These setting will be used when the web part renders on the page. The configuration of multiple web parts on hte page for different plans and buckets is supported.

Single sign-on authentication is used to access M365 Groups Planner data in Microsoft Graph. 
</br><mark>To complete the approval of Microsoft Graph permission, the SharePoint Admin will need to Accept the permission request.</mark>

- This sample web part was generated Microsoft SharePoint Framework.
- React Hooks is used for the web part rendering.

<img src="images/Planner-Timeline-Web-Part.gif" />

Web part is developed using below technologies 
* React Framework
* Office UI Fabric

## Compatibility

|:warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-green.svg)
![Node.js v18.20.3](https://img.shields.io/badge/Node.js-v18.20.3-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Contributors

* [Bill Brockbank](https://github.com/billbrockbank)

## Prerequisites

- Office 365 subscription with SharePoint Online.
- SharePoint Framework [development environment](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.
- Member of M365 User Group with a Plan in Planner

## Version history

Version|Date|Author|Comments
-------|----|----|--------
1.0|March 13, 2025|Bill Brockbank|Initial release

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`
* Make sure you have completed the [pre-requisites](#Pre-requisites)
* Add the web part to the workbench page of a site

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* Get M365 Planner, Plans, Buckets, and Tasks using Microsoft Graph API.
* React Hooks
* Using async / await for the async calls
* Caching the data in session storage
* Usage of PnP SPFx controls (Placeholder)
* Custom property pane control to select a plan and bucket.
* Office UI fabric components
* Filter task by active or all tasks (includes completed).
* Filter task by plan bucket.
* Tasks status rendered in colors:

    Color | Status | Criteria 
    ----------|------------|--------------------------------
    **Red** | Overdue | Passed Due Date
    **Green** | Complete | Progress set to "Completed"
    **Blue** | In progress| Progress set to "In Progress"
    **Black** | Not Due | Progress set to "Not Started"

* Refresh Planner Tasks then re-rending with the selected filter settings.
* By clicking on the (i) the task details are rendered.

### **Task details popup**
<img src="images/Task-Callout.gif" />

### **Plan Bucket Filter**
<img src="images/Plan-Bucket-Filter.gif" />

### **Web Part Properties Settings**
<img src="images/WebPart-Properties-Settings.gif" />

## Limitations

M365 Planner timeline web part require a M365 User Group. This is because a plan needs to be added to the M365 User Group of the site, a plan is required configure web part.

|Note:|
--
A M365 User Group can support up to 200 Plans added to it. You will need to add a Plan to the M365 User Group via the [Planner](https://planner.cloud.microsoft/webui) with "New plan" in the lower Left corner.


### **You will see for sites without a M365 User Group**
<img src="images/Not-Supported.gif" />

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-cascading-managed-metadata&template=bug-report.yml&sample=react-graph-cascading-managed-metadata&authors=@anoopt&title=react-graph-cascading-managed-metadata%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-cascading-managed-metadata&template=question.yml&sample=react-graph-cascading-managed-metadata&authors=@anoopt&title=react-graph-cascading-managed-metadata%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-cascading-managed-metadata&template=question.yml&sample=react-graph-cascading-managed-metadata&authors=@anoopt&title=react-graph-cascading-managed-metadata%20-%20).

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft Graph TypeScript Types](https://github.com/microsoftgraph/msgraph-typescript-typings/blob/main/README.md)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-M365-Planner-Timeline" />
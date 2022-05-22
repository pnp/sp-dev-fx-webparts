# SharePoint Framework todo web part built with Angular

## Summary

Sample SharePoint Framework client-side web part for managing tasks stored in a SharePoint list, built using Angular.

![Angular todo application as a SharePoint Framework client-side web part](../assets/angular-todo-spfx-preview.png)


## Compatibility

![SPFx 0.5.1](https://img.shields.io/badge/SPFx-0.5.1-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)



## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-todo-webpart|[Waldek Mastykarz](https://github.com/waldekmastykarz) (MVP, Rencore, @waldekm)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|October 21, 2016|Initial release

## Minimal Path to Awesome

- create **Todo** list
  - in SharePoint site create a new list called `Todo`
  - in the **Todo** list add a new choice column called `Status`
    - as available choices enter (each value in new line): `Not started`, `In progress`, `Completed`
- deploy web part
  - clone this repo
  - in the command line execute:
    - `npm i`
    - `gulp serve --nobrowser`
  - create a copy of the **./temp/workbench.html** file and change its extension to **.aspx**
  - in the **workbench.aspx** file, change the value of the **webAbsoluteUrl** property to the absolute URL of your SharePoint site
  - upload the **workbench.aspx** file to a document library in your site
- in the web browser navigate to the **workbench.aspx** page

## Features

Sample web part in this solution illustrates the following concepts on top of the SharePoint Framework:

- building SharePoint Framework client-side web parts with Angular
- building Angular applications with TypeScript
- communicating with the SharePoint REST API in Angular applications
- passing web part properties values into Angular application


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20angular-migration%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=angular-migration) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20angular-migration&template=bug-report.yml&sample=angular-migration&authors=@waldekmastykarz&title=angular-migration%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20angular-migration&template=question.yml&sample=angular-migration&authors=@waldekmastykarz&title=angular-migration%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20angular-migration&template=suggestion.yml&sample=angular-migration&authors=@waldekmastykarz&title=angular-migration%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-migration)

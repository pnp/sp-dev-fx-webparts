---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  createdDate: 3/1/2017 12:00:00 AM
---
# Modern Calendar

## Summary

This is a modern web part built using the [SharePoint Framework](https://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview) demonstrating how to build a custom web part with a calendar capabilities in it.  

![SS1](./assets/14c4333e-0121-11e7-9bf1-3117651222d3.png)
![SS2](./assets/14c3ec26-0121-11e7-8be8-65fbcca32b62.png)
![SS3](./assets/14b88f34-0121-11e7-8c91-56ecff9343e1.png)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to a calendar list hosted in SharePoint")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
None

## Solution

Solution|Author(s)
--------|---------
js-modern-calendar | [Jeremy Coleman](https://github.com/jcoleman-pcprofessional) (MCP, PC Professional, Inc.)
js-modern-calendar | [Nanddeep Nachan](https://github.com/nanddeepn) ([@NanddeepNachan](twitter.com/NanddeepNachan))
js-modern-calendar | [Ravi Chandra](https://github.com/Ravikadri)
js-modern-calendar | [Peter Paul Kirschner](https://github.com/petkir) ([@petkir_at](https://twitter.com/petkir_at))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|February 11, 2017|Initial release
1.0.0.1|June 05, 2020|Updated the external CDN references to public CDN references
1.0.2.0|February 9, 2021|Upgraded to SPFx 1.11 and fixed issues with missing dependencies
1.0.3.0|October 28, 2021|fixed issues with Timezones. The Browser Timezone Settings are now used

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

- Move to Online Workbench
- Ensure that you have Calendar list in your site
- Set web part properties accordingly
  - Choose site
  - List
  - Start, End, Title and Details fields
  

## Features
Renders a calendar from any list available on the selected site. Site, List, Start, End, Event Title,Event Details and Calendar Theme are user-definable in the web part properties, so that you could technically use a custom list as the source for calendar presentation.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-modern-calendar") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-modern-calendar) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-modern-calendar&template=bug-report.yml&sample=js-modern-calendar&authors=@jcoleman-pcprofessional%20@nanddeepn%20@Ravikadri%20@petkir&title=js-modern-calendar%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-modern-calendar&template=question.yml&sample=js-modern-calendar&authors=@jcoleman-pcprofessional%20@nanddeepn%20@Ravikadri%20@petkir&title=js-modern-calendar%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-modern-calendar&template=question.yml&sample=js-modern-calendar&authors=@jcoleman-pcprofessional%20@nanddeepn%20@Ravikadri%20@petkir&title=js-modern-calendar%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-modern-calendar)

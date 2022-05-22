# Edit Application Customizers

## Summary

This web part will allow users to view/update application customizers properties across any web where the current user has access to. This web part can be helpful when we require to update the properties for application customizer without using any PowerShell script or cli tool.

![Web part in action](assets/react-all-applicationcustomizers.gif?raw=true "web part in action")

## Idea behind this web part

- SPFx Application customizer can be used to add scripts, and add custom html to well known placeholder(header and footer)
- We can use properties to pass data to Application customizers to make solution customizable.
- To update properties of application customizer there is no UI based solution.
- To update the title, details and other information of application customizer we use either PowerShell script or cli tool.
- This web part can be used at a central location where all the users have access and if they require to update title, description and properties.

## Features

- Web part to view/update Application Customizers registered for a selected web
- Provides two different UI Accordion or List based(configurable)
- Provides a dropdown to select the web from where we would require to fetch application customizers
- Allows to update application customizer properties which makes it easy to make re-useable application customizers



## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to list the application customizers on a hosted site collection")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

Solution|Author(s)
--------|---------
react-edit-applicationcustomizers | [Kunj Sangani](https://www.linkedin.com/in/kunj-sangani/) and [Siddharth Vaghasia](https://www.linkedin.com/in/siddharthvaghasia) 

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 16, 2020|Initial release

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


For any issue or help, Buzz us on twitter:([sanganikunj](https://twitter.com/sanganikunj)) or ([siddh_me](https://twitter.com/siddh_me/))

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-edit-applicationcustomizers&template=bug-report.yml&sample=react-edit-applicationcustomizers&authors=@kunj-sangani%20@siddharth-vaghasia&title=react-edit-applicationcustomizers%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-edit-applicationcustomizers&template=question.yml&sample=react-edit-applicationcustomizers&authors=@kunj-sangani%20@siddharth-vaghasia&title=react-edit-applicationcustomizers%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-edit-applicationcustomizers&template=question.yml&sample=react-edit-applicationcustomizers&authors=@kunj-sangani%20@siddharth-vaghasia&title=react-edit-applicationcustomizers%20-%20).



## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-edit-applicationcustomizers" />

# Displaying hierarchical information from SharePoint list

## Summary 

At the time of developing this sample, the Office 365 UI fabric does not have any control for displaying hierarchical information. This web part helps to display the hierarchical information from SharePoint list.

![Web part preview][figure1]

The web part is configured to render the mock data when added to the local SharePoint workbench. 
![Local SharePoint Workbench Run][figure2]

When added to SharePoint site, the source list containing hierarchical information can be configured from web part properties.
The sample also provisions the list called “Hierarchy” which can be used as an example to start using the web part.
![SharePoint Run][figure3]

### SharePoint Asset

A SharePoint list (named Hierarchy) is provisioned to store the hierarchical data. The schema of the list is as below.
![List Schema][figure4]
The Parent column is a lookup on same list’s Title column.

The solution also provisions sample data to the Hierarchy list.
![List Sample Data][figure5]

### NPM Packages Used

Below NPM packages are used to develop this sample.
1.	sp-pnp-js (https://www.npmjs.com/package/sp-pnp-js) 
2.	react-orgchart (https://www.npmjs.com/package/react-orgchart)
3.	array-to-tree (https://www.npmjs.com/package/array-to-tree) 

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to SharePoint content")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-display-hierarchy|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://http://twitter.com/NanddeepNachan) )
&nbsp;|[Ravi Kulkarni](https://www.linkedin.com/in/ravi-kulkarni-a5381723/) (SharePoint Consultant)

## Version history

Version|Date|Comments
-------|----|--------
2.0.0|November 21, 2020|Upgraded to SPFx v1.11.0 (Nanddeep Nachan)
1.0.0|October 15, 2018|Initial release

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repo
- `npm i`
- `gulp bundle --ship`
- `gulp package-solution --ship`
- The package can be found at `\react-display-hierarchy\sharepoint\solution\spfx-react-hierarchy-view.sppkg`
- [Deploy the package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog) to the app catalog.
- [Install the client-side solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#install-the-client-side-solution-on-your-site) to your SharePoint site.
- [Add web part to your SharePoint page](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#add-the-helloworld-web-part-to-modern-page) named "Display Hierarchy".

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample web part shows how data stored in SharePoint list can be transformed to show hierarchical information
- Rendering hierarchical information
- SharePoint assets provisioning
- Creating extensible services
- Using mock data to test the web part locally
- Using @pnp/sp
- Using @react-orgchart
- Using @array-to-tree


[figure1]: ./assets/webpart-preview.png
[figure2]: ./assets/local-sharepoint-workbench-run.png
[figure3]: ./assets/sharepoint-run.gif
[figure4]: ./assets/list-schema.png
[figure5]: ./assets/list-sample-data.png


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-display-hierarchy&template=bug-report.yml&sample=react-display-hierarchy&authors=@nanddeepn%20@ravi16a87&title=react-display-hierarchy%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-display-hierarchy&template=question.yml&sample=react-display-hierarchy&authors=@nanddeepn%20@ravi16a87&title=react-display-hierarchy%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-display-hierarchy&template=question.yml&sample=react-display-hierarchy&authors=@nanddeepn%20@ravi16a87&title=react-display-hierarchy%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-display-hierarchy" />

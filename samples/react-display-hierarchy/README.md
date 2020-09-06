## Web part displaying hierarchical information from SharePoint list

### Summary 
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

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.6-green.svg)

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
1.0.0|October 15, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repo
- `npm i`
- `gulp serve --nobrowser`
- Open workbench on your tenant, ie. https://contoso.sharepoint.com/sites/salestesm/_layouts/15/workbench.aspx
- Search and add web part "Display Hierarchy"

## Features
This sample web part shows how data stored in SharePoint list can be transformed to show hierarchical information
- Rendering hierarchical information
- SharePoint assets provisioning
- Creating extensible services
- Using mock data to test the web part locally
- Using @sp-pnp-js
- Using @react-orgchart
- Using @array-to-tree


[figure1]: ./assets/webpart-preview.png
[figure2]: ./assets/local-sharepoint-workbench-run.png
[figure3]: ./assets/sharepoint-run.gif
[figure4]: ./assets/list-schema.png
[figure5]: ./assets/list-sample-data.png


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-display-hierarchy" />

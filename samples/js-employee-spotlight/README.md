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
  platforms:
  - react
  createdDate: 8/1/2017 12:00:00 AM
---
# Employee Spotlight

## Summary
Simple Web Part that demonstrates the use of SharePoint Framework for show casing Employee Spotlight. The web part pulls data from a configured list and User Profile service.
 The properties pane for this web part has 5 cascading dropdowns. 
 - A drop down list of sites(webs) in the current site collection.
 - A drop down list of list titles in the selected site(web). 
 - 3 drop downs with list of field names from selected list, which includes 
    * Name(Person or Group Column). 
    * Spotlight Description (Multiline - Enriched text Column). 
    * Expiry date for Spotlight event (DateTime Column with Date only option).  
 - The properties pane also has options for following slider effects.
    * Background color - A color picker to choose Slider background color 
    * Font color - A color picker to choose Slider font color
    * Set Auto slide - A switch to enable/disable auto slide for slider  
    * Slider Speed - A Slider control to select slider speed from 0sec - 7sec with 0.5sec as a step.

![Screeshot of the Employee Spotlight web part options](./assets/Employee-spotlight-options.png).
 
 Once the user selects all the configuration details, the web part displays the spotlight details from the configured list.

![Screeshot of the Employee Spotlight web part](./assets/Employee-spotlight-priview.png).

> Data is displayed only when hosted in SharePoint. No mock data included at this point for local testing. 


## Compatibility

![SPFx 1.8.0](https://img.shields.io/badge/SPFx-1.8.0-green.svg)
![Node.js v6 | v5](https://img.shields.io/badge/Node.js-v6%20%7C%20v5-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to SharePoint content")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to
* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Solution

Solution|Author(s)
--------|---------
js-employee-spotlight| SPS (Strategic Products and Services)


## Version history

Version|Date|Comments
-------|----|--------
1.0|June 12, 2017|Initial release

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve`
  - `Open the workbench on your Office 365 Developer tenant`
      - Basic functionality can be tested locally, data is only shown when used in context of SharePoint

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
The js-employee-spotlight web part displays the content of the list specified in the web part properties pane, The list should have the 3 mandatory fields. 

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using a dynamic drop down box in the web part properties pane to display cascading dropdowns, which contains 
    - the titles webs in current sitecollection 
    - titles of the lists in the selected web 
    - fields of a selected list
* Use of a third party control(sp-client-custom-fields) for selecting web part foreground and background colors.
* Use of switch, slider controls to configure slider speed and auto scrolling.
* Using a javascript slider. 
* Fetching the user details from User Profile service like user designation, user profile image. 
* Logging.
* Rendering error messages.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-employee-spotlight") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-employee-spotlight) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-employee-spotlight&authors=&template=bug-report.yml&sample=js-employee-spotlight&authors=&title=js-employee-spotlight%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-employee-spotlight&authors=&template=question.yml&sample=js-employee-spotlight&authors=&title=js-employee-spotlight%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-employee-spotlight&authors=&template=question.yml&sample=js-employee-spotlight&authors=&title=js-employee-spotlight%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-employee-spotlight" />

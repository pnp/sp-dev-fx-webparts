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
  createdDate: 04/23/2020 12:00:00 AM
---

# SPUPS Property Sync

## Summary
This component will help the administrators who are currently maintaining the user profiles in their organization. Since not all the properties from Azure are synced automatically to **SharePoint UPS**, this solution will help administrator to synchronize specific properties (default or custom) from Azure or maintained in a separate system directly to **SharePoint UPS** using property import. Below are the features
* **Property Mapping** will provide a flexible and user-friendly way to pick the properties to be synced.
* **Templates** can be generated based on the '_Property Mapping_'.
* Download the generated templates in both **CSV** & **JSON** format.
* **User selection** to allow you to update only the users whose properties are changed or yet to be updated.
* **User selection** method will allow the admin to update both 
    * **Manually** entered properties or which are maintained in a separate system
    * Properties from **Azure AD**
* **Bulk Sync** will allow the admin to upload the data using the templates generated. They can also use this templates as a base for exporting the data from other system and then feed them here to update the properties.
* **Access control** based on **SharePoint Group**, not all the users can access the applictaion.
* **Anytime access** to the template files generated with different property set and the files uploaded for bulk update.
* Separate section to check the **status** of the property update. **Detailed status** on each property and also display the overall status.
* **Azure Function** to handle the property update. **PnPPowershell** is used in Azure Function.
* The application supports **SPA** (Single Page Application).

> **_Note_**: All the supporting lists were created when the web part is loaded for the first time. Whenever the web part is loaded, the supported lists were checked whether it exists or not.

## Properties

1. **Select a library to store the templates**: A document library to store all the templates generated and also the data files uploaded for bulk sync.

2. **Azure Function URL**: Azure function URL to run the property update silently.

3. **Use Certificate for Azure Function authentication**: The video mentioned below to setup Azure Function has different options. This setting will decide whether to use the certificate or stored credentials to communicate with SharePoint.

4. **Date format**: Date format to be used across the entire application. Used _**momentJS**_.

5. **SharePoint Groups**: Only the users from the configured SharePoint Groups and Site Administrator shall be allowed access.

6. **Use page full width**: This is used when the web part is added to a site page where it has to use full width. 

> **_Note_**: Only the Site Administrator is allowed to update the application properties.

## Preview
![SPUPS-Property-Sync](./assets/SPUPS-Sync.gif)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to user properties")
![Hosted Workbench Compatible (with API permissions)](https://img.shields.io/badge/Hosted%20Workbench-Compatible%20(with%20API%20permissions)-yellow.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
SPUPS Property Sync | [Sudharsan K.](https://github.com/sudharsank) ([@sudharsank](https://twitter.com/sudharsank), [Know More](http://windowssharepointserver.blogspot.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Apr 23 2020|Initial release

## Minimal Path to Awesome

- Clone this repository
- From your command line, change your current directory to the directory containing this sample (`react-spupsproperty-sync`, located under `samples`)
- in the command line run:
  - `npm install`
  - `gulp bundle --ship && gulp package-solution --ship`
- Add the .sppkg file to the app catalog and add the **Page Comments** web part to the page.
- **Azure Function** has to be setup for property update. **The actual powershell is uploaded in the assets folder**. Follow the steps explained in the below video by [Paolo Pialorsi](https://www.youtube.com/watch?v=plS_1BsQAto&list=PL-KKED6SsFo8TxDgQmvMO308p51AO1zln&index=2&t=0s).

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


#### Local Mode
This solution doesn't work on local mode.

#### SharePoint Mode
If you want to try on a real environment, open:
[O365 Workbench](https://your-domain.sharepoint.com/_layouts/15/workbench.aspx)

## Video

[![SharePoint User Profile Property Sync with SPFx and Azure Function](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=BaNWS0hzUpQ "SharePoint User Profile Property Sync with SPFx and Azure Function")

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-spupsproperty-sync") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-spupsproperty-sync) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-spupsproperty-sync&template=bug-report.yml&sample=react-spupsproperty-sync&authors=@sudharsank&title=react-spupsproperty-sync%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-spupsproperty-sync&template=question.yml&sample=react-spupsproperty-sync&authors=@sudharsank&title=react-spupsproperty-sync%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-spupsproperty-sync&template=question.yml&sample=react-spupsproperty-sync&authors=@sudharsank&title=react-spupsproperty-sync%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-spupsproperty-sync" />

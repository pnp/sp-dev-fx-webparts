# Smart Profile Photo Editor

## Summary

Uses [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) to analyze and approve or reject user-submitted photos.

![picture of the web part in action](./assets/WebPartPreview.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to the storage entity, which is only available on hosted pages")
![Hosted Workbench (configuration required)](https://img.shields.io/badge/Hosted%20Workbench-Compatible%20(configuration%20required)-yellow.svg "You'll need a key and endpoint to Azure Cognitive Services in the entity storage")
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites

This sample requires an [**Azure Cognitive Services**](https://azure.microsoft.com/en-us/services/cognitive-services/) resource instance in order to analyze submitted photographs.

To configure your key and endpoint, use the following steps:

1. If you don't already have an Azure Cognitive Services key, [create a cognitive service resource](https://azure.microsoft.com/en-us/try/cognitive-services/) and select **Get API Key** by the **Computer Vision**.
2. Create a **Computer Vision** resource
3. Make note of the **Key** and **Endpoint**.
4. Edit the web part's properties and update the **Key** and **Endpoint** settings

### Using SharePoint Online Tenant Properties

If you do not wish to reveal your Azure Cognitive Service API key (or prompt users to enter it), you can pre-configure values using [SharePoint Online Tenant Properties](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/tenant-properties?tabs=sprest).

To do so, follow these steps:
1. If you don't already have an Azure Cognitive Services key, [create a cognitive service resource](https://azure.microsoft.com/en-us/try/cognitive-services/) and select **Get API Key** by the **Computer Vision**.
2. Create a **Computer Vision** resource
3. Make note of the **Key** and **Endpoint**.
4. Using [Office365 CLI](https://pnp.github.io/office365-cli?utm_source=msft_docs&utm_medium=page&utm_campaign=Use+SharePoint+Online+tenant+properties), set the storage entity by using the following commands:

```PowerShell
spo storageentity set --appCatalogUrl <appCatalogUrl> --key azurekey --value <value of the key>
spo storageentity set --appCatalogUrl <appCatalogUrl> --key azureendpoint --value <value of the endpoint>
```

5. If you want to verify that your key and endpoint are stored, use the following command to list all your tenant properties:

```PowerShell
spo storageentity list --appCatalogUrl <appCatalogUrl>
```

6. Edit the `ProfilePhotoEditorWebPart.manifest.json` and set the `useStorageEntity` property to `true`. This will cause the web part to hide the Azure Cognitive Services property pane configuration group and use the tenant properties.


## Solution

Solution|Author(s)
--------|---------
react-smart-profile-photo-editor | Hugo Bernier ([Tahoe Ninjas](http://tahoeninjas.blog), @bernierh)


## Version history

Version|Date|Comments
-------|----|--------
1.0|October 15, 2019|Initial release
1.1|August 12, 2020| Upgraded to SPFx 1.11; Added placeholder, markdown control, and property pane controls for API key and endpoint

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part demonstrates the following concepts:

* Uploading images
* Creating a drag and drop target for uploading images
* Using a web cam to capture images
* Retrieving settings from the SharePoint Online tenant properties
* Using Azure Cognitive Services

## Video

[![Photo ID Web Part using Azure Cognitive Services](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=FQITfL_EfaU "Photo ID Web Part using Azure Cognitive Services")
-->

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-smart-profile-photo-editor") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-smart-profile-photo-editor) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-smart-profile-photo-editor&template=bug-report.yml&sample=react-smart-profile-photo-editor&authors=@hugoabernier&title=react-smart-profile-photo-editor%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-smart-profile-photo-editor&template=question.yml&sample=react-smart-profile-photo-editor&authors=@hugoabernier&title=react-smart-profile-photo-editor%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-smart-profile-photo-editor&template=question.yml&sample=react-smart-profile-photo-editor&authors=@hugoabernier&title=react-smart-profile-photo-editor%20-%20).



## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-smart-profile-photo-editor" />

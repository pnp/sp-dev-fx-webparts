# Smart Profile Photo Editor

## Summary

Uses [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) to analyze and approve or reject user-submitted photos.

![picture of the web part in action](./assets/WebPartPreview.gif)

## Used SharePoint Framework Version

![1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

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

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

This web part demonstrates the following concepts:

* Uploading images
* Creating a drag and drop target for uploading images
* Using a web cam to capture images
* Retrieving settings from the SharePoint Online tenant properties
* Using Azure Cognitive Services

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-smart-profile-photo-editor" />

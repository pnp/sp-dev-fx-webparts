# SPUPS Photo Sync

## Summary

This web part will help the administrators to synchronize the **User Profile Photos** from **Azure AD** or from the **local filesystem** to **SharePoint User Profile Store**.

## Features

* **User selection** will help you to update only specific user based on the selection. It will also allow the users to fetch the photos from **Azure AD** before starting the synchronization.

* **Bulk Sync** will allow the admin to upload the photos from their file shares. The filename should be in the format '**UserID.jpg**'

* **Access control** based on **SharePoint Group**, not all the users can access the application.

* Separate section to check the **status** of the photo update.

* **Azure Function** to handle the photo update. **PnPPowershell** is used in Azure Function.

* The application supports **SPA**.

> **_Note_**: All the supporting lists were created when the web part is loaded for the first time. Whenever the web part is loaded, the supported lists were checked whether it exists or not.

## Properties

1. **Select a library to store the thumbnails**: A document library to store the thumbnail photos.

2. **Delete thumbnail stored**: This flag will decide whether you want to keep the thumbnails generated or to clean it after the sync completed.

3. **Azure Function URL**: Azure function URL to run the photo update.

4. **Use Certificate for Azure Function authentication**: The video mentioned below to setup Azure Function has different options. This setting will decide whether to use the certificate or stored credentials to communicate with SharePoint.

5. **Date format**: Date format to be used across the entire application. Used _**momentJS**_.

6. **SharePoint Groups**: Only the users from the configured SharePoint Groups and Site Administrator shall be allowed access.

7. **Use page full width**: This is used when the web part is added to a site page where it has to use full width. 

## Preview

### User Selection sync

![SPUPS-Photo-Sync_1](./assets/SPUPS_Photo_Sync_1.gif)

### Bulk sync

![SPUPS-Photo-Sync_2](./assets/SPUPS_Photo_Sync_2.gif)

## Used SharePoint Framework Version 

![SPFx 1.11](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites
 
> **@microsoft/generator-sharepoint - 1.11.0**

## Solution

Solution|Author(s)
--------|---------
SPUPS Photo Sync | Sudharsan K.([@sudharsank](https://twitter.com/sudharsank), [SPKnowledge](https://spknowledge.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Sep 13 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp bundle --ship && gulp package-solution --ship`
- Add the .sppkg file to the app catalog and add the **Page Comments** web part to the page.
- **Azure Function** has to be setup for property update. **The actual powershell is uploaded in the assets folder**. Follow the steps explained in the video by [Paolo Pialorsi](https://www.youtube.com/watch?v=plS_1BsQAto&list=PL-KKED6SsFo8TxDgQmvMO308p51AO1zln&index=2&t=0s).


#### Local Mode
This solution doesn't work on local mode.

#### SharePoint Mode
If you want to try on a real environment, open:
[O365 Workbench](https://your-domain.sharepoint.com/_layouts/15/workbench.aspx)

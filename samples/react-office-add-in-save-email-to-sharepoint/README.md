# Save Outlook email to SharePoint Document Library Add-in

## Summary

This Add-in helps the user to save current selected email to SharePoint document Library.
![Save outlook email to SharePoint Library](./assets/saveemailtosp.gif)

## Features and usage
In Outlook web, select an email and select more options. Select 'More actions' at the top of the message. Scroll to the bottom and select 'Save Email to SharePoint' Add-in. The add-in loads the list of sites user has access. Once the user selects the site, it loads the list of document libaries that are present in that site. After selecting library, the user can save the email by clicking Save button. Once it is saved, a link will be generated to view the email preview. The email will be saved in .eml format.

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
save-email-to-sharepoint-client-side-solution | [Harsha Vardhini](https://twitter.com/harshagracy)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 12, 2020|Initial Release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* Move to the SharePoint tenant administrative UIs located at https://<tenant>-admin.sharepoint.com
* Move to API management under the Advance left menu option to see the currently pending permission requests. Notice that the request for Mail.ReadWrite permission for in Graph API is pending for approval.
  * Select the pending permission row and choose Approve from the toolbar.
* Deploy the save-email-to-sharepoint.sppkg to SharePoint App Catalog
* For deployment in your tenant, Please refer this article - https://docs.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins?view=o365-worldwide

## Personally deploy in your outlook web app

* In Outlook web, select an email and select more options
* Select 'More actions' at the top of the message.
* Go to the bottom of the list and select. Get Add-ins.
* On the Add-ins for Outlook page, select the My add-ins.
* Scroll to the bottom to Custom Add-ins
* Select Custom Add-ins from the a file. Upload the manifest file 'e6083c02-3280-4430-a877-22cbc6251d21_outlookManifest.xml' from the OfficeAddin folder. 
* Click install in the warning window.
* Now you can use the Add-in for your outlook web login.


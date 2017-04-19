## Angular MS Graph Web Part Built with Angular v1.x

## Summary
Sample MS Graph Web Part that connects to the Microsoft Graph and pull SharePoint information from your
tenant. It will first pull the Root Site Collection (currently a limitation by Microsoft Graph). Then will
display all the Lists associated with the site. Then all the items inside the List.

![First Screen](./assets/Connect.png)

![Logged In](./assets/Connected.png)

![Root Site Collection](./assets/Root.png)

![Lists in Root Site](./assets/Lists.png)

![Announcement List Items](./assets/Items.png)


> Note: I currently only have models developed for the Announcements List. All other lists will currently generate errors.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-msgraph|David Hartman ([Slalom](https://slalom.com))

## Version history

Version|Date|Comments
-------|----|--------
2.0|April 19th, 2017|GA Release
1.0|February 6th, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Configuration Bliss
- clone this repo
- in the command line run:
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## Register the application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**.

   The registration page displays, listing the properties of your app.

4. Copy the Application Id. This is the unique identifier for your app.

5. Under **Platforms**, choose **Add Platform**.

6. Choose **Web**.

7. Make sure the **Allow Implicit Flow** check box is selected, and enter *http://{Location of SP Workbench}* as the Redirect URI.

8. Choose **Save**.

## Configuring the App
1. Replace the **aad** and **redirect_uri** placeholder values with the application ID and redirect url of your registered Azure application in the GraphHelper.ts file Under
src -> angularMsGraph -> GraphHelper.ts

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-msgraph" /> 
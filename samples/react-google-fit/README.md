## Web part displaying Google Fit information

### Summary 

This sample demonstrates the integration of Google Fit information with SharePoint Framework. The Google Fitness REST APIs allows developers to extend it further and create their own dashboards. Google Fitness REST APIs are useful if you have fitness app and you want to integrate your data with google fit or if you just want to collect Fitness data and display some information to the users. This web part helps to display the key fitness information (activity time spent,  distance travelled, calories burned, step count) from the Google fit data source.

![Web part preview][figure1]

### Generate OAuth 2.0 client ID

In order to use Google REST APIs, we need to generate an OAuth 2.0 client ID. Follow below procedure to generate it.
1. Open Google API Console from [here](https://console.developers.google.com/flows/enableapi?apiid=fitness).
2. Select any existing project or choose to create a new project.
3. Click Continue. <br/>
![Create a new project][figure3]
4. Once the project is created, we will have to generate the credentials.
5. Click "Go to credentials".<br/>
![Generate credentials][figure4]
6. Select the options as highlighted below:<br/>
![Add credentials to your project][figure5]
7. Click "What credentials do I need?".
8. Under Authorized JavaScript origins, add SharePoint Online site url (e.g. https://contoso.sharepoint.com) or https://localhost:4321, if you are using SharePoint local workbench.
9. Under Authorized redirect URI, add https://localhost:4321/auth/google/callback, if you are using SharePoint local workbench.<br/>
![Add authorized origins][figure6]
10. Click "Create OAuth client ID".
11. Set up the OAuth 2.0 consent screen.<br/>
![Setup OAuth consent][figure7]
12. Click Continue.
13. The Client id will be generated. Note it down to use in web part property.<br/>
![OAuth ClientId][figure8]
14. Click Done.

### Configure the Web Part to use
1. Add "Google Fit Activity Viewer" web part on SharePoint page.
2. Edit the web part.
3. Add above generated OAuth 2.0 client ID to "ClientId Field" web part property.
4. Save the changes.
![SharePoint Run][figure2]

### NPM Packages Used
Below NPM package is used to develop this sample.
1.	react-google-authorize (https://www.npmjs.com/package/react-google-authorize) 

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.7.1-green.svg)

## Applies to
* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-google-fit|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://twitter.com/NanddeepNachan))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|January 14, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repo
- npm i
- gulp serve --nobrowser
- Open workbench on your tenant, i.e. https://contoso.sharepoint.com/sites/salesteam/_layouts/15/workbench.aspx
- Search and add web part "Google Fit Activity Viewer"

## Features
This sample web part shows how adaptive cards can be used effectively with SharePoint Framework to render an image gallery with data stored in a SharePoint list.
- Integrating Google Fit information
- Consuming Google Fit REST APIs
- Creating extensible services
- Using @react-google-authorize

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-google-fit" />

[figure1]: ./assets/webpart-preview.png
[figure2]: ./assets/sharepoint-run.gif
[figure3]: ./assets/create-new-project.png
[figure4]: ./assets/generate-credentials.png
[figure5]: ./assets/add-credentials-to-your-project.png
[figure6]: ./assets/add-authorized-origins.png
[figure7]: ./assets/setup-oauth-consent.png
[figure8]: ./assets/oauth-clientid.png


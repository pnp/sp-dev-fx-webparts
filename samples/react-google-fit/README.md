# Google Fit information

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


## Compatibility

![SPFx 1.7.1](https://img.shields.io/badge/SPFx-1.7.1-green.svg) 
![Node.js v8](https://img.shields.io/badge/Node.js-v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to
* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-google-fit|[Nanddeep Nachan](https://github.com/nanddeepn) https://www.linkedin.com/in/nanddeepnachan/ (SharePoint Consultant, [@NanddeepNachan](https://twitter.com/NanddeepNachan))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|January 14, 2019|Initial release

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repo
- npm i
- gulp serve --nobrowser
- Open workbench on your tenant, i.e. https://contoso.sharepoint.com/sites/salesteam/_layouts/15/workbench.aspx
- Search and add web part "Google Fit Activity Viewer"

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
This sample web part shows how adaptive cards can be used effectively with SharePoint Framework to render an image gallery with data stored in a SharePoint list.
- Integrating Google Fit information
- Consuming Google Fit REST APIs
- Creating extensible services
- Using @react-google-authorize

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-google-fit%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-google-fit) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-google-fit&template=bug-report.yml&sample=react-google-fit&authors=@nanddeepn&title=react-google-fit%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-google-fit&template=question.yml&sample=react-google-fit&authors=@nanddeepn&title=react-google-fit%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-google-fit&template=suggestion.yml&sample=react-google-fit&authors=@nanddeepn&title=react-google-fit%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-google-fit" />

[figure1]: ./assets/webpart-preview.png
[figure2]: ./assets/sharepoint-run.gif
[figure3]: ./assets/create-new-project.png
[figure4]: ./assets/generate-credentials.png
[figure5]: ./assets/add-credentials-to-your-project.png
[figure6]: ./assets/add-authorized-origins.png
[figure7]: ./assets/setup-oauth-consent.png
[figure8]: ./assets/oauth-clientid.png


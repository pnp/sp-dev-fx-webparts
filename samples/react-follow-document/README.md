# Follow Document

## Summary

This solution has the goal to easily identify/follow user key documents from all Tenant and easily access them in Modern Pages and Microsoft Teams. This solution uses the Out of Box Social feature **"Follow Document WebPart"** with combination of MSGraph queries and extension for Microsoft Teams.

This is a 2 phase project with associated dependency of solution [Follow-Document](https://github.com/pnp/sp-dev-fx-extensions/tree/main/samples/react-command-follow-document) extension where users are allow to select and manage Followed Document in Libraries to be used in this project. 

Available features:
- Display Follow Documents as Document Card Grid.
- Click on icon redirects to Document.
- Click on Site name redirects to Site.
- Team icon, Form to send message with html to Teams using adaptive cards. 
- Folder Icon redirects to Library where document is located.
- Filled Start allow user to unfollow document.
- Info icon open the Properties of Document with capability to edit.
- Document with search icon allow to preview Document in Side Panel.
- Search by Filename.
- Grouping by Site.
- Microsoft Team integration with personal/Tab App that allow user focus on key Documents. 

Usage of following Technologies:
- Usage of Social Feature **"Follow" documents** and associated REST "[/_api/social.following/](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/how-to-follow-documents-sites-and-tags-by-using-the-rest-service-in-sharepoint-2)"
- Usage of Graph queries using  [Graph explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
- Usage of  [adaptive cards](https://adaptivecards.io/)
- Microsoft Teams integration with following option [TeamsTab, TeamsPersonalApp]

![image](./Assets/FollowDocumentSample1.gif)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js LTS v14 | LTS v12 | LTS v10](https://img.shields.io/badge/Node.js-LTS%20v14%20%7C%20LTS%20v12%20%7C%20LTS%20v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Local](https://img.shields.io/badge/Workbench-Local-yellow.svg)



## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

### Grant the service principal permission to the Microsoft Graph API

Once installed, the solution will request the required permissions via the **Office 365 admin portal > SharePoint > Advanced > API access**.
If you prefer to approve the permissions in advance, for example when testing the solution in the Workbench page without installing it, you can do so using the [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/):

```bash
o365 spo login https://contoso-admin.sharepoint.com
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Files.Read'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Files.Read.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Sites.Read.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Team.ReadBasic.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Channel.ReadBasic.All'
o365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'ChannelMessage.Send'
```

## Solution

Solution|Author(s)
--------|---------
react-follow-document | [André Lage](https://github.com/aaclage) (http://aaclage.blogspot.com, [@aaclage](https://twitter.com/aaclage))

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 22, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
  - **gulp bundle --ship**
  - **gulp package-solution --ship**
  - Add to AppCatalog and deploy

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- Change of SharePoint Social Feature **"Follow"** to follow key Documents for users in Modern Sites. 
- Simple UX to manage **Followed** documents and report list followed documents across Tenant and access properties and Preview of Document.
- Option to unfollow documents individually. 
- Integration with other services of Office 365 such us (Preview, Microsoft Team Messages).  
## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-follow-document-WebPart&authors=@aaclage&title=react-follow-document-WebPart%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-follow-document-WebPart&authors=@aaclage&title=react-follow-document-WebPart%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-follow-document-WebPart&authors=@aaclage&title=react-follow-document-WebPart%20-%20).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-follow-document" />

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

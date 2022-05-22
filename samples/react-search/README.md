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
  - React
  createdDate: 1/1/2016 12:00:00 AM
---
# Search Client-Side Web Part built with React and Flux

## Summary

Sample Search Web Part with internal and external template support. This sample illustrates how you can use React and Flux within the SharePoint Framework.

![Sample of the search web part](./assets/preview.png)


## Compatibility

![SPFx 1.0.0](https://img.shields.io/badge/SPFx-1.0.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)



## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-search-wp|[Elio Struyf](https://github.com/estruyf) (MVP, U2U, [@eliostruyf](https://twitter.com/eliostruyf))

## Version history

Version|Date|Comments
-------|----|--------
0.0.4|September 08, 2016|Initial release
0.0.5|September 27, 2016|Updates for drop 4. Added the ability to use various search tokens. Plus a logging field to watch search calls.
0.0.6|October 19, 2016|Updates for drop 5.
0.1.0|January 18, 2017|Updates to support RC0.
1.0.0|February 28, 2017|Updates to support GA.


## Minimal Path to Awesome

- Clone this repo
- In the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve`
  - Open the *workbench* on your Office 365 Developer tenant
  - Test out the web part

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

The search web part is a sample client-side web part built on the SharePoint Framework. The web part makes use of React and the Flux pattern.

The web part has built-in templating support for internal (created within the project) and external (loaded from a URL) templates.

When adding your query you are able to make use of the following tokens: {Today}, {Today+Number}, {Today-Number}, {CurrentDisplayLanguage}, {User}, {User.Name}, {User.Email}, {Site}, {SiteCollection}.

**Internal templates**

Internal templates can be found in the [templates]('./src/webparts/templates') folder. You can start building your own templates by using one of the provided samples.

![Internal template settings](./assets/internal.png)

**External templates**

External templates can be loaded from an URL.

![External template settings](./assets/external.png)

If you want to test out this functionality, you can find a couple of sample templates in the [external templates]('./external_templates') folder. Upload one of these templates to your site, copy the file location and past it in the textbox.

> There is a sample project which you can use to create your own external templates. You can find it here: [Search WP SPFx Template Generator](https://github.com/estruyf/search-wp-spfx-templategenerator).

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- using React and the Flux pattern with TypeScript for building SharePoint Framework Client-Side Web Parts
- loading CSS stylesheets from CDN
- using non-reactive Web Part Property Pane
- loading external templates to render
- loading scripts and stylesheets which are required in the external template (example: loading jQuery or a custom stylesheet).

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-search%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-search) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-search&template=bug-report.yml&sample=react-search&authors=@estruyf&title=react-search%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-search&template=question.yml&sample=react-search&authors=@estruyf&title=react-search%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-search&template=suggestion.yml&sample=react-search&authors=@estruyf&title=react-search%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-search" />

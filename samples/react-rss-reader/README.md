# RSS Reader

## Summary

A RSS Reader original based [on work by Olivier Carpentier](https://github.com/OlivierCC/spfx-40-fantastics/tree/master/src/webparts/rssReader), part of the [SPFx Fantastic 40 Web Parts](https://github.com/OlivierCC/spfx-40-fantastics)

This RSS Reader utilizes SharePoint Framework v1.20.0 with no dependency on jQuery or a RSS Feed library. This project does utilize [ 
@pnp/spfx-property-controls](https://sharepoint.github.io/sp-dev-fx-property-controls/), and Moment React for date manipulation. Handlebar template option derived from React Search Refiners ([PnP Modern Search](https://microsoft-search.github.io/pnp-modern-search/)). Use NodeJS version 18 (validated using v18.17.1) to compile or rebuild the SPFx solution.

Main features include:

- Three different RSS Feed retrieval services, direct, <https://feed2json.org>, <https://rss2json.com>
- Optionally store RSS feed results to local storage for quick reload with configurable timeout window
- Optional CORS proxy service for cross origin feeds
- Optional View All link in header to point to custom feed source
- Embedded feed rendering with optional parameters
-- Feed result layout options including optional display of item publish date and description
-- Demonstration of color picker property for color control of certain aspects of web part
- Custom feed rendering using local or remote handlebar template

![RSS Reader](./assets/react-rss-reader-original.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.20](https://img.shields.io/badge/SPFx-1.20.0-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

Tested with: Node.js v18.20.4

## Applies to

- [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Contributors

- [Abderahman Moujahid](https://github.com/Abderahman88)
- [Eric Overfield](https://github.com/eoverfield)
- [Kalle Mansikkaniemi](https://github.com/djsladi)
- [Lauri Koskimies](https://github.com/koskimiesl)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0 | Jan 21, 2019 | Initial release
1.0.1 | Nov 22, 2020 | Upgraded to SPFx 1.11
1.0.2 | April 6, 2023 | Fix bug in Direct request retrieval service
1.0.3 | April 21, 2023 | Added theme awareness
1.0.4 | May 25, 2023 | Fixed direct request issues
1.1.0 | February 6, 2024 | Upgraded to SPFx 1.18.2
1.2.0 | October 30, 2024 | Upgraded to SPFx 1.20.0
1.2.1 | November 20, 2024 | Fixed a bug where loading message doesn't disappear when RSS feed doesn't contain any items.

## Minimal Path to Awesome

- Clone this repository

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

### SPFx

- In the command line, with a version of Node 18, i.e. 18.17.1, run:
  - `npm install`
  - `gulp serve`

- To bundle and package the installable `.sppkg`, run:
  - `gulp bundle --ship`
  - `gulp package-solution --ship`

## Web Parts Configuration

### RSS Reader Web Part

![Property Pane](./images/rss_property_pane.png)

#### RSS Reader Settings

Setting | Description
-------|----
Feed URL | The URL of the RSS Feed for readers. Normally will URL will return XML
Feed Retrieval Service | The service to use to retrieve the feed. **Direct** = Make a direct call from the web part to the feed. Note, may have issues with CORS depending on the feed owner. **Feed2Json** = Retrieve a JSON version of feed via feed2json.org. Note, not for production, and may have issues with CORS. For production use, host your own feed2json service. Learn more at <https://github.com/appsattic/feed2json.org>. **Rss2Json** = CORS safe method to retrieve a feed response. Note, subject to limitations with paid options available.
Feed Service URL | If using Feed2Json, the URL of the feed2json service. Host your own service, learn more at <https://github.com/appsattic/feed2json.org>
Feed Service API Key | If using rss2json, an optional API key for paid services
Max Count | The maximum results to return, default: 10. **Note** When using the free versions of feed2json or rss2json, results are limited to 10 or less by the services.
Cache Results | Locally store results in browser local storage, default: no
Mins to Cache Results | If storing results in browser, number of minutes to store. Valid 1 to 1440 (one day), default: 60
Storage Key Prefix | An optional local storage key prefix to use when storing results
Loading Message | An optional custom message to display while the RSS feed is being loaded
Use a CORS proxy | Use a CORS proxy to assist with feed retrieval, default: no
CORS Proxy URL | The URL of a CORS proxy if allowed. {0} will be replaced with Feed URL, i.e. <https://cors-anywhere.herokuapp.com/{0}>. To use CORS anywhere by Herokuapp for testing, be sure to visit ![https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com) first to unlock yourself for testing.
Disable CORS | Set request header mode to "no-cors", thus not requesting CORS response from service. Will disable CORS request, default: no

#### Styling Options

|Setting | Description|
|-------|----|
|External Template URL | The URL of an external handlebar template to use in place of the handlebar template editor for custom layouts|
|Results Layout | The layout to use to display feed, Default (list) or Custom|
|Template Editor | A handlebar editor for custom layouts|
|View All Link | An optional link to view the entire feed, often a link to the RSS source blog itself, default: none|
|View All Link Label | An optional label for the View All Link|

##### Default layout options

|Setting | Description|
-------|----
Show Publication Date | Display the publication date
Show Description | Display the content or description of each feed listing
Description Character Limit | The maximum number of description characters to display
Link Target | The "target" of a listing link, default: _blank
Date Format | The Moment based format format of the listing date, i.e. DD/MM/YYYY (European), default: MM/DD/YYYY
Title Color | Color override for a listing title
Background Color | Color override for the web part background

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Use HttpClient to retrieve data from an outside data source using different services
- Utilize local storage
- Demonstrate different method to address CORS / CORB issues
- Handlebar based rendering with inline editor or remote template retrieval
- Use the React container component approach inspiring by the [react-todo-basic sample](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-todo-basic).

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/labels/react-rss-reader) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-rss-reader) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-rss-reader&template=bug-report.yml&sample=react-rss-reader&authors=@Abderahman88%20@eoverfield%20@djsladi&title=react-rss-reader%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-rss-reader&template=question.yml&sample=react-rss-reader&authors=@Abderahman88%20@eoverfield%20@djsladi&title=react-rss-reader%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-rss-reader&template=question.yml&sample=react-rss-reader&authors=@Abderahman88%20@eoverfield%20@djsladi&title=react-rss-reader%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-rss-reader" />

# Calendar Feed

## Summary

This web part uses event feeds from various sources and renders events using a look and feel that is consistent with the SharePoint out-of-the-box Group calendar/events web part.

It supports the following types of feeds:

- iCal
- WordPress
- RSS
- Exchange Public Calendar
- SharePoint

![The web part in action](./assets/react-calendar-feed-demo.gif)

The web part was designed to allow other calendar feed types (or any other type of data you'd like to show as events). If you have additional feeds that you'd like to support, please contact the author or submit a pull request.

Like the SharePoint event web parts, this web part renders a film-strip view when placed on a single column page, and renders a list view when placed in narrow column (e.g.: 3 column layout), or when viewed on a mobile device.

To improve performance, the web part caches the events to the user's local storage (so that it doesn't retrieve the events every time the user visits the page). You can turn off the cache by setting the cache duration to 0 minutes.

For more information about how this solution was built, including some design decisions and information on how you can extend this example to allow additional event feed provider, visit https://tahoeninjas.blog/creating-a-calendar-feed-web-part.


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Partially](https://img.shields.io/badge/Local%20Workbench-Partially-yellow.svg "Some functionality may not work on local workbech")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Before you can use this web part example, you will need one of the following:

- A publicly-accessible iCal feed (i.e.: .ics)
- A publicly-accessible RSS feed of events (e.g.: Google calendar)
- A WordPress WP-FullCalendar feed
- An Exchange Public Calendar

This web part only supports anonymous external feeds. Also, make sure that your calendar includes upcoming events, as the web part will filter out evens that are earlier than today's date.

If your feed supports filtering by dates, you can specify `{s}` in the URL where the start date should be inserted, and the web part will automatically replace the `{s}` placeholder with today's date. Similarly, you can specify `{e}` in the URL where you wish the end date to be inserted, and the web part will automatically replace the placeholder for the end date, as determined by the date range you select.

## Solution

Solution|Author(s)
--------|---------
react-calendar-feed | [Hugo Bernier](https://github.com/hugoabernier) ([Tahoe Ninjas](http://tahoeninjas.blog), @bernierh)
react-calendar-feed | [Peter Paul Kirschner](https://github.com/petkir) ([@petkir_at](https://twitter.com/petkir_at))

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 15, 2018|Initial release
2.0|June 25, 2018|Converted to SPFx 1.5 and added Exchange Public Calendar support
3.0|November 9, 2018|Converted to SPFx 1.7; Added SharePoint Calendar feed
4.0|January 16, 2019|Converted to SPFx 1.7.1; Removed NPM libraries associated with issue #708.
5.0|August 17, 2019|Converted to SPFx 1.9.1; Refreshed carousel code; Addresses #735, #909. Also added **Convert from UTC** option to handle feeds which do not provide time zone information.
5.1|April 16, 2020|Converted to SPFx 1.10.0; Fixed issue with UTC mode when in narrow view. Updated resizing behavior and styles to match OOB calendar view. Added support for themes and theme variants.
5.2|July 15, 2020|Fixed issue to support IE11

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
- Insert the web part on a page
- When prompted to configure the web part, select **Configure** to launch the web part property pane.
- Select a feed type (RSS, iCal, WordPress, or Mock if using the debug solution)
- Provide the feed's URL. If using _Mock_, provide any valid URL (value will be ignored). If you wish to use a SharePoint calendar feed, provide the URL to the list (e.g.: https://yourtenant.sharepoint.com/sites/sitename/lists/eventlistname)
- Specify a date range (one week, two weeks, one month, one quarter, one year)
- Specify a maximum number of events to retrieve
- If necessary, specify to use a proxy. Use this option if you encounter issues where your feed provider does not accept your tenant URL as a CORS origin.
- If desired, specify how long (in minutes) you want to expire your users' local storage and refresh the events.
- Exclude IE11 support with gulp parameter ```--NoIE11``` this is in-case-sensitive 

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Rendering different views based on size
- Loading third-party CSS from a CDN
- Excluding mock data from production build
- Using @pnp/spfx-property-controls
- Using @pnp/spfx-controls-react
- Using localStorage to cache results locally
- Creating shared components and services
- Creating extensible services
- Using a proxy to resolve CORS issues
- Retrieving SharePoint events from a list with a filter


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-calendar-feed") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-calendar-feed) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-calendar-feed&template=bug-report.yml&sample=react-calendar-feed&authors=@petkir%20@hugoabernier&title=react-calendar-feed%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-calendar-feed&template=question.yml&sample=react-calendar-feed&authors=@petkir%20@hugoabernier&title=react-calendar-feed%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-calendar-feed&template=question.yml&sample=react-calendar-feed&authors=@petkir%20@hugoabernier&title=react-calendar-feed%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-calendar-feed" />

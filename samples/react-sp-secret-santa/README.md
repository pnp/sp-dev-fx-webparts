# Using React Accordion plugin with SPFx

## Summary

The **Bookmarks Manager** web part allows users to manage and organize bookmarks in a SharePoint list. Users can add, edit, and delete bookmarks, which are displayed in a grid layout. The web part supports both **light** and **dark** themes and integrates seamlessly with SharePoint.

---


![Bookmarks Manager](./assets/BookmarksManager.gif)

## Prerequisites

A SharePoint list to store the information. The list must have the following columns:
- Title (Single line of text)
- URL (Single line of text)
- Icon (Single line of text)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-green.svg) 
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Contributors

* [Sudeep Ghatak](https://github.com/sudeepghatak)


## Version history

Version|Date|Comments
-------|----|--------
1.0|January 27, 2025|Initial release


## Minimal Path to Awesome

### Build and Test

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

1. Clone this repo
2. In the command line run
    - `npm i`
    - `gulp build`
    - `gulp serve --nobrowser`
3. Create a custom list (e.g. Bookmarks) 
5. Navigate to the hosted version of SharePoint workbench, eg. **https://\<tenant>.sharepoint.com/sites/\<your site>/_layouts/15/workbench.aspx**
6. Add the Web Part to the canvas and configure it.

### Package and deploy

1. In the command line run
    - `gulp bundle --ship`
    - `gulp package-solution --ship`
2. Install into your SharePoint app catalog and add it to a SharePoint site.
3. Navigate to your site, eg. **https://\<tenant>.sharepoint.com/sites/\<your site>**
4. Create a custom list with Title and Description(internal name) of type Enhanced rich text. 
5. Populate the list with some items
6. Navigate to a page on your site where the custom list is created
7. Add the Web Part to the page and configure it.

## Features

1. **Bookmark Management**:
   - Add new bookmarks with a title, URL, and icon.
   - The webpart supports FluentUI icon names (https://developer.microsoft.com/en-us/fluentui#/styles/web/icons)
   - Edit existing bookmarks to update their details.
   - Delete bookmarks from the list.

2. **Grid Layout**:
   - Displays bookmarks in a responsive grid layout.
   - Each bookmark includes a title, icon, and link.

3. **Theming**:
   - Supports **light** and **dark** themes for better user experience.
   - Automatically adapts to the SharePoint site's theme.

4. **SharePoint Integration**:
   - Stores bookmarks in a SharePoint list.
   - Uses PnP JS for seamless interaction with SharePoint APIs.

5. **User-Friendly UI**:
   - Intuitive interface with a modal dialog for adding/editing bookmarks.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20REACT-SP-BOOKMARKS&template=bug-report.yml&sample=REACT-SP-BOOKMARKS&authors=@SudeepGhatakh&title=REACT-SP-BOOKMARKS).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20REACT-SP-BOOKMARKS&template=bug-report.yml&sample=REACT-SP-BOOKMARKS&authors=@SudeepGhatakh&title=REACT-SP-BOOKMARKS).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20REACT-SP-BOOKMARKS&template=bug-report.yml&sample=REACT-SP-BOOKMARKS&authors=@SudeepGhatakh&title=REACT-SP-BOOKMARKS).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



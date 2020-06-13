# "CSS in JS" with SharePoint Framework and TypeStyle

## Summary

The web part demonstrates the usage of "CSS in JS" pattern with SharePoint Framework. "CSS in JS" is implemented using [TypeStyle](https://typestyle.github.io/) library. Read more in [the blog post here](https://spblog.net/post/2020/04/22/styling-sharepoint-framework-components-with-css-in-js-approach).

![picture of the web part in action](assets/dynamic-styles.gif)

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-css-in-js-typestyle|[@Sergei Sergeev](https://twitter.com/sergeev_srg) - [Mastaq](https://mastaq.com/)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 24, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp build`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* add the webpart to your tenant app store
* add the app to a SharePoint site and then add the webpart to the page


## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* "CSS in JS" pattern adopted to SharePoint Framework
* Theme support using SharePoint Framework's `ThemeProvider`
* Dynamically reacting to theme changes without affecting performance
* React hooks

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-css-in-js-typestyle" />

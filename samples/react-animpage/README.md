# AnimPage Motion - Page Scroll Animations for Web Parts

## Summary

This is a sample web part that illustrates how to use **PnPjs**, the **IntersectionObserver API**, and CSS animations to build a SharePoint Framework client-side web part that adds **reveal-on-scroll animations** to other web parts on a modern SharePoint page.

Sample web part built using SPFx with the React that:

- Scans the current page for existing web parts
- Lets editors configure animations per web part from the property pane
- Applies smooth reveal-on-scroll effects (fade, slide, scale, etc.)

![AnimPage Motion demo](./assets/Animation.gif)

## Compatibility

> ⚠️ **Important**  
> Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.  
> Refer to https://aka.ms/spfx-matrix for more information on SPFx compatibility.

## Used SharePoint Framework Version

1.22.1
This sample was built and tested with **Node.js 22.14.0** and SPFx 1.22.1 using **Heft** based tooling

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0.0     | Feb 17, 2026 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

Other build commands can be listed using `heft --help`.

## Features

This project contains a sample client-side web part built on the SharePoint Framework illustrating how to apply scroll-triggered animations to existing web parts using React and PnPjs.

This sample illustrates the following concepts on top of the SharePoint Framework:

General
Scanning a modern SharePoint client-side page using PnPjs:
Loading the page via getFileByServerRelativePath
Parsing sections, columns, and controls via ClientsidePageFromFile
Identifying web parts on the page via data-sp-feature-instance-id
Building a configuration web part that:
Displays a list of web parts found on the page
Provides per-web-part settings in the property pane (toggle, preset, mode, delay)
Includes "scroll to web part" buttons with a temporary highlight effect

UX & Animations
Using the IntersectionObserver API to detect when web parts enter or leave the viewport.
Applying CSS-based animation presets with reusable classes:
apm-fade, apm-slide, apm-scale, apm-fade-soft, apm-fade-strong, apm-card-pop
Using data-* attributes to store configuration (data-apm-mode, data-apm-delay).
Implementing a highlight animation (apm-highlight) when navigating from the property pane to a web part.

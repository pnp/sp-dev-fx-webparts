# Feedback

## Summary

This is an application that supports Feedback through a web part that can be used directly on a Modern Sharepoint Site page. This webpart can be added to any site page or article. This allows users to send categorized feedback via email to users in the "Feedback Owners" group.

![Feedback](./assets/feedbackwebpart.gif)

## Used SharePoint Framework Version

![1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

* Office 365 subscription with SharePoint Online
* SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) set up

## Solution

Solution|Author(s)
--------|---------
react-feedback | Perry Kankam 

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 15, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

*To really get the full experience go to the workbench on a SharePoint Site [Your site url]/_layouts/15/workbench.aspx and that's where the magic will happen but this requires that you deploy and activate features to provision the required SharePoint assets*

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`
* Add "Feedback Owners" Sharepoint group. This is where you'll add all users who should receive this feedback.
* Run one of the following custom commands to clean, build, bundle and package the solution.
    * If you want to be able to debug using your local code using gulp serve
    `gulp package`
* Navigate to the output `feedback-webpart.sppkg` (found in the `/sharepoint/solution` folder)
* Upload it to an application catalog (either a tenant or site collection one)
* In your site collection go to **Site Contents** and click **New** > **App**
* Find and add the **Feedback Application** App 
    * wait for it to finish installing and activating features on the **Site Contents** page
* Go to a site page like home, edit the page and find and add the **Feedback** web part
    * If you deployed a shippable (SharePoint Online) version you don't need to do anything else
    * If you deployed a debug (http://localhost:4321) version you'll need to ensure gulp serve is running

## Features
This sample illustrates the following concepts:
- Used [@pnp/polyfill-ie11](https://pnp.github.io/pnpjs/concepts/polyfill/)
- Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
- Used [@pnp/logging](https://pnp.github.io/pnpjs/logging/)

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
  - react
  createdDate: 04/24/2020 12:00:00 AM
---
## SPFx webpart to add JS and CSS reference on Modern Pages via SPFx application customizer extension

This repo is a react based SPFx web part and extension that allows users to add/modify/delete custom js and css file references using SPFx application customizer extension all modern pages within SP online site. This web part provides an interface to JS and CSS file references so that we don't have to modify code when we need to change references or add new references in the future. As part of security measures, this actions on web part can be only accessed by users who have Manage web permission on site.

WebPart in Action

![Webpart in action](assets/webpartinaction.gif?raw=true "Webpart in action")

Challenges/Drawback with ONLY using SPFx extension for adding js and css file references.
* JS and CSS file references links needs to be hardcoded in solution
* Changes to code required if we need to change add new reference or remove existing reference.
* Redeployment of package and installation
* Different solution would be required for different site collections as we would definitely need different header js and css file references for each site collection(most of cases)
* High maintenance and time consuming for simple task. 

To overcome this drawbacks, this solution comes handy. This is reusable component which can be used by developers to eliminate creating Extension on thier own. Feel free to connect on twitter:@siddh_me for any details.

### Features of solution

* WebPart to configure JS and CSS file reference.
* Edit functionality if at least one JS or CSS reference is already added via this solution
* Completely remove all the references added via this solution
* Support for relative url also, if your js and css file is referred from some document library in same site collection.
Path can be `/sites/mysc/style library/js/custom.js` or `/sites/mysc/style library/css/custom.css`

## Used SharePoint Framework Version

![1.9.1](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

### Package and Deploy

Note - If you don't want to build and package on your own, you can directly download package at this [location](./sharepoint/solutions/react-add-js-css-ref.sppkg) and upload to app catalog and install app on required site collection. Skip below steps and directly go to How to use section.
Clone the solution and make sure there is no error before packaging. Try first on local work bench.

Change the `pageURL` property in `/config/serve.json` - This should be a valid modern page on your site collection.

```bash
git clone the repo
npm i
gulp serve
```
- Execute the following gulp task to bundle your solution. This executes a release build of your project by using a dynamic label as the host URL for your assets. This URL is automatically updated based on your tenant CDN settings:
```bash
gulp bundle --ship
```
- Execute the following task to package your solution. This creates an updated `webpart.sppkg` package on the `sharepoint/solution` folder.
```bash
gulp package-solution --ship
```
- Upload or drag and drop the newly created client-side solution package to the app catalog in your tenant.
- Based on your tenant settings, if you would not have CDN enabled in your tenant, and the `includeClientSideAssets` setting would be true in the `package-solution.json`, the loading URL for the assets would be dynamically updated and pointing directly to the `ClientSideAssets` folder located in the app catalog site collection.


### How to Use Solution
* Once app is deployed to app catalog successfully.
* Install app to required site collection
* Create new modern page. Add **addJsCssReference** webpart to page. Publish the page.
* Use grid to add js and css file references, both are separate sections.
* On Success message - Refresh the page and you would see your js and css files will be loaded.
* To Edit/Remove, go to same page again and Use **Activate** or **Deactivate**.
* Only Users with Manage Web permission will be able to access webpart and add/modify references.

### High level design of Solution

* SPFx solution with 2 components 1. SPFx Webpart 2. SPFx Extension Application Customizer
* Disables Automatic activation of SPFx extension when app is installed.
* React based solution
* Register Custom action with ClientSideComponentId of Extension component
* Passes parameters to Extension with ClientSideComponentProperties

## Solution

Solution|Author(s)
--------|---------
react-add-js-css-ref | [Siddharth Vaghasia](https://www.linkedin.com/in/siddharthvaghasia/)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Apr 24, 2020|Initial release
2.0.0|June 09, 2020|Displaying access denied message,  added spinner to display on page load, fix edit, delete icons not displaying.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

For any issue or help, Buzz me on twitter:([siddh_me](https://twitter.com/siddh_me/))

> Sharing is caring!

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-add-js-css-ref" />

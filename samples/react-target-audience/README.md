# Target audience generic component

## Summary

Sample web part which uses a Generic React Component which enables it to have Target Audience functionality like what was available in classic web parts.
Targets SharePoint Groups only within the site.

![audience.gif](./assets/audience.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/spfx-1.11.0-green.svg)

![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg)

![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-red.svg)

![Teams N/A](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg)

![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-yellow.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
target-audience-generic-component | Rabia Williams([@williamsrabia](https://twitter.com/williamsrabia) , [rabiawilliams.com](https://rabiawilliams.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 28, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`
* Define one or more groups to use as an audience
* Add the web part to a page
* In the web part's properties, select the audience you wish to see the web part

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Adding audience targeting to web parts using a generic React component

When the web part is configured, the sample content will only appear to users who belong to the targeted audience.

You can use the `TargetAudience` control (located under `src/common/TargetAudience.tsx`) by inserting one or more in your web parts, specifying the `pageContext` and `groupIds` props, and adding the content you wish to show/hide as children elements of the `TargetAudience` control, as follows:

```tsx
<TargetAudience pageContext={this.props.pageContext} groupIds={this.props.groupIds}>
    <div>
        Your sample content goes here
    </div>
</TargetAudience>
```

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-target-audience"/>

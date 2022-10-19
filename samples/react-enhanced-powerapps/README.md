# Enhanced Power App

## Summary

Sample web part showing how to embed a Power App that resizes, adapts to themes, and supports dynamic properties

![Enhanced Power Apps in Action](./assets/enhanced-power-apps.gif)

It also resizes the app to fit the web part dimension:
![Enhanced Power Apps reszing in Action](./assets/resize.gif)

## Compatibility

![SPFx 1.13.1](https://img.shields.io/badge/SPFx-1.13.1-green.svg)
![Node.js v14](https://img.shields.io/badge/Node.js-v14-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to Power Apps")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

You'll need at least one application in Power Apps that you wish to embed in SharePoint.

## Solution

Solution|Author(s)
--------|---------
react-enhanced-powerapps | Hugo Bernier ([Tahoe Ninjas](http://tahoeninjas.blog/), [@bernierh](https://twitter.com/bernierh))

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 27, 2020|Initial release
1.1|August 15, 2020|Added improved resize event handler
1.2|January 20, 2022|Update to SPFx v1.13.1

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for more information.


### To Use

* Create a Power App
* In your app's **Settings** page (under **File | Settings** ), select the application size that suits your needs best
![Application size](./assets/sizeoptions.png).
* Make sure to keep **Scale to fit** on
* Once your app is saved and published, go to make.powerapps.com and find the **App ID** by browsing to **Apps**, selecting the app you wish to embed (*select it*, don't *launch it*) and viewing **Details**
* In the app details page, find the **Web link** or **App ID** and copy it.
![Add web link or app id](./assets/step1-5.png).
* Add the **Enhanced Power Apps** web part to a page.
* In the web part's property pane, paste the value you copied in the **App web link or ID** field.
* In the **Appearance** group, select **Maintain aspect** for the **Resize behavior** and select the **Aspect ratio** that matches the application size you selected earlier
![Appearance](./assets/step2.png)

You can also use dynamic properties to pass values from another web part on the page (or page context information) to Power Apps and/or make your app change colors to match the SharePoint page theme and section color.

## Features

This web part was created because the out-of-the-box Power Apps web part was missing some features that were important to me. 

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Theme awareness
* Context awareness
* Dynamic data
* Property Pane HTML

### Theme Awareness

The sample demonstrates how to react to changing theme colors and section background colors. It can pass theme colors to the embedded Power Apps application.

If you want to use a color within Power Apps, simply use `Param()` to retrieve the value that is passed to Power Apps as a parameter, then use `ColorValue()` to convert the string value to a color Power Apps can use.

For example, if you select to pass the `bodyText` theme color, you can use the following expression within Power Apps to set the text color to match the SharePoint text color:

```
ColorValue(Param('bodyText'))
```

Remember that parameters are _case-sensitive_ in Power Apps. In the example above, make sure that you use `bodyText`, not `bodytext`.

### Dynamic Properties

This web part is a _dynamic property consumer_. For example, you can bind the Enhanced Power Apps web part to a list/document library web part on the page and make your Power App display information about the currently selected item in your list/document library.

To configure it, follow these steps:

* Add a **List** or **Document Library** web part on the page where your **Enhanced Power Apps** web part is located.
* In your **Enhanced Power Apps** web part's property pane, expand the **Dynamic Properties** group
![Select the Dynamic Properties group](./assets/dpstep1.png)
* Turn on **Pass dynamic property as parameter?**
* Under **Dynamic property source** configure the following properties:
  - For **Connect to Source** select your list/document library web part name
  - In the **[Your web part name]'s properties** select **Column containing the filter value**
  - In the **Column containing the filter value**, select the column that has the value you'd like to pass to Power Apps
  - In the **Parameter name** field, enter the parameter name that you'll want to use within Power Apps to retrieve this value. For example, if you selected the `ID` field, type `ID`.
  - Within Power Apps, use `Param()` and the parameter name you specified above. For example, if you specified `ID` above, you'll want to use `Param('ID')` within Power Apps to retrieve the value. Remember that parameter names are _case-sensitive_.

Note that the web part always sends the current page's locale to Power Apps via the `locale` parameter. You can use this value to create multi-language apps.

### Property Pane HTML

This sample includes a `PropertyPaneHTML` control that you can use to embed custom HTML in a property pane. I use it to highlight syntax using the `<pre>` tag and to make text bold.

## Video

[![Enhanced Power App Web Part - Cool Power App integration scenarios with SharePoint](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=L_ArTxSQKgo "Enhanced Power App Web Part - Cool Power App integration scenarios with SharePoint")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-enhanced-powerapps") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-enhanced-powerapps) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-enhanced-powerapps&template=bug-report.yml&sample=react-enhanced-powerapps&authors=@hugoabernier&title=react-enhanced-powerapps%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-enhanced-powerapps&template=question.yml&sample=react-enhanced-powerapps&authors=@hugoabernier&title=react-enhanced-powerapps%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-enhanced-powerapps&template=question.yml&sample=react-enhanced-powerapps&authors=@hugoabernier&title=react-enhanced-powerapps%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-enhanced-powerapps" />

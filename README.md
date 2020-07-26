

# react-enhanced-powerapps

## Summary

Sample web part showing how to embed a Power App that resizes, adapts to themes, and supports dynamic properties

![Enhanced Power Apps in Action](./assets/enhanced-power-apps.gif)

It also resizes the app to fit the web part dimension:
![Enhanced Power Apps reszing in Action](./assets/resize.gif)

## Used SharePoint Framework Version

![1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

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

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-enhanced-powerapps" />

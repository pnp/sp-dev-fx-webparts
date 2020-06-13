# React Quick Poll

## Summary
> This component is developed for the users who really need to create a **_Poll_** within a minute and with less maintenance. **_'QuickPoll'_** list will be created automatically to store the user response.  
> Following are some of the features of this component.
* **_Easy_** to setup with most of the configurations are optional.
* **_Flexible_** to use without any critical configuration.
* More than one poll questions can be added.
* Schedule the poll questions in **_advance_** using the **_date_** parameters.
* Option to choose the poll that has to be visible to the end users.
* Poll response can be viewed via graphical representation as **_charts_**.

## Properties

1. **_Display poll based on date_** - This property will check for the **'Start Date'** and **'End Date'** on the poll questions to display the correct poll question to the end user. The **'Start Date'** and **'End Date'** on the poll question will be enabled only when this property is turned on.

2. **_Poll Questions_** - Manage the collection of poll questions and choices.
    
    * **_Question Title_** - Title of the question.
    * **_Choices_** - Choices separated by comma.
    * **_Multi Selection_** - Whether the users are allowed to choose one or multiple.
    * **_Start Date_** - Date when the end user can start seeing the poll question.
    * **_End Date_** - Last day of the poll question visible to the end user.

3. **_Success Message_** - Message to be displayed to the user after successful submission. It is optional, if not provided the default message '**Thank you for your submission**' will be displayed.

4. **_Response Message_** - Message to be displayed to the user with the user response, once the user has submitted. It is optional, if not provided the default message '**You voted for: ~User Response~**' will be displayed below the chart.

5. **_Submit button text_** - Text to be displayed on the submit button. It is optional, if not provided the default text '**Submit Vote**' will be displayed.

6. **_Preferred Chart Type_** - Chart type to display the overall response for the question.

### _Note_
* Poll questions with the same **'Start Date'** and **'End Date'** will follow the sort order to display the latest question to the end user.
* Once the user started to response to the poll, do not delete the question from the question collection. All the questions are mapped based on the **ID** auto generated. It cannot be recovered once deleted.
* Make sure the **Multi Choice** option is chosen wisely, do not change once the user started to response to the poll.

## Preview
![Advanced-Comments-Box](./assets/react-quick-poll.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
> **@microsoft/generator-sharepoint - 1.10.0**

## Solution

Solution|Author(s)
--------|---------
react-quick-poll | Sudharsan K.([@sudharsank](https://twitter.com/sudharsank), [Know More](http://windowssharepointserver.blogspot.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.1|Feb 24 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp bundle --ship && gulp package-solution --ship`
- Add the .sppkg file to the app catalog and add the **'_Quick Poll_'** web part to the page.

## Features
- Used [PnP Property Pane Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/) to create the property pane controls
    * [PropertyFieldToggleWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldToggleWithCallout/)
    * [PropertyFieldCollectionData](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldCollectionData/)
    * [PropertyFieldChoiceGroupWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldChoiceGroupWithCallout/)
    * PropertyPaneTextField (From base property controls)
- Used [PnP Reusable REact Controls](https://sharepoint.github.io/sp-dev-fx-controls-react/)
    * [Placeholder](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/)
    * [ChartControl](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ChartControl/)
- Used few styles and controls (Text, MessageBar, ProgressIndicator, PrimaryButton, ChoiceGroup, List, Checkbox) from [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)
- Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
- Used [Moment.js](https://momentjs.com/) for datetime formatting.

#### Local Mode
This solution doesn't work on local mode.

#### SharePoint Mode
If you want to try on a real environment, open:
[O365 Workbench](https://your-domain.sharepoint.com/_layouts/15/workbench.aspx)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-quick-poll" />

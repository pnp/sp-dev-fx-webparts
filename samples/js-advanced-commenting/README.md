# Advanced Comments Box

## Summary
> This component is developed for the advanced usage of commenting the page or article etc. **_Page Comments_** lists will be created to store the comments. Following are some of the features of this component.
* Can be used in the modern page with the existing comments disabled.
* Classification of comments by **_Popular_**, **_Newest_**, **_Oldest_** and **_Attachments_**
* Ability to refer files as a comment.
* **_Edit_**, **_Reply_** (nested comments), **_Like_** & **_Delete_** options are available based on the configuration.
* **_Hashtag_** & **_Ping Users_** are also available.
* **_Document Preview_** is also available for all office documents and videos based on the configuration.
* Display of **_New_** icon for the current day comments.

## Properties

1. **_DateTime_** format on when the comments were added or modified

2. **_Profile Picture_** style, whether it has to be rounded or square

3. Enable or Disable **_Navigation_** whether to display the comments classification

4. Enable or disable **_Attachments_**. Following properties are required when attachments are enabled.

    * **_Library_** to store the files uploaded.
    * Allowed **_File Formats_** in the comments box.
    * Maximum **_File Size_** allowed.

5. **_Ping Users_** will allow to mention the users. The users are pulled from the **Site Users**.

6. **_Edit_** comments can be enabled or disabled to allow the users to edit the comments. Files added can be deleted not edited.
    * **_Delete_** option can be enabled or disabled to allow the users to delete the comments. Comments with no-replies are allowed to delete. Delete is allowed only if Edit is allowed.

7. **_Upvoting_** of comments to like or dislike the comments.

8. **_Hashtags_**

9. **_Document Preview_** can be enabled or disabled for the office files and videos.


## Preview
![Advanced-Comments-Box](./assets/Advanced-Comments-Box.gif)

## Used SharePoint Framework Version 
![1.9.1](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
> **@microsoft/generator-sharepoint - 1.9.1**

## Solution

Solution|Author(s)
--------|---------
SPFxPageComments | Sudharsan K.([@sudharsank](https://twitter.com/sudharsank), [Know More](http://windowssharepointserver.blogspot.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Feb 05 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp bundle --ship && gulp package-solution --ship`
- Add the .sppkg file to the app catalog and add the **Page Comments** web part to the page.

## Features
- Used [SharePoint Framework Property Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/) to create the property pane controls(Text, ListPicker, Toggle) with callout.
- Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
- Used [jquery-comments](https://viima.github.io/jquery-comments/) for comments control with some customization.
- Used [Moment.js](https://momentjs.com/) for datetime formatting.

#### Local Mode
This solution doesn't work on local mode.

#### SharePoint Mode
If you want to try on a real environment, open:
[O365 Workbench](https://your-domain.sharepoint.com/_layouts/15/workbench.aspx)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-advanced-commenting" />

# FAQ Document Card

React FAQ Document Card Web Part

## Summary

For detailed instructions on how to build this web part and the needed list please watch: https://www.youtube.com/watch?v=oIr-rgGvUUk

![picture of the web part in action](assets/FAQdocCardPreview.gif)
![picture of the web part in action](assets/reactdoccardfaq.png)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js LTS 8.x | LTS 10.x](https://img.shields.io/badge/Node.js-LTS%208.x%20%7C%20LTS%210.x-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Prerequisites

1. Build a SharePoint Online list named **FAQ**
2. Rename **Title** column to **Question**
3. Add 3 additional columns:

    - **Multiple lines of text** column, toggle **Use rich text** to yes, name **Answer**
    - **Choice** column, Options `Work`, `Personal`, and `Hobby`, name **Category**
    - **Yes/No** column, set default to `No`, name **Featured**
4. Add items to your list making sure to set some to `yes` in the **Featured** column
5. Navigate to your sites workbench (https://<tenant>.sharepoint.com/sites/<your site>/_layouts/15/workbench.aspx)

## Solution

Solution|Author(s)
--------|---------
react-doccard-faq | [Sam Collins](https://github.com/SamC148) ([@samc148](https://twitter.com/samc148))

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 5, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

DefaultButton,
Modal,
DetailsList,
IColumn,
from office-ui-fabric-react

IPropertyPaneDropdownOption 
 from @microsoft/sp-property-pane

RichText,
Accessible Accordion 
from @pnp/spfx-controls-react

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-doccard-faq" />
